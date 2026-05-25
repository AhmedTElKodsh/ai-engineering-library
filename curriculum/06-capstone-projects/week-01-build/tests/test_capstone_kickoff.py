import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_eval_cases,
    build_portfolio_evidence_ledger,
    define_capstone_scope,
    score_eval_case,
)


def test_define_capstone_scope_sets_safe_finagent_boundaries():
    scope = define_capstone_scope()

    assert scope.product_name == "FinAgent"
    assert "educational" in scope.target_user.lower()
    assert any("citation" in item.lower() for item in scope.allowed_behaviors)
    assert any("investment recommendation" in item.lower() for item in scope.non_goals)
    assert scope.required_sources
    assert scope.safety_limits


def test_build_eval_cases_covers_capstone_failure_modes():
    cases = build_eval_cases()
    expected = {case.expected_behavior for case in cases}

    assert len(cases) >= 4
    assert {"cited_answer", "abstain", "invalid_input", "refuse_advice"}.issubset(expected)


def test_score_eval_case_returns_repeatable_evidence():
    case = next(item for item in build_eval_cases() if item.expected_behavior == "refuse_advice")

    passed = score_eval_case(case, "refuse_advice")
    failed = score_eval_case(case, "cited_answer")

    assert passed["passed"] is True
    assert failed["passed"] is False
    assert failed["case_id"] == case.case_id


def test_build_portfolio_evidence_ledger_names_reviewer_checks():
    ledger = build_portfolio_evidence_ledger()
    artifacts = {entry.artifact for entry in ledger}

    assert "README" in artifacts
    assert "architecture_diagram" in artifacts
    assert "eval_report" in artifacts
    assert all(entry.reviewer_check for entry in ledger)
