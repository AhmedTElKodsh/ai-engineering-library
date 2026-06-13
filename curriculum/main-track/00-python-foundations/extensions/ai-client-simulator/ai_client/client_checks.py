"""Extension - AI Client Simulator: Integration Test Suite

Tests the complete system end-to-end.
All green = every Python foundation applied in a realistic AI engineering context.
"""
import pytest
import time

# -- Config ------------------------------------------------

try:
    from config import LLMConfig, ConfigError
except ImportError:
    try:
        from ai_client.config import LLMConfig, ConfigError
    except ImportError as e:
        pytest.skip(f"Cannot import config: {e}", allow_module_level=True)

try:
    from prompts import PromptBuilder
except ImportError:
    from ai_client.prompts import PromptBuilder

try:
    from client import LLMClient
except ImportError:
    from ai_client.client import LLMClient

try:
    from processing import (
        chunk_document, parse_llm_response, batch_process,
        deduplicate, score_and_rank, processing_timer,
    )
except ImportError:
    from ai_client.processing import (
        chunk_document, parse_llm_response, batch_process,
        deduplicate, score_and_rank, processing_timer,
    )


# -- LLMConfig tests ---------------------------------------

def test_config_valid():
    cfg = LLMConfig(provider="openai", model="gpt-4o", temperature=0.7, max_tokens=1024)
    assert cfg.provider == "openai"
    assert cfg.model == "gpt-4o"
    assert cfg.temperature == 0.7
    assert cfg.max_tokens == 1024


def test_config_defaults():
    cfg = LLMConfig(provider="anthropic", model="claude-3-5-sonnet-20241022")
    assert cfg.temperature == 0.7
    assert cfg.max_tokens == 1024
    assert "helpful" in cfg.system_prompt.lower()


def test_config_invalid_provider():
    with pytest.raises(ConfigError) as exc:
        LLMConfig(provider="fakeai", model="gpt-4")
    assert exc.value.field == "provider"


def test_config_invalid_temperature():
    with pytest.raises(ConfigError) as exc:
        LLMConfig(provider="openai", model="gpt-4", temperature=3.0)
    assert exc.value.field == "temperature"


def test_config_invalid_max_tokens():
    with pytest.raises(ConfigError) as exc:
        LLMConfig(provider="openai", model="gpt-4", max_tokens=0)
    assert exc.value.field == "max_tokens"


def test_config_to_dict():
    cfg = LLMConfig(provider="cohere", model="command-r", temperature=0.5, max_tokens=512)
    d = cfg.to_dict()
    assert d["provider"] == "cohere"
    assert d["model"] == "command-r"
    assert d["temperature"] == 0.5


def test_config_from_dict():
    d = {"provider": "anthropic", "model": "claude-3-5-sonnet-20241022", "temperature": 0.0}
    cfg = LLMConfig.from_dict(d)
    assert cfg.provider == "anthropic"
    assert cfg.temperature == 0.0


def test_config_repr():
    cfg = LLMConfig(provider="openai", model="gpt-4o")
    r = repr(cfg)
    assert "openai" in r
    assert "gpt-4o" in r


def test_config_temperature_setter_validates():
    cfg = LLMConfig(provider="openai", model="gpt-4o")
    with pytest.raises(ConfigError):
        cfg.temperature = -1.0


# -- PromptBuilder tests -----------------------------------

def test_prompt_builder_basic():
    pb = PromptBuilder()
    result = pb.set_user("What is RAG?").build()
    assert "What is RAG?" in result


def test_prompt_builder_with_context():
    pb = PromptBuilder()
    result = (
        pb.set_system("You are a RAG assistant.")
        .add_context("Paris is in France.")
        .add_context("France is in Europe.")
        .set_user("Where is Paris?")
        .build()
    )
    assert "Paris is in France." in result
    assert "France is in Europe." in result
    assert "Where is Paris?" in result
    assert "RAG assistant" in result


def test_prompt_builder_no_context_skips_section():
    pb = PromptBuilder("System prompt.")
    result = pb.set_user("Question?").build()
    assert "Context:" not in result
    assert "Question?" in result


def test_prompt_builder_to_messages():
    pb = PromptBuilder("Be concise.")
    messages = (
        pb.add_context("Some context.")
        .set_user("My question.")
        .to_messages()
    )
    assert len(messages) == 2
    assert messages[0]["role"] == "system"
    assert messages[1]["role"] == "user"
    assert "Some context." in messages[0]["content"]
    assert messages[1]["content"] == "My question."


def test_prompt_builder_fluent_returns_self():
    pb = PromptBuilder()
    result = pb.set_system("sys").add_context("ctx").set_user("user")
    assert result is pb


def test_prompt_builder_clear():
    pb = PromptBuilder()
    pb.add_context("ctx").set_user("question")
    pb.clear()
    result = pb.set_user("fresh").build()
    assert "ctx" not in result


# -- LLMClient tests ---------------------------------------

@pytest.fixture
def client():
    cfg = LLMConfig(provider="openai", model="gpt-4o")
    return LLMClient(cfg)


def test_client_call_returns_string(client):
    result = client.call("What is machine learning?")
    assert isinstance(result, str)
    assert len(result) > 0


def test_client_call_increments_stats(client):
    client.call("prompt 1")
    client.call("prompt 2")
    stats = client.get_stats()
    assert stats["calls"] >= 2


def test_client_stream_yields_tokens(client):
    tokens = list(client.stream("Explain embeddings"))
    assert len(tokens) > 0
    assert all(isinstance(t, str) for t in tokens)
    full = " ".join(tokens)
    assert len(full) > 0


def test_client_batch_all_succeed(client):
    prompts = ["Q1", "Q2", "Q3"]
    results = client.batch(prompts)
    assert len(results) == 3
    assert all(isinstance(r, str) for r in results)


def test_client_stats_shape(client):
    stats = client.get_stats()
    assert "calls" in stats
    assert "tokens" in stats
    assert "model" in stats
    assert "provider" in stats


def test_client_repr(client):
    r = repr(client)
    assert "openai" in r
    assert "gpt-4o" in r


# -- Processing tests --------------------------------------

def test_chunk_document_even():
    chunks = chunk_document("abcdefgh", chunk_size=4)
    assert chunks == ["abcd", "efgh"]


def test_chunk_document_remainder():
    chunks = chunk_document("abcde", chunk_size=3)
    assert chunks == ["abc", "de"]


def test_chunk_document_with_overlap():
    chunks = chunk_document("abcdefgh", chunk_size=4, overlap=2)
    assert chunks[0] == "abcd"
    assert chunks[1][:2] == "cd"  # overlaps last 2 chars of previous chunk


def test_parse_llm_response():
    response = "[Response to: What is RAG?]"
    parsed = parse_llm_response(response)
    assert parsed["raw"] == response
    assert "word_count" in parsed
    assert "char_count" in parsed
    assert parsed["char_count"] == len(response)


def test_batch_process_all_succeed():
    items = [1, 2, 3]
    result = batch_process(items, lambda x: x * 2, batch_size=2)
    assert result["results"] == [2, 4, 6]
    assert result["errors"] == []
    assert result["batches_processed"] == 2


def test_batch_process_partial_failure():
    def process(x):
        if x == 2:
            raise ValueError("bad item")
        return x * 10

    result = batch_process([1, 2, 3], process, batch_size=5)
    assert 10 in result["results"]
    assert 30 in result["results"]
    assert len(result["errors"]) == 1
    assert result["errors"][0]["index"] == 1


def test_deduplicate():
    records = [{"id": "a", "v": 1}, {"id": "b", "v": 2}, {"id": "a", "v": 3}]
    result = deduplicate(records, "id")
    assert len(result) == 2
    assert result[0]["v"] == 1  # first "a" kept


def test_score_and_rank():
    records = [{"text": "hi"}, {"text": "hello world"}, {"text": "bye"}]
    result = score_and_rank(records, lambda r: len(r["text"]))
    assert result[0]["text"] == "hello world"  # highest score first
    assert "score" in result[0]


def test_processing_timer():
    with processing_timer("test_op") as stats:
        time.sleep(0.01)
    assert "elapsed" in stats
    assert stats["elapsed"] >= 0.005


# -- Integration: full pipeline ----------------------------

def test_full_rag_pipeline():
    """Simulate a complete RAG pipeline: chunk → prompt → call → parse."""
    document = "Retrieval-Augmented Generation (RAG) combines retrieval with generation. " * 3
    chunks = chunk_document(document, chunk_size=50)
    assert len(chunks) > 1

    cfg = LLMConfig(provider="openai", model="gpt-4o")
    client = LLMClient(cfg)

    top_chunks = chunks[:2]
    pb = PromptBuilder(cfg.system_prompt)
    for chunk in top_chunks:
        pb.add_context(chunk)
    pb.set_user("What is RAG?")

    prompt = pb.build()
    response = client.call(prompt)
    parsed = parse_llm_response(response)

    assert isinstance(response, str)
    assert parsed["char_count"] > 0
    stats = client.get_stats()
    assert stats["calls"] == 1
