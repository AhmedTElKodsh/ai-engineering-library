"""Week 02 - Python for Production: Test Suite

~35 targeted tests. Each mirrors a real AI engineering pattern.
Green = ready for AI engineering Week 1+ production patterns.
"""
import sys
from pathlib import Path

import pytest
import time

try:
    sys.modules.pop("workbench", None)
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from workbench import (
        ValidationError,
        APIError,
        safe_divide,
        validate_llm_config,
        process_api_responses,
        Timer,
        Suppress,
        ManagedResource,
        BaseModel,
        DocumentSchema,
        BaseAgent,
        RAGAgent,
        Step,
        Pipeline,
        EmbeddingVector,
        batch_embed,
        filter_by_score,
        build_metadata_index,
        count_by_category,
        stream_tokens,
        batch_generator,
        document_pipeline,
        fibonacci,
        update_state,
        zip_to_records,
        indexed_chunks,
        deep_get,
    )
except ImportError as e:
    pytest.skip(f"Import failed: {e}", allow_module_level=True)


# -- Section 1: Error Handling -----------------------------

def test_validation_error_attributes():
    err = ValidationError("temperature", "must be 0-2")
    assert err.field == "temperature"
    assert err.message == "must be 0-2"
    assert "temperature" in str(err)


def test_api_error_attributes():
    err = APIError(429, "rate limit exceeded")
    assert err.status_code == 429
    assert "429" in str(err)


def test_safe_divide_basic():
    assert safe_divide(10, 2) == 5.0


def test_safe_divide_zero():
    with pytest.raises(ZeroDivisionError):
        safe_divide(10, 0)


def test_safe_divide_type_error():
    with pytest.raises(TypeError):
        safe_divide("10", 2)


def test_validate_llm_config_valid():
    cfg = {"model": "gpt-4o", "temperature": 0.7, "max_tokens": 1024}
    assert validate_llm_config(cfg) == cfg


def test_validate_llm_config_missing_model():
    with pytest.raises(ValidationError) as exc:
        validate_llm_config({"temperature": 0.7, "max_tokens": 1024})
    assert exc.value.field == "model"


def test_validate_llm_config_bad_temperature():
    with pytest.raises(ValidationError) as exc:
        validate_llm_config({"model": "gpt-4", "temperature": 3.0, "max_tokens": 1024})
    assert exc.value.field == "temperature"


def test_validate_llm_config_bad_tokens():
    with pytest.raises(ValidationError) as exc:
        validate_llm_config({"model": "gpt-4", "temperature": 0.7, "max_tokens": 0})
    assert exc.value.field == "max_tokens"


def test_process_api_responses():
    responses = [
        {"status": 200, "data": "hello"},
        {"status": 429, "error": "rate limit"},
        {"status": 200, "data": "world"},
    ]
    result = process_api_responses(responses)
    assert result["successes"] == ["hello", "world"]
    assert len(result["failures"]) == 1
    assert result["failures"][0]["index"] == 1


# -- Section 2: Context Managers ---------------------------

def test_timer_records_elapsed():
    with Timer() as t:
        time.sleep(0.01)
    assert hasattr(t, "elapsed")
    assert t.elapsed >= 0.005


def test_suppress_catches_exception():
    s = Suppress(ValueError)
    with s:
        int("abc")
    assert isinstance(s.exception, ValueError)


def test_suppress_passes_other_exceptions():
    s = Suppress(ValueError)
    with pytest.raises(TypeError):
        with s:
            raise TypeError("not suppressed")


def test_managed_resource_open_close():
    r = ManagedResource("test_db")
    with r:
        assert r.open is True
    assert r.open is False
    assert "opened" in r.log
    assert "closed" in r.log


def test_managed_resource_exception_logged():
    r = ManagedResource("test_db")
    with pytest.raises(RuntimeError):
        with r:
            raise RuntimeError("boom")
    assert any("error" in entry for entry in r.log)


# -- Section 3: OOP & Inheritance --------------------------

def test_base_model_dump():
    m = BaseModel(title="test", value=42)
    d = m.model_dump()
    assert d["title"] == "test"
    assert d["value"] == 42


def test_document_schema():
    doc = DocumentSchema(title="AI Paper", content="RAG is...", source="arxiv", chunk_index=0)
    d = doc.model_dump()
    assert d["title"] == "AI Paper"
    assert d["chunk_index"] == 0


def test_base_agent_stats():
    class EchoAgent(BaseAgent):
        def run(self, text):
            self._call_count += 1
            return text

    agent = EchoAgent("echo", "gpt-4")
    agent.run("hello")
    agent.run("world")
    stats = agent.get_stats()
    assert stats["name"] == "echo"
    assert stats["calls"] == 2


def test_rag_agent_run():
    retriever = lambda q: f"context for: {q}"
    template = "Context:\n{context}\n\nQuestion: {question}"
    agent = RAGAgent("rag", "gpt-4", retriever, template)
    result = agent.run("What is RAG?")
    assert "context for: What is RAG?" in result
    assert "What is RAG?" in result
    assert agent.get_stats()["calls"] == 1


# -- Section 4: Magic Methods ------------------------------

def test_step_call():
    double = Step("double", lambda x: x * 2)
    assert double(5) == 10


def test_step_pipe_creates_pipeline():
    double = Step("double", lambda x: x * 2)
    add1 = Step("add1", lambda x: x + 1)
    pipe = double | add1
    assert isinstance(pipe, Pipeline)
    assert pipe(3) == 7  # (3*2) + 1


def test_pipeline_chaining():
    a = Step("a", lambda x: x + 1)
    b = Step("b", lambda x: x * 2)
    c = Step("c", lambda x: x - 3)
    pipe = a | b | c
    assert pipe(5) == (5 + 1) * 2 - 3  # 9


def test_embedding_vector_len():
    v = EmbeddingVector([0.1, 0.2, 0.3])
    assert len(v) == 3


def test_embedding_vector_eq():
    v1 = EmbeddingVector([0.1, 0.2], "model-a")
    v2 = EmbeddingVector([0.1, 0.2], "model-a")
    assert v1 == v2


def test_embedding_vector_neq_different_model():
    v1 = EmbeddingVector([0.1, 0.2], "model-a")
    v2 = EmbeddingVector([0.1, 0.2], "model-b")
    assert v1 != v2


def test_embedding_vector_getitem():
    v = EmbeddingVector([0.1, 0.5, 0.9])
    assert v[1] == pytest.approx(0.5)
    assert v[:2] == [0.1, 0.5]


# -- Section 5: Comprehensions -----------------------------

def test_batch_embed():
    result = batch_embed(["a", "b", "c"], lambda x: x.upper())
    assert result == ["A", "B", "C"]


def test_filter_by_score():
    records = [{"score": 0.9}, {"score": 0.4}, {"score": 0.7}]
    result = filter_by_score(records, 0.6)
    assert len(result) == 2
    assert all(r["score"] >= 0.6 for r in result)


def test_build_metadata_index():
    docs = [
        {"source": "doc1", "metadata": {"pages": 10}},
        {"source": "doc2", "metadata": {"pages": 5}},
    ]
    idx = build_metadata_index(docs)
    assert idx["doc1"]["pages"] == 10
    assert "doc2" in idx


def test_count_by_category():
    items = [{"type": "pdf"}, {"type": "txt"}, {"type": "pdf"}, {"type": "md"}]
    counts = count_by_category(items, "type")
    assert counts["pdf"] == 2
    assert counts["txt"] == 1


# -- Section 6: Generators ---------------------------------

def test_stream_tokens_chunks():
    result = list(stream_tokens("Hello", chunk_size=2))
    assert "".join(result) == "Hello"
    assert all(len(t) <= 2 for t in result)


def test_batch_generator():
    result = list(batch_generator([1, 2, 3, 4, 5], 2))
    assert result == [[1, 2], [3, 4], [5]]


def test_document_pipeline():
    docs = ["abcdef", "", "xyz"]
    chunks = list(document_pipeline(docs, chunk_size=3))
    assert "" not in ["".join(c) for c in chunks]  # empty doc skipped
    for chunk in chunks:
        assert len(chunk) <= 3


def test_fibonacci():
    result = list(fibonacci(8))
    assert result == [0, 1, 1, 2, 3, 5, 8, 13]


def test_fibonacci_zero():
    assert list(fibonacci(0)) == []


# -- Section 7: Pythonic Patterns -------------------------

def test_update_state_immutable():
    state = {"messages": ["hello"], "count": 1}
    new_state = update_state(state, count=2, status="done")
    assert new_state["count"] == 2
    assert new_state["status"] == "done"
    assert new_state["messages"] == ["hello"]
    assert state["count"] == 1, "Original state must not be mutated"


def test_zip_to_records():
    result = zip_to_records(["name", "score"], ["Alice", 95], ["Bob", 87])
    assert result == [{"name": "Alice", "score": 95}, {"name": "Bob", "score": 87}]


def test_indexed_chunks():
    chunks = ["first", "second", "third"]
    result = indexed_chunks(chunks)
    assert result[0] == {"index": 0, "chunk": "first"}
    assert result[2] == {"index": 2, "chunk": "third"}


def test_deep_get_success():
    data = {"user": {"address": {"city": "Cairo"}}}
    assert deep_get(data, "user.address.city") == "Cairo"


def test_deep_get_missing():
    data = {"user": {"name": "Alice"}}
    assert deep_get(data, "user.email", "N/A") == "N/A"


def test_deep_get_empty_path():
    data = {"key": "val"}
    assert deep_get(data, "key") == "val"
