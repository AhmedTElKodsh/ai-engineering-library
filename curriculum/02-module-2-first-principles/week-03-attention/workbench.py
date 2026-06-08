"""Scaled dot-product attention workbench for Module 2 Phase 3.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


Vector = list[float]
Matrix = list[Vector]


@dataclass(frozen=True)
class AttentionSource:
    """A named context item that can receive attention."""

    source_id: str
    ticker: str
    text: str


@dataclass(frozen=True)
class AttentionResult:
    """Attention output plus inspectable source weights."""

    output: Vector
    weights: list[float]
    sources: list[AttentionSource]


def dot_product(left: Vector, right: Vector) -> float:
    """Return the dot product of two equal-length vectors."""
    # TODO: Validate matching lengths, multiply matching positions, and sum.
    return 0.0


def scale_scores(scores: list[float], dimension: int) -> list[float]:
    """Scale scores by sqrt(dimension)."""
    # TODO: Divide each score by sqrt(dimension). Reject non-positive dimensions.
    return []


def softmax(scores: list[float]) -> list[float]:
    """Convert scores into positive weights that sum to 1."""
    # TODO: Implement stable softmax by subtracting the max score first.
    return []


def weighted_sum(weights: list[float], values: Matrix) -> Vector:
    """Blend value vectors using attention weights."""
    # TODO: Return the weighted sum across all value vectors.
    return []


def attention(
    query: Vector,
    keys: Matrix,
    values: Matrix,
    sources: list[AttentionSource],
) -> AttentionResult:
    """Run scaled dot-product attention for one query over many sources."""
    # TODO: Validate aligned inputs, score query against keys, scale, softmax,
    # blend values, and return AttentionResult.
    return AttentionResult(output=[], weights=[], sources=sources)


def most_attended_source(result: AttentionResult) -> AttentionSource | None:
    """Return the source with the highest attention weight."""
    # TODO: Return None when there are no weights or sources.
    return None


def explain_attention(result: AttentionResult) -> str:
    """Create a short debugging explanation for FinAgent."""
    # TODO: Include the top source ID, ticker, and weight rounded to two decimals.
    return ""


if __name__ == "__main__":
    sources = [
        AttentionSource("note-1", "AAPL", "AAPL revenue improved."),
        AttentionSource("note-2", "MSFT", "MSFT cloud margins expanded."),
        AttentionSource("note-3", "TSLA", "TSLA deliveries fell."),
    ]
    query = [1.0, 0.0]
    keys = [[1.0, 0.0], [0.2, 0.8], [0.0, 1.0]]
    values = [[10.0, 1.0], [2.0, 8.0], [1.0, 9.0]]
    print(explain_attention(attention(query, keys, values, sources)))
