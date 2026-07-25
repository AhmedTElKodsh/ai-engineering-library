import json
import sys
import threading
from dataclasses import replace
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


REFERENCE_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(REFERENCE_ROOT))

from app import (  # noqa: E402
    MAX_PROVIDER_ATTEMPTS,
    FixtureProvider,
    build_server,
    load_application,
    retrieve,
    validate_request,
)


def request_json(url: str, payload: dict[str, object] | None = None) -> tuple[int, dict[str, object]]:
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"} if data else {},
        method="POST" if data else "GET",
    )
    try:
        with urlopen(request, timeout=3) as response:
            return response.status, json.load(response)
    except HTTPError as error:
        return error.code, json.load(error)


def test_supported_answer_preserves_citations_and_operational_evidence():
    response = load_application().run(
        {"ticker": "nvda", "question": "Summarize data center demand."}
    )

    assert response.status == "supported"
    assert response.citations
    assert response.trace[-1] == {"step": "model", "status": "ok", "attempt": 1}
    assert response.metrics["provider_mode"] == "fixture"
    assert response.metrics["live_provider_verified"] is False
    assert response.metrics["input_tokens_estimated"] > 0
    assert response.metrics["output_tokens_estimated"] > 0
    assert response.metrics["estimated_live_cost_usd"] > 0


def test_unsupported_question_abstains_without_citations():
    response = load_application().run(
        {"ticker": "NVDA", "question": "What will the weather be tomorrow?"}
    )

    assert response.status == "abstained"
    assert response.abstained is True
    assert response.citations == ()


def test_retrieval_ranks_before_applying_context_budget():
    application = load_application()
    request = validate_request(
        {
            "ticker": "NVDA",
            "question": "Explain GPU capacity planning and cost controls.",
        }
    )

    selected = retrieve(request, application.evidence, limit=1)

    assert [chunk.chunk_id for chunk in selected] == ["nvda-cloud-capacity"]


def test_safety_and_tool_gates_refuse_authority():
    application = load_application()
    provider = FixtureProvider()

    advice = application.run(
        {"ticker": "NVDA", "question": "Should I buy this stock?"}
    )
    approval = application.run(
        {
            "ticker": "NVDA",
            "question": "Summarize data center demand.",
            "tool": "quote_lookup",
        },
        provider=provider,
    )
    denied = application.run(
        {
            "ticker": "NVDA",
            "question": "Summarize data center demand.",
            "tool": "read_env",
            "approved": True,
        }
    )

    assert advice.status == "refused"
    assert approval.status == "approval_required"
    assert provider.calls == 0
    assert denied.status == "tool_denied"


def test_approved_tool_is_typed_and_read_only():
    response = load_application().run(
        {
            "ticker": "NVDA",
            "question": "Summarize data center demand.",
            "tool": "quote_lookup",
            "approved": True,
        }
    )

    assert response.status == "supported"
    assert response.tool_result == {
        "tool": "quote_lookup",
        "ticker": "NVDA",
        "price": 125.5,
        "currency": "USD",
        "as_of": "2026-05-25T16:00:00Z",
    }


def test_provider_retry_is_bounded():
    provider = FixtureProvider(failures_before_success=99)
    response = load_application().run(
        {"ticker": "NVDA", "question": "Summarize data center demand."},
        provider=provider,
    )

    assert response.status == "provider_error"
    assert response.abstained is True
    assert provider.calls == MAX_PROVIDER_ATTEMPTS


def test_invalid_structured_provider_output_fails_closed():
    class MalformedProvider(FixtureProvider):
        def generate(self, request, evidence):
            return {"answer": "Unsupported claim.", "citations": ["invented-source"]}

    response = load_application().run(
        {"ticker": "NVDA", "question": "Summarize data center demand."},
        provider=MalformedProvider(),
    )

    assert response.status == "provider_error"
    assert response.abstained is True
    assert response.citations == ()
    assert response.trace[-1]["status"] == "invalid_output"


def test_evaluation_set_has_ten_cases_and_passes():
    report = load_application().evaluate()

    assert report["total"] == 10
    assert report["passed"] == 10
    assert report["failed"] == 0
    assert report["live_provider_verified"] is False


def test_evaluation_reports_failure_categories_instead_of_only_a_score():
    application = load_application()
    changed_case = replace(
        application.evaluation_cases[0],
        expected_status="refused",
    )
    report = replace(application, evaluation_cases=(changed_case,)).evaluate()

    assert report["total"] == 1
    assert report["passed"] == 0
    assert report["failed"] == 1
    assert report["failures"] == [
        {
            "case_id": changed_case.case_id,
            "failure_categories": ["wrong_status"],
        }
    ]


def test_request_validation_rejects_malformed_trust_boundary_input():
    for payload in (
        [],
        {"ticker": "NVD4!", "question": "Explain context."},
        {"ticker": "NVDA", "question": " "},
        {"ticker": "NVDA", "question": "Explain context.", "approved": "yes"},
    ):
        try:
            validate_request(payload)
        except ValueError:
            pass
        else:
            raise AssertionError(f"invalid request was accepted: {payload!r}")


def test_real_http_health_brief_and_validation_paths():
    server = build_server(load_application())
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base_url = f"http://127.0.0.1:{server.server_port}"
    try:
        health_status, health = request_json(f"{base_url}/health")
        brief_status, brief = request_json(
            f"{base_url}/brief",
            {"ticker": "NVDA", "question": "Summarize data center demand."},
        )
        invalid_status, invalid = request_json(
            f"{base_url}/brief",
            {"ticker": "NVD4!", "question": "Explain context."},
        )
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)

    assert health_status == 200
    assert health["provider_mode"] == "fixture"
    assert brief_status == 200
    assert brief["status"] == "supported"
    assert brief["citations"]
    assert invalid_status == 422
    assert invalid["ok"] is False
