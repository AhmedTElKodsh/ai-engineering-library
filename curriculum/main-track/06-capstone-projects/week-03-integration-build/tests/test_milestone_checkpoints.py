import json
import sys
import threading
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    FinAgentBrief,
    FinAgentRequest,
    FixtureProvider,
    MarketSnapshot,
    ToolCall,
    build_http_server,
    call_provider_with_retry,
    dispatch_tool,
    handle_service_request,
    load_evaluation_cases,
    run_evaluation,
    run_milestone_application,
)


SNAPSHOT = PROJECT_ROOT / "fixtures" / "market_snapshot.json"
EVIDENCE = PROJECT_ROOT / "fixtures" / "evidence_chunks.json"
EVALUATION = PROJECT_ROOT / "fixtures" / "evaluation_cases.json"


def request_json(
    url: str,
    payload: dict[str, object] | None = None,
) -> tuple[int, dict[str, object]]:
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


def test_checkpoint_2_provider_retries_and_preserves_approved_citations():
    brief = FinAgentBrief(
        "NVDA",
        "Fixture-grounded data center context.",
        ["Data Center Note | https://example.com/nvda"],
        "Fixture evidence only.",
        "Educational; not investment advice.",
    )
    provider = FixtureProvider(failures_before_success=1)

    result = call_provider_with_retry(brief, provider, max_attempts=2)

    assert result.ok is True
    assert result.attempts == 2
    assert result.citations == brief.citations
    assert provider.calls == 2


def test_checkpoint_2_provider_fails_closed_on_invented_citation():
    brief = FinAgentBrief(
        "NVDA",
        "Fixture-grounded context.",
        ["Approved | https://example.com/approved"],
        "Fixture evidence only.",
        "Educational; not investment advice.",
    )
    provider = FixtureProvider(
        output_override={
            "content": "Unsupported claim.",
            "citations": ["Invented | https://example.com/invented"],
        }
    )

    result = call_provider_with_retry(brief, provider)

    assert result.ok is False
    assert result.citations == []
    assert result.attempts == 1
    assert "citation" in result.error.lower()


def test_checkpoint_3_evaluation_seed_has_representative_cases():
    cases = load_evaluation_cases(EVALUATION)
    statuses = {case.expected_status for case in cases}

    assert len(cases) == 10
    assert {"supported", "abstained", "refused"}.issubset(statuses)
    assert any(case.requires_citations for case in cases)
    assert any(case.expected_abstained for case in cases)


def test_checkpoint_6_tool_is_allowlisted_approval_gated_and_typed():
    snapshot = MarketSnapshot(
        "NVDA",
        "NVIDIA Corporation",
        125.5,
        121.25,
        "USD",
        "2026-05-25T16:00:00Z",
    )

    approved = dispatch_tool(
        ToolCall("quote_lookup", {"ticker": "NVDA"}, approved=True),
        snapshot,
    )
    approval_required = dispatch_tool(
        ToolCall("quote_lookup", {"ticker": "NVDA"}),
        snapshot,
    )
    denied = dispatch_tool(
        ToolCall("read_env", {"name": "API_KEY"}, approved=True),
        snapshot,
    )
    mismatched = dispatch_tool(
        ToolCall("quote_lookup", {"ticker": "MSFT"}, approved=True),
        snapshot,
    )

    assert approved.ok is True
    assert approved.data == {
        "ticker": "NVDA",
        "price": 125.5,
        "currency": "USD",
        "as_of": "2026-05-25T16:00:00Z",
    }
    assert approval_required.ok is False
    assert "approval" in approval_required.error.lower()
    assert denied.ok is False
    assert denied.data == {}
    assert mismatched.ok is False
    assert mismatched.data == {}


def test_checkpoint_6_cumulative_workflow_is_bounded_and_observable():
    result = run_milestone_application(
        FinAgentRequest("NVDA", "Summarize data center demand."),
        SNAPSHOT,
        EVIDENCE,
        provider=FixtureProvider(),
        tool_call=ToolCall(
            "quote_lookup",
            {"ticker": "NVDA"},
            approved=True,
        ),
    )

    assert result.status == "supported"
    assert result.brief.citations
    assert result.model and result.model.ok
    assert result.tool and result.tool.ok
    assert {"validate", "retrieve_evidence", "provider", "tool"}.issubset(
        step.name for step in result.trace
    )


def test_checkpoint_6_workflow_stops_before_provider_without_tool_approval():
    provider = FixtureProvider()
    result = run_milestone_application(
        FinAgentRequest("NVDA", "Summarize data center demand."),
        SNAPSHOT,
        EVIDENCE,
        provider=provider,
        tool_call=ToolCall("quote_lookup", {"ticker": "NVDA"}),
    )

    assert result.status == "approval_required"
    assert result.tool and result.tool.ok is False
    assert result.model is None
    assert provider.calls == 0
    assert result.trace[-1].name == "tool"
    assert result.trace[-1].status == "approval_required"


def test_checkpoint_7_service_contract_rejects_malformed_payloads():
    malformed_payloads = (
        [],
        {"ticker": "NVDA", "question": " "},
        {
            "ticker": "NVDA",
            "question": "Explain context.",
            "approved": "yes",
        },
    )

    for payload in malformed_payloads:
        response = handle_service_request(payload, SNAPSHOT, EVIDENCE)
        assert response["status_code"] == 422
        assert response["ok"] is False


def test_checkpoint_7_real_http_health_success_and_validation_paths():
    server = build_http_server(SNAPSHOT, EVIDENCE)
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


def test_checkpoint_8_metrics_label_fixture_and_live_evidence_separately():
    result = run_milestone_application(
        FinAgentRequest("NVDA", "Summarize data center demand."),
        SNAPSHOT,
        EVIDENCE,
    )

    assert result.metrics["provider_mode"] == "fixture"
    assert result.metrics["live_provider_verified"] is False
    assert result.metrics["latency_ms"] >= 0
    assert result.metrics["input_tokens_estimated"] > 0
    assert result.metrics["output_tokens_estimated"] > 0
    assert result.metrics["estimated_live_cost_usd"] >= 0
    assert result.metrics["actual_fixture_cost_usd"] == 0.0


def test_checkpoint_9_full_evaluation_passes_before_defense():
    report = run_evaluation(EVALUATION, SNAPSHOT, EVIDENCE)

    assert report["total"] == 10
    assert report["passed"] == 10
    assert report["failed"] == 0
    assert report["failures"] == []


def test_checkpoint_9_evaluation_reports_failure_categories(tmp_path):
    payload = json.loads(EVALUATION.read_text(encoding="utf-8"))
    payload["cases"][0]["expected_status"] = "refused"
    changed_expectation = tmp_path / "changed_expectation.json"
    changed_expectation.write_text(json.dumps(payload), encoding="utf-8")

    report = run_evaluation(changed_expectation, SNAPSHOT, EVIDENCE)

    assert report["total"] == 10
    assert report["passed"] == 9
    assert report["failed"] == 1
    assert report["failures"][0]["case_id"] == "supported-data-center"
    assert "wrong_status" in report["failures"][0]["failure_categories"]
