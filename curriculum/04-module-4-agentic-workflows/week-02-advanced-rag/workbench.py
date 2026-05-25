"""Citation and abstention RAG workbench for Module 4 Phase 2."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class RagChunk:
    chunk_id: str
    record_id: str
    source_id: str
    text: str
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(frozen=True)
class RetrievalResult:
    chunk: RagChunk
    score: int
    matched_terms: list[str]


@dataclass(frozen=True)
class CitedAnswer:
    answer: str
    citations: list[str]
    abstained: bool
    reason: str


def load_bridge_chunks() -> list[RagChunk]:
    """Return deterministic chunks shaped like outputs from the web-data bridge."""
    # TODO: Return at least three market-context chunks with source_url metadata.
    return []


def normalize_terms(text: str) -> list[str]:
    """Normalize query or chunk text into simple searchable terms."""
    # TODO: Lowercase words, drop punctuation, and remove very short terms.
    return []


def retrieve(query: str, chunks: list[RagChunk], *, min_score: int = 1) -> list[RetrievalResult]:
    """Rank chunks by keyword overlap."""
    # TODO: Score chunks by term overlap and return sorted results above min_score.
    return []


def answer_with_citations(query: str, chunks: list[RagChunk], *, min_score: int = 2) -> CitedAnswer:
    """Answer from retrieved evidence or abstain."""
    # TODO: Use retrieve. If no result meets min_score, abstain. Otherwise
    # answer from the top chunk and cite the chunk ID.
    return CitedAnswer("", [], True, "")


def build_retrieval_trace(query: str, results: list[RetrievalResult]) -> dict[str, object]:
    """Build an inspectable trace for debugging retrieval quality."""
    # TODO: Return query, result count, chunk IDs, scores, matched terms, and sources.
    return {}
