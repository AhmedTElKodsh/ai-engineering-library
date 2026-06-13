import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import GraphState, answer_node, classify_node, retrieve_node, run_state_machine, summarize_state  # noqa: E402


def test_classify_node_routes_advice_to_refuse():
    state = classify_node(GraphState("Tell me what stock to buy"))

    assert state.route == "refuse"
    assert state.status == "classified"


def test_retrieve_node_adds_evidence_for_retrieve_route():
    state = retrieve_node(GraphState("Explain AAPL revenue", route="retrieve", status="classified"))

    assert state.evidence
    assert state.status == "retrieved"


def test_answer_node_abstains_without_evidence():
    state = answer_node(GraphState("Explain AAPL revenue", route="retrieve", status="classified"))

    assert state.status == "abstained"
    assert "insufficient" in state.answer.lower()


def test_run_state_machine_does_not_mutate_original():
    original = GraphState("Explain AAPL revenue")
    final = run_state_machine(original)

    assert original.status == "new"
    assert final.status == "answered"
    assert final.evidence


def test_summarize_state_reports_debug_metadata():
    summary = summarize_state(GraphState("x", evidence=["s1"], route="answer", answer="ok", status="answered"))

    assert summary["evidence_count"] == 1
    assert summary["has_answer"] is True
