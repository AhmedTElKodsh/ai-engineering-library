"""Context window and decoding workbench for Module 2 Phase 5.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ContextItem:
    source_id: str
    text: str
    priority: int


@dataclass(frozen=True)
class ContextSelection:
    kept: list[ContextItem]
    dropped: list[ContextItem]
    token_count: int


def estimate_tokens(text: str) -> int:
    """Estimate tokens by counting whitespace-separated terms."""
    # TODO: Return 0 for blank text and otherwise count terms.
    return 0


def select_context(items: list[ContextItem], max_tokens: int) -> ContextSelection:
    """Keep highest-priority context items within a token budget."""
    # TODO: Sort by priority descending, preserve source IDs, and split kept/dropped.
    return ContextSelection([], [], 0)


def softmax(logits: list[float], temperature: float = 1.0) -> list[float]:
    """Convert logits into probabilities."""
    # TODO: Reject temperature <= 0 and use stable softmax.
    return []


def decode_next_token(logits: dict[str, float], mode: str = "greedy", temperature: float = 1.0) -> str:
    """Choose the next token deterministically."""
    # TODO: Greedy returns highest logit. Temperature mode returns highest softmax probability.
    return ""


def choose_model_strategy(requirement: str, context_tokens: int, budget_tokens: int) -> dict[str, object]:
    """Return a model/system strategy decision for a narrow requirement."""
    # TODO: Prefer deterministic code for calculations, RAG for evidence gaps,
    # and larger context only when the token budget is exceeded.
    return {}
