import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    ReleaseCheck,
    build_demo_script,
    build_interview_defense,
    summarize_release_evidence,
    write_limitation_note,
)


def test_build_demo_script_covers_reviewer_path():
    steps = build_demo_script()
    action_text = " ".join(step.reviewer_action.lower() for step in steps)
    evidence_text = " ".join(step.expected_evidence.lower() for step in steps)

    assert len(steps) >= 4
    assert "run" in action_text or "start" in action_text
    assert "citation" in evidence_text
    assert "abstain" in evidence_text or "refusal" in evidence_text
    assert all(step.risk_checked for step in steps)


def test_summarize_release_evidence_detects_blockers():
    checks = [
        ReleaseCheck("tests", "pytest output", True),
        ReleaseCheck("evals", "eval report", False, "citation regression"),
        ReleaseCheck("safety", "refusal case trace", True),
    ]

    summary = summarize_release_evidence(checks)

    assert summary["total_checks"] == 3
    assert summary["passed_checks"] == 2
    assert summary["ready_to_present"] is False
    assert "citation regression" in summary["blockers"]


def test_summarize_release_evidence_marks_clean_release_ready():
    checks = [
        ReleaseCheck("tests", "pytest output", True),
        ReleaseCheck("evals", "eval report", True),
        ReleaseCheck("demo", "demo transcript", True),
    ]

    summary = summarize_release_evidence(checks)

    assert summary["ready_to_present"] is True
    assert summary["blockers"] == []


def test_write_limitation_note_names_safety_boundaries():
    note = write_limitation_note()

    assert "fresh" in note.data_freshness.lower() or "stale" in note.data_freshness.lower()
    assert any("prediction" in item.lower() for item in note.unsupported_claims)
    assert "investment advice" in note.safety_boundary.lower()
    assert note.follow_up_work


def test_build_interview_defense_covers_core_tradeoffs():
    answers = build_interview_defense()
    combined = " ".join(
        " ".join(answer.answer_points).lower()
        for answer in answers
    )

    assert len(answers) >= 5
    assert "architecture" in combined
    assert "eval" in combined
    assert "citation" in combined or "source" in combined
    assert "safety" in combined
    assert "improve" in combined or "next" in combined
