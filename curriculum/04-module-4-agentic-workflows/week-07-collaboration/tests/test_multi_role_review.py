import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    ReviewTask,
    RoleReview,
    assign_roles,
    collect_role_reviews,
    create_handoff,
    decide_collaboration_outcome,
    run_collaboration,
)


def test_assign_roles_adds_safety_for_high_risk():
    roles = assign_roles(ReviewTask("t1", "engineer", "review stock summary", "high"))

    assert "engineer" in roles
    assert "safety" in roles


def test_create_handoff_keeps_minimal_context():
    handoff = create_handoff(ReviewTask("t1", "engineer", "summary", "low"), "engineer", "writer")

    assert handoff == {"task_id": "t1", "from": "engineer", "to": "writer", "summary": "summary", "risk": "low"}


def test_collect_role_reviews_returns_one_review_per_role():
    reviews = collect_role_reviews(ReviewTask("t1", "engineer", "summary", "medium"), ["engineer", "writer"])

    assert [review.role for review in reviews] == ["engineer", "writer"]
    assert all(review.finding for review in reviews)


def test_decide_collaboration_outcome_escalates_critical_reviews():
    outcome = decide_collaboration_outcome([RoleReview("safety", "advice risk", "critical")])

    assert outcome == "escalate"


def test_run_collaboration_returns_traceable_decision():
    result = run_collaboration(ReviewTask("t1", "engineer", "high-risk summary", "high"))

    assert result["outcome"] == "escalate"
    assert result["roles"]
    assert result["handoffs"]
