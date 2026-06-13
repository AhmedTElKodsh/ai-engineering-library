"""Structured context and trace workbench for Module 3 Phase 3.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ContextItem:
    """One source-grounded context item passed toward a model."""

    source_id: str
    text: str
    metadata: dict[str, str]


@dataclass(frozen=True)
class StructuredAnswer:
    """A validated answer shape the assistant may trust."""

    answer: str
    citations: list[str]
    confidence: str


def sanitize_text(text: str) -> str:
    """Remove unsafe instruction-like fragments from context text."""
    # TODO: Remove common prompt-injection phrases while keeping market content.
    return text


def validate_context_items(items: list[ContextItem]) -> list[ContextItem]:
    """Validate context shape before rendering a prompt."""
    # TODO: Require source_id, text, and metadata["ticker"] for every item.
    return []


def prepare_model_context(items: list[ContextItem]) -> str:
    """Render validated, sanitized context lines for a model prompt."""
    # TODO: Return one line per source: [source_id] ticker: sanitized text.
    return ""


def validate_structured_answer(payload: dict[str, object]) -> StructuredAnswer:
    """Validate an assistant JSON-style output before trusting it."""
    # TODO: Require answer string, citations list[str], and confidence low/medium/high.
    return StructuredAnswer(answer="", citations=[], confidence="")


def build_trace_record(
    request_id: str,
    context_items: list[ContextItem],
    answer: StructuredAnswer,
) -> dict[str, object]:
    """Build debug metadata without leaking full prompt text."""
    # TODO: Include request ID, source IDs, citation count, confidence,
    # and whether every citation appears in the available context.
    return {}
