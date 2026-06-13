import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    answer_with_citations,
    build_retrieval_trace,
    load_bridge_chunks,
    normalize_terms,
    retrieve,
)


def test_load_bridge_chunks_preserves_web_acquisition_provenance():
    chunks = load_bridge_chunks()

    assert len(chunks) >= 3
    assert all(chunk.chunk_id for chunk in chunks)
    assert all(chunk.metadata.get("source_url", "").startswith("https://") for chunk in chunks)


def test_normalize_terms_removes_punctuation_and_short_words():
    assert normalize_terms("Cloud revenue, and AI!") == ["cloud", "revenue"]


def test_retrieve_ranks_chunks_by_overlap():
    chunks = load_bridge_chunks()

    results = retrieve("cloud revenue demand", chunks)

    assert results
    assert results[0].score >= results[-1].score
    assert "cloud" in results[0].matched_terms


def test_answer_with_citations_returns_supported_answer():
    answer = answer_with_citations("What does the cloud revenue source say?", load_bridge_chunks())

    assert answer.abstained is False
    assert answer.answer
    assert answer.citations
    assert answer.reason == "supported_by_retrieval"


def test_answer_with_citations_abstains_without_evidence():
    answer = answer_with_citations("What is the guaranteed stock price next month?", load_bridge_chunks())

    assert answer.abstained is True
    assert answer.citations == []
    assert "insufficient" in answer.reason


def test_build_retrieval_trace_is_debuggable():
    results = retrieve("currency exposure", load_bridge_chunks())

    trace = build_retrieval_trace("currency exposure", results)

    assert trace["query"] == "currency exposure"
    assert trace["result_count"] == len(results)
    assert trace["results"][0]["chunk_id"]
    assert trace["results"][0]["matched_terms"]
