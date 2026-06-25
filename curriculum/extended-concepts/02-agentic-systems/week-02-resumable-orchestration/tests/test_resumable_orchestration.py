import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    OrchestrationState,
    handle_step_error,
    record_checkpoint,
    resume_from_checkpoint,
    run_orchestration,
    should_retry,
)


def test_record_checkpoint_adds_step_once():
    state = record_checkpoint(OrchestrationState("r1", "load"), "load")
    again = record_checkpoint(state, "load")

    assert again.completed == ["load"]


def test_should_retry_requires_error_and_attempt_budget():
    assert should_retry(OrchestrationState("r1", "tool", attempts=1, errors=["timeout"]), 3) is True
    assert should_retry(OrchestrationState("r1", "tool", attempts=3, errors=["timeout"]), 3) is False


def test_handle_step_error_records_attempt_and_message():
    state = handle_step_error(OrchestrationState("r1", "tool"), "timeout")

    assert state.attempts == 1
    assert state.errors == ["timeout"]


def test_resume_from_checkpoint_returns_next_uncompleted_step():
    state = OrchestrationState("r1", "retrieve", completed=["load"])

    assert resume_from_checkpoint(state, ["load", "retrieve", "answer"]) == "retrieve"


def test_run_orchestration_returns_trace_with_retry():
    trace = run_orchestration(["load", "retrieve", "answer"], failing_step="retrieve")

    assert trace["status"] == "completed"
    assert "retrieve" in trace["completed"]
    assert trace["attempts"] >= 1
