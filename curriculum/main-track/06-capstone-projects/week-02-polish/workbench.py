"""FinAgent capstone polish workbench."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class DemoStep:
    step_id: str
    reviewer_action: str
    expected_evidence: str
    risk_checked: str


@dataclass(frozen=True)
class ReleaseCheck:
    check_id: str
    evidence: str
    passed: bool
    blocker: str | None = None


@dataclass(frozen=True)
class LimitationNote:
    data_freshness: str
    unsupported_claims: list[str]
    safety_boundary: str
    follow_up_work: list[str]


@dataclass(frozen=True)
class DefenseAnswer:
    question: str
    answer_points: list[str] = field(default_factory=list)


def build_demo_script() -> list[DemoStep]:
    """Create a short reviewer-run demo path for the capstone."""
    # TODO: Include setup, safe cited-answer, abstention/refusal, and evidence review steps.
    return []


def summarize_release_evidence(checks: list[ReleaseCheck]) -> dict[str, object]:
    """Summarize whether the capstone is ready to present."""
    # TODO: Count checks, list blockers, and mark ready only when every check passes.
    return {}


def write_limitation_note() -> LimitationNote:
    """Document the capstone's safety and evidence limits."""
    # TODO: Name source freshness limits, unsupported claims, non-advice boundary, and follow-up work.
    return LimitationNote("", [], "", [])


def build_interview_defense() -> list[DefenseAnswer]:
    """Prepare concise answers for portfolio review questions."""
    # TODO: Cover architecture, evals, source grounding, safety, and next improvements.
    return []
