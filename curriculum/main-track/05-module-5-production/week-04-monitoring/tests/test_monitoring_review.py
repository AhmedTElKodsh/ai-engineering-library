import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import build_log_event, build_review_loop, categorize_failure, summarize_monitoring_events  # noqa: E402


def test_build_log_event_defaults_warning_for_failures():
    event = build_log_event("r1", "failure", {"reason": "missing citation"})

    assert event["run_id"] == "r1"
    assert event["severity"] == "warning"


def test_categorize_failure_detects_citation_and_safety():
    assert categorize_failure({"payload": {"reason": "missing citation"}}) == "citation_failure"
    assert categorize_failure({"payload": {"reason": "investment advice"}}) == "safety_failure"


def test_summarize_monitoring_events_counts_categories():
    events = [
        build_log_event("r1", "failure", {"reason": "missing citation"}),
        build_log_event("r2", "failure", {"reason": "investment advice"}),
    ]
    summary = summarize_monitoring_events(events)

    assert summary["total_events"] == 2
    assert summary["failure_categories"]["citation_failure"] == 1


def test_build_review_loop_names_actions():
    actions = build_review_loop({"failure_categories": {"citation_failure": 1, "safety_failure": 1}})

    assert "review citation retrieval" in actions
    assert "review safety refusal rules" in actions
