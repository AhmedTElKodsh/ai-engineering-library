"""Model selection and adaptation workbench for Module 5 Week 7."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Requirement:
    task: str
    failure_mode: str
    has_labeled_examples: bool
    needs_fresh_data: bool


def score_option(requirement: Requirement, option: str) -> int:
    """Score an adaptation option from 0 to 3."""
    # TODO: Score deterministic/tools/RAG/prompt/fine_tune based on failure mode.
    return 0


def rank_options(requirement: Requirement) -> list[str]:
    """Return adaptation options from best to worst."""
    # TODO: Rank known options by score descending.
    return []


def choose_adaptation(requirement: Requirement) -> dict[str, object]:
    """Return recommended first choice with rationale."""
    # TODO: Use rank_options and explain why fine-tuning is or is not appropriate.
    return {}


def build_decision_note(requirement: Requirement) -> str:
    """Return a concise model-selection decision note."""
    # TODO: Include task, failure mode, recommendation, and tradeoff.
    return ""
