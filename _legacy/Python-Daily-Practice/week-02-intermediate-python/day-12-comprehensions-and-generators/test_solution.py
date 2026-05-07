"""Tests for Day 12: Comprehensions & Generators."""
import pytest
from types import GeneratorType

try:
    from solution_template import (
        transform_data,
        matrix_operations,
        word_statistics,
        fibonacci,
        filter_pipeline,
        batch_processor,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(transform_data)
    assert callable(matrix_operations)
    assert callable(word_statistics)
    assert callable(fibonacci)
    assert callable(filter_pipeline)
    assert callable(batch_processor)


# ── Tests for transform_data ──────────────

def test_transform_data_basic():
    records = [
        {"name": "alice", "score": 85},
        {"name": "bob", "score": 45},
        {"name": "charlie", "score": 72},
    ]
    result = transform_data(records)
    assert result == {"ALICE": 85, "CHARLIE": 72}, (
        f"Expected passing students only (score >= 60), got {result}. "
        "Hint: Use a dict comprehension with an if clause"
    )


def test_transform_data_all_pass():
    records = [{"name": "x", "score": 100}]
    result = transform_data(records)
    assert result == {"X": 100}


def test_transform_data_none_pass():
    records = [{"name": "x", "score": 30}]
    result = transform_data(records)
    assert result == {}


def test_transform_data_empty():
    assert transform_data([]) == {}


# ── Tests for matrix_operations ────────────

def test_matrix_flat():
    m = [[1, 2, 3], [4, 5, 6]]
    result = matrix_operations(m)
    assert result["flat"] == [1, 2, 3, 4, 5, 6], (
        f"Expected [1, 2, 3, 4, 5, 6], got {result['flat']}. "
        "Hint: [n for row in matrix for n in row]"
    )


def test_matrix_transposed():
    m = [[1, 2], [3, 4], [5, 6]]
    result = matrix_operations(m)
    assert result["transposed"] == [[1, 3, 5], [2, 4, 6]], (
        f"Expected [[1, 3, 5], [2, 4, 6]], got {result['transposed']}"
    )


def test_matrix_row_sums():
    m = [[1, 2, 3], [4, 5, 6]]
    result = matrix_operations(m)
    assert result["row_sums"] == [6, 15], (
        f"Expected [6, 15], got {result['row_sums']}"
    )


# ── Tests for word_statistics ──────────────

def test_word_statistics_basic():
    result = word_statistics("Hello World Python Hello")
    assert result["word_lengths"] == {"hello": 5, "world": 5, "python": 6}, (
        f"word_lengths should map unique lowercase words to lengths, got {result['word_lengths']}"
    )


def test_word_statistics_unique_lengths():
    result = word_statistics("I am a Python programmer")
    assert result["unique_lengths"] == sorted(set(
        len(w) for w in "I am a Python programmer".lower().split()
    ))


def test_word_statistics_long_words():
    result = word_statistics("The quick brown fox jumps over")
    assert result["long_words"] == sorted(
        [w for w in set("the quick brown fox jumps over".split()) if len(w) > 4]
    ), f"long_words should be sorted words with len > 4, got {result['long_words']}"


# ── Tests for fibonacci ───────────────────

def test_fibonacci_basic():
    result = list(fibonacci(8))
    assert result == [0, 1, 1, 2, 3, 5, 8, 13], (
        f"First 8 Fibonacci numbers should be [0, 1, 1, 2, 3, 5, 8, 13], got {result}"
    )


def test_fibonacci_zero():
    result = list(fibonacci(0))
    assert result == [], "fibonacci(0) should yield nothing"


def test_fibonacci_one():
    result = list(fibonacci(1))
    assert result == [0], "fibonacci(1) should yield [0]"


def test_fibonacci_is_generator():
    gen = fibonacci(5)
    assert hasattr(gen, '__next__'), (
        "fibonacci should return a generator (use yield, not return a list)"
    )


# ── Tests for filter_pipeline ──────────────

def test_filter_pipeline_basic():
    data = [
        {"name": "Alice", "age": 30, "active": True},
        {"name": "Bob", "age": 17, "active": True},
        {"name": "Charlie", "age": 25, "active": False},
        {"name": "Diana", "age": 22, "active": True},
    ]
    filters = [
        lambda d: d["age"] >= 18,
        lambda d: d["active"],
    ]
    result = filter_pipeline(data, filters)
    names = [r["name"] for r in result]
    assert names == ["Alice", "Diana"], (
        f"Expected ['Alice', 'Diana'], got {names}. "
        "Hint: Apply each filter in sequence"
    )


def test_filter_pipeline_no_filters():
    data = [{"x": 1}, {"x": 2}]
    result = filter_pipeline(data, [])
    assert result == data, "With no filters, all data should pass through"


def test_filter_pipeline_all_filtered():
    data = [{"x": 1}, {"x": 2}]
    result = filter_pipeline(data, [lambda d: d["x"] > 10])
    assert result == [], "All items should be filtered out"


# ── Tests for batch_processor ──────────────

def test_batch_processor_even_split():
    result = list(batch_processor([1, 2, 3, 4, 5, 6], 2))
    assert result == [[1, 2], [3, 4], [5, 6]], (
        f"Expected [[1, 2], [3, 4], [5, 6]], got {result}"
    )


def test_batch_processor_uneven_split():
    result = list(batch_processor([1, 2, 3, 4, 5], 3))
    assert result == [[1, 2, 3], [4, 5]], (
        f"Expected [[1, 2, 3], [4, 5]], got {result}"
    )


def test_batch_processor_empty():
    result = list(batch_processor([], 5))
    assert result == [], "Empty input should yield nothing"


def test_batch_processor_is_generator():
    gen = batch_processor([1, 2, 3], 2)
    assert hasattr(gen, '__next__'), (
        "batch_processor should be a generator (use yield)"
    )
