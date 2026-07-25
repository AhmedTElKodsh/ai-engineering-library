"""Block 1 and Blocks 4-5 deterministic integration contracts."""

import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    FinAgentRequest,
    MarketSnapshot,
    build_deterministic_summary,
    compose_finagent_brief,
    load_evidence_chunks,
    load_market_snapshot,
    retrieve_evidence,
    run_finagent_workflow,
    validate_request,
)


SNAPSHOT = PROJECT_ROOT / "fixtures" / "market_snapshot.json"
EVIDENCE = PROJECT_ROOT / "fixtures" / "evidence_chunks.json"


def test_load_market_snapshot_preserves_pricing_context():
    snapshot = load_market_snapshot(SNAPSHOT)

    assert snapshot.ticker == "NVDA", "Load the fixture into the typed snapshot fields."
    assert snapshot.company_name == "NVIDIA Corporation"
    assert snapshot.price == 125.50
    assert snapshot.previous_close == 121.25
    assert snapshot.as_of.endswith("Z")


def test_load_market_snapshot_rejects_invalid_external_data(tmp_path):
    invalid = tmp_path / "invalid_snapshot.json"
    invalid.write_text(
        """
        {
          "ticker": "NVDA",
          "company_name": "NVIDIA Corporation",
          "price": 0,
          "previous_close": 121.25,
          "currency": "USD",
          "as_of": "2026-05-25T16:00:00Z"
        }
        """,
        encoding="utf-8",
    )

    try:
        load_market_snapshot(invalid)
    except ValueError as error:
        assert "price" in str(error).lower()
    else:
        raise AssertionError("Invalid external price data must fail at the loader boundary.")


def test_build_deterministic_summary_proves_the_baseline_before_rag():
    summary = build_deterministic_summary(
        MarketSnapshot(
            "NVDA",
            "NVIDIA Corporation",
            125.5,
            121.25,
            "USD",
            "2026-05-25T16:00:00Z",
        )
    )

    assert "NVDA" in summary
    assert "125.50" in summary
    assert "3.51%" in summary
    assert "not investment advice" in summary.lower()


def test_validate_request_accepts_educational_question_and_normalizes_ticker():
    decision = validate_request(FinAgentRequest("nvda", "Explain recent data center context."))

    assert {"accepted", "normalized_ticker", "reason"}.issubset(decision), (
        "Return a decision record before later workflow steps inspect its fields."
    )
    assert decision["accepted"] is True
    assert decision["normalized_ticker"] == "NVDA"
    assert decision["reason"] == "educational_request"


def test_validate_request_refuses_advice_and_malformed_tickers():
    advice = validate_request(FinAgentRequest("NVDA", "Should I buy this stock tomorrow?"))
    malformed = validate_request(FinAgentRequest("NVD4!", "Explain context."))

    assert {"accepted", "reason"}.issubset(advice), (
        "Advice requests need a structured refusal decision."
    )
    assert {"accepted", "reason"}.issubset(malformed), (
        "Malformed tickers need a structured invalid-input decision."
    )
    assert advice["accepted"] is False
    assert advice["reason"] == "investment_advice_refusal"
    assert malformed["accepted"] is False
    assert malformed["reason"] == "invalid_ticker"


def test_load_evidence_chunks_rejects_missing_provenance(tmp_path):
    invalid = tmp_path / "invalid_evidence.json"
    invalid.write_text(
        """
        {
          "chunks": [{
            "chunk_id": "ev-invalid",
            "ticker": "NVDA",
            "text": "A claim without a reviewable source.",
            "collected_at": "2026-05-25T10:00:00Z",
            "tags": ["invalid"]
          }]
        }
        """,
        encoding="utf-8",
    )

    try:
        load_evidence_chunks(invalid)
    except ValueError as error:
        assert "citation" in str(error).lower()
    else:
        raise AssertionError("Evidence without citation provenance must be rejected.")


def test_retrieve_evidence_selects_matching_cited_chunks():
    chunks = load_evidence_chunks(EVIDENCE)
    selected = retrieve_evidence(FinAgentRequest("NVDA", "What is the data center and cloud context?"), chunks)

    assert [chunk.chunk_id for chunk in selected] == ["ev-001", "ev-002"]
    assert all(chunk.ticker == "NVDA" for chunk in selected)
    assert all("https://example.com/research/" in chunk.citation for chunk in selected)


def test_retrieve_evidence_ranks_before_applying_context_budget():
    selected = retrieve_evidence(
        FinAgentRequest("NVDA", "Explain GPU capacity planning and cost controls."),
        load_evidence_chunks(EVIDENCE),
        max_chunks=1,
    )

    assert [chunk.chunk_id for chunk in selected] == ["ev-002"]


def test_compose_finagent_brief_includes_movement_citations_and_safety_note():
    snapshot = load_market_snapshot(SNAPSHOT)
    evidence = retrieve_evidence(
        FinAgentRequest("NVDA", "What is the data center and cloud context?"),
        load_evidence_chunks(EVIDENCE),
    )

    brief = compose_finagent_brief(
        FinAgentRequest("NVDA", "What is the data center and cloud context?"),
        snapshot,
        evidence,
    )

    assert brief.ticker == "NVDA"
    assert "3.51%" in brief.answer
    assert "data center" in brief.answer.lower()
    assert len(brief.citations) == 2
    assert "not investment advice" in brief.safety_note.lower()
    assert "fixture" in brief.uncertainty.lower()


def test_run_finagent_workflow_returns_trace_for_success_and_refusal():
    success = run_finagent_workflow(
        FinAgentRequest("NVDA", "Explain recent data center context."),
        SNAPSHOT,
        EVIDENCE,
    )
    refusal = run_finagent_workflow(
        FinAgentRequest("NVDA", "Should I buy this stock tomorrow?"),
        SNAPSHOT,
        EVIDENCE,
    )

    success_steps = [step.name for step in success.trace]
    refusal_steps = [step.name for step in refusal.trace]

    assert success.citations
    assert success_steps == ["validate", "load_market_snapshot", "load_evidence", "retrieve_evidence", "compose_brief"]
    assert refusal.citations == []
    assert "refuse" in refusal.answer.lower()
    assert refusal_steps == ["validate", "refuse"]


def test_run_finagent_workflow_abstains_without_approved_evidence():
    result = run_finagent_workflow(
        FinAgentRequest("NVDA", "What will the weather be tomorrow?"),
        SNAPSHOT,
        EVIDENCE,
    )

    assert result.citations == []
    assert "approved evidence" in result.answer.lower()
    assert [step.name for step in result.trace][-2:] == [
        "retrieve_evidence",
        "abstain",
    ]
