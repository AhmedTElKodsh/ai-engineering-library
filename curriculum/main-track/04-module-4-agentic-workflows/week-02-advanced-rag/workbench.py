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
    score: float
    matched_terms: list[str]


@dataclass(frozen=True)
class CitedAnswer:
    answer: str
    citations: list[str]
    abstained: bool
    reason: str


def load_bridge_chunks() -> list[RagChunk]:
    """Return deterministic chunks shaped like outputs from the web-data bridge."""
    # Hint reference: hints.md#load_bridge_chunks
    # TODO: Return at least three market-context chunks with source_url metadata.
    # Hint: each chunk needs enough metadata to support citations later.
    return []


def normalize_terms(text: str) -> list[str]:
    """Normalize query or chunk text into simple searchable terms."""
    # Hint reference: hints.md#normalize_terms
    # TODO: Lowercase words, drop punctuation, and remove very short terms.
    # Hint: use the same normalization for queries and chunks or scores will drift.
    return []


def retrieve(query: str, chunks: list[RagChunk], *, min_score: int = 1) -> list[RetrievalResult]:
    """Rank chunks by keyword overlap."""
    # Hint reference: hints.md#retrieve
    # TODO: Score chunks by term overlap and return sorted results above min_score.
    # Hint: matched terms are evidence, not just an internal scoring detail.
    return []


def build_tiny_vocabulary(chunks: list[RagChunk], *, max_terms: int = 12) -> list[str]:
    """Return a small deterministic vocabulary for embedding-style comparison."""
    # Hint reference: hints.md#build_tiny_vocabulary
    # TODO: Count normalized chunk terms and return the most common terms in
    # stable order. Keep this tiny so learners can inspect every dimension.
    # Hint: stable tie-breaking makes the vector dimensions reviewable.
    return []


def vectorize_terms(terms: list[str], vocabulary: list[str]) -> list[float]:
    """Represent normalized terms as a tiny count vector."""
    # Hint reference: hints.md#vectorize_terms
    # TODO: Return one count per vocabulary term.
    # Hint: output position must match the vocabulary position.
    return []


def cosine_similarity(left: list[float], right: list[float]) -> float:
    """Compare two tiny vectors without a library."""
    # Hint reference: hints.md#cosine_similarity
    # TODO: Reuse Module 2 vector discipline. Return 0.0 when either vector has
    # zero magnitude.
    # Hint: zero vectors mean there is no meaningful angle to compare.
    return 0.0


def retrieve_hybrid(
    query: str,
    chunks: list[RagChunk],
    *,
    keyword_weight: float = 1.0,
    vector_weight: float = 1.0,
    min_score: float = 1.0,
) -> list[RetrievalResult]:
    """Rank chunks with keyword overlap plus tiny vector similarity."""
    # Hint reference: hints.md#retrieve_hybrid
    # TODO: Build a vocabulary, combine keyword and vector scores, and return
    # RetrievalResult objects sorted by hybrid score.
    # Hint: keep keyword matches in the result so the score remains explainable.
    return []


def answer_with_citations(query: str, chunks: list[RagChunk], *, min_score: int = 2) -> CitedAnswer:
    """Answer from retrieved evidence or abstain."""
    # Hint reference: hints.md#answer_with_citations
    # TODO: Use retrieve. If no result meets min_score, abstain. Otherwise
    # answer from the top chunk and cite the chunk ID.
    # Hint: no evidence should produce an abstention, not a confident guess.
    return CitedAnswer("", [], True, "")


def build_retrieval_trace(query: str, results: list[RetrievalResult]) -> dict[str, object]:
    """Build an inspectable trace for debugging retrieval quality."""
    # Hint reference: hints.md#build_retrieval_trace
    # TODO: Return query, result count, chunk IDs, scores, matched terms, and sources.
    # Hint: include both what matched and where it came from.
    return {}
