"""Tiny embedding and retrieval workbench for Module 2 Phase 2.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass


@dataclass(frozen=True)
class MarketNote:
    """A source document that FinAgent may retrieve."""

    note_id: str
    ticker: str
    text: str


@dataclass(frozen=True)
class SearchResult:
    """A scored retrieval result."""

    note: MarketNote
    score: float


@dataclass(frozen=True)
class TinyVectorIndex:
    """A deterministic vector index for market notes."""

    vocabulary: list[str]
    notes: list[MarketNote]
    vectors: list[list[float]]


def normalize_terms(text: str) -> list[str]:
    """Lowercase text and return simple alphanumeric terms."""
    # TODO: Return lowercase terms such as "AAPL revenue!" -> ["aapl", "revenue"].
    return []


def build_vocabulary(texts: list[str]) -> list[str]:
    """Build a sorted vocabulary from all texts."""
    # TODO: Collect unique normalized terms and return them in sorted order.
    return []


def vectorize(text: str, vocabulary: list[str]) -> list[float]:
    """Convert text into a term-frequency vector using the given vocabulary."""
    # TODO: Count each vocabulary term in the normalized text.
    return []


def dot_product(left: list[float], right: list[float]) -> float:
    """Return the dot product of two equal-length vectors."""
    # TODO: Multiply matching positions and sum the products.
    return 0.0


def magnitude(vector: list[float]) -> float:
    """Return the Euclidean length of a vector."""
    # TODO: Return sqrt(sum(value squared)).
    return 0.0


def cosine_similarity(left: list[float], right: list[float]) -> float:
    """Return cosine similarity, or 0.0 when either vector is empty/zero."""
    # TODO: Use dot product divided by both vector magnitudes.
    return 0.0


def build_index(notes: list[MarketNote]) -> TinyVectorIndex:
    """Build a tiny vector index from market notes."""
    # TODO: Build vocabulary from note text and vectorize each note.
    return TinyVectorIndex(vocabulary=[], notes=notes, vectors=[])


def search(query: str, index: TinyVectorIndex, top_k: int = 3) -> list[SearchResult]:
    """Return the top matching notes for a query."""
    # TODO: Vectorize query, score every indexed note, sort by score descending,
    # preserve original note order for ties, and return top_k positive results.
    return []


def build_grounded_context(results: list[SearchResult]) -> str:
    """Format retrieval results as source-grounded context."""
    # TODO: Return one line per result with note ID, ticker, score, and text.
    return ""


if __name__ == "__main__":
    notes = [
        MarketNote("note-1", "AAPL", "AAPL reports stronger iPhone revenue."),
        MarketNote("note-2", "MSFT", "MSFT expands cloud margins."),
        MarketNote("note-3", "TSLA", "TSLA lowers delivery guidance."),
    ]
    index = build_index(notes)
    print(build_grounded_context(search("Apple revenue", index)))
