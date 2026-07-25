"""Critique and review loop workbench for Module 4 Phase 4."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Draft:
    text: str
    citations: list[str]
    risk_level: str


@dataclass(frozen=True)
class Critique:
    passed: bool
    issues: list[str]
    needs_human_review: bool


def critique_draft(draft: Draft) -> Critique:
    """Check a draft for citations, advice language, and risk."""
    # Hint reference: hints.md#critique_draft
    # TODO: Fail missing citations, investment advice, and high-risk drafts needing review.
    # Hint: collect all issues you can see so the revision step has a useful checklist.
    return Critique(False, [], False)


def should_retry(critique: Critique, attempt: int, max_attempts: int = 2) -> bool:
    """Return whether the workflow should retry automatically."""
    # Hint reference: hints.md#should_retry
    # TODO: Retry failed drafts only while attempts remain and no human review is required.
    # Hint: human-review cases should stop automatic retries even if attempts remain.
    return False


def revise_draft(draft: Draft, critique: Critique) -> Draft:
    """Return a safer deterministic revision."""
    # Hint reference: hints.md#revise_draft
    # TODO: Add limitation language and preserve citations.
    # Hint: revision should reduce risk without erasing the evidence trail.
    return draft


def run_review_loop(draft: Draft, max_attempts: int = 2) -> dict[str, object]:
    """Run critique and bounded retry loop."""
    # Hint reference: hints.md#run_review_loop
    # TODO: Critique, revise while allowed, and return final draft plus trace.
    # Hint: trace each attempt so a reviewer can see why the loop stopped.
    return {}
