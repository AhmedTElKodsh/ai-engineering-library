"""Monitoring and review loop workbench for Module 5 Week 4."""

from __future__ import annotations


def build_log_event(run_id: str, event_type: str, payload: dict[str, object]) -> dict[str, object]:
    """Return a structured log event."""
    # Hint reference: hints.md#build_log_event
    # TODO: Include run_id, event_type, payload, and severity.
    # Hint: logs should be machine-readable first; prose can come later.
    return {}


def categorize_failure(event: dict[str, object]) -> str:
    """Classify a failure event."""
    # Hint reference: hints.md#categorize_failure
    # TODO: Return citation_failure, safety_failure, latency_failure, or unknown.
    # Hint: inspect event_type and payload clues, then fall back to unknown.
    return ""


def summarize_monitoring_events(events: list[dict[str, object]]) -> dict[str, object]:
    """Return counts and failure categories."""
    # Hint reference: hints.md#summarize_monitoring_events
    # TODO: Count events and category frequencies.
    # Hint: count all events, then separately count only the failure categories.
    return {}


def build_review_loop(summary: dict[str, object]) -> list[str]:
    """Return review actions from monitoring summary."""
    # Hint reference: hints.md#build_review_loop
    # TODO: Add actions for citation, safety, and latency failures.
    # Hint: actions should map to observed categories, not generic cleanup.
    return []
