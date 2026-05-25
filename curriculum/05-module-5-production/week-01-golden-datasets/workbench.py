"""Golden eval scaffold for Module 5 Week 1."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class GoldenExample:
    case_id: str
    query: str
    expected_abstained: bool
    requires_citation: bool
    safety_category: str


@dataclass(frozen=True)
class ObservedAnswer:
    case_id: str
    answer: str
    citations: list[str] = field(default_factory=list)
    abstained: bool = False
    safety_category: str = "supported"


def load_golden_examples() -> list[GoldenExample]:
    """Return a deterministic golden set for cited FinAgent behavior."""
    # TODO: Include supported, abstention, and investment-advice refusal cases.
    return []


def evaluate_answer(example: GoldenExample, observed: ObservedAnswer) -> dict[str, object]:
    """Evaluate one observed answer against one golden example."""
    # TODO: Check abstention, citation requirement, and safety category.
    return {}


def summarize_eval(results: list[dict[str, object]]) -> dict[str, object]:
    """Summarize eval rows into release-gate evidence."""
    # TODO: Return total, passed, failed, and failure_categories counts.
    return {}
