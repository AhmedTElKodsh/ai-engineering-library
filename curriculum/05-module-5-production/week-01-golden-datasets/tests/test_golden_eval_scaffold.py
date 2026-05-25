import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    ObservedAnswer,
    evaluate_answer,
    load_golden_examples,
    summarize_eval,
)


def test_load_golden_examples_covers_required_behavior_types():
    examples = load_golden_examples()
    categories = {example.safety_category for example in examples}

    assert len(examples) >= 3
    assert any(example.requires_citation for example in examples)
    assert any(example.expected_abstained for example in examples)
    assert {"supported", "unsupported", "investment_advice"}.issubset(categories)


def test_evaluate_answer_passes_supported_cited_case():
    example = next(item for item in load_golden_examples() if item.requires_citation)
    observed = ObservedAnswer(
        case_id=example.case_id,
        answer="Cloud revenue demand was steady.",
        citations=["chunk-cloud-001"],
        abstained=False,
        safety_category=example.safety_category,
    )

    result = evaluate_answer(example, observed)

    assert result["passed"] is True
    assert result["failure_categories"] == []


def test_evaluate_answer_fails_missing_citation():
    example = next(item for item in load_golden_examples() if item.requires_citation)
    observed = ObservedAnswer(
        case_id=example.case_id,
        answer="Cloud revenue demand was steady.",
        citations=[],
        abstained=False,
        safety_category=example.safety_category,
    )

    result = evaluate_answer(example, observed)

    assert result["passed"] is False
    assert "missing_citation" in result["failure_categories"]


def test_summarize_eval_counts_failures_by_category():
    results = [
        {"passed": True, "failure_categories": []},
        {"passed": False, "failure_categories": ["missing_citation"]},
        {"passed": False, "failure_categories": ["wrong_abstention", "safety_mismatch"]},
    ]

    summary = summarize_eval(results)

    assert summary["total"] == 3
    assert summary["passed"] == 1
    assert summary["failed"] == 2
    assert summary["failure_categories"]["missing_citation"] == 1
