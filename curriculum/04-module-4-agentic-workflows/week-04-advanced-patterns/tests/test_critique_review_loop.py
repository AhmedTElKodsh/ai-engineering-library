import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import Draft, critique_draft, revise_draft, run_review_loop, should_retry  # noqa: E402


def test_critique_draft_flags_missing_citations_and_advice():
    critique = critique_draft(Draft("Buy AAPL now", [], "medium"))

    assert critique.passed is False
    assert "missing_citations" in critique.issues
    assert "investment_advice" in critique.issues


def test_critique_draft_requires_human_review_for_high_risk():
    critique = critique_draft(Draft("AAPL moved sharply. [s1]", ["s1"], "high"))

    assert critique.needs_human_review is True


def test_should_retry_respects_attempt_limit_and_human_review():
    critique = critique_draft(Draft("No citations", [], "low"))
    high_risk = critique_draft(Draft("High risk [s1]", ["s1"], "high"))

    assert should_retry(critique, attempt=1, max_attempts=2) is True
    assert should_retry(critique, attempt=2, max_attempts=2) is False
    assert should_retry(high_risk, attempt=1, max_attempts=2) is False


def test_revise_draft_adds_limitations_without_dropping_citations():
    revised = revise_draft(Draft("AAPL moved up. [s1]", ["s1"], "low"), critique_draft(Draft("x", [], "low")))

    assert "not financial advice" in revised.text.lower()
    assert revised.citations == ["s1"]


def test_run_review_loop_returns_traceable_result():
    result = run_review_loop(Draft("AAPL moved up. [s1]", ["s1"], "low"))

    assert result["status"] == "passed"
    assert result["attempts"] >= 1
    assert "final_text" in result
