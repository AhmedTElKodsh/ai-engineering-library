"""Tests for Day 13: Unpacking & Pythonic Patterns."""
import pytest

try:
    from solution_template import (
        unpack_and_merge,
        zip_records,
        enumerate_transform,
        first_match,
        safe_access,
        pipeline,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(unpack_and_merge)
    assert callable(zip_records)
    assert callable(enumerate_transform)
    assert callable(first_match)
    assert callable(safe_access)
    assert callable(pipeline)


# ── Tests for unpack_and_merge ─────────────

def test_merge_two_dicts():
    result = unpack_and_merge({"a": 1}, {"b": 2})
    assert result == {"a": 1, "b": 2}


def test_merge_with_override():
    result = unpack_and_merge({"a": 1, "b": 2}, {"b": 3, "c": 4})
    assert result == {"a": 1, "b": 3, "c": 4}, (
        f"Later dicts should override earlier ones, got {result}"
    )


def test_merge_three_dicts():
    result = unpack_and_merge({"a": 1}, {"b": 2}, {"c": 3})
    assert result == {"a": 1, "b": 2, "c": 3}


def test_merge_empty():
    result = unpack_and_merge()
    assert result == {}


def test_merge_single():
    result = unpack_and_merge({"x": 42})
    assert result == {"x": 42}


# ── Tests for zip_records ──────────────────

def test_zip_records_basic():
    result = zip_records(["name", "age"], ["Alice", 30], ["Bob", 25])
    assert result == [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25},
    ], f"Expected list of dicts, got {result}"


def test_zip_records_single_row():
    result = zip_records(["x", "y"], [1, 2])
    assert result == [{"x": 1, "y": 2}]


def test_zip_records_no_rows():
    result = zip_records(["a", "b"])
    assert result == []


# ── Tests for enumerate_transform ──────────

def test_enumerate_transform_basic():
    result = enumerate_transform(["a", "b", "c"])
    assert result == [
        {"index": 0, "value": "a"},
        {"index": 1, "value": "b"},
        {"index": 2, "value": "c"},
    ]


def test_enumerate_transform_custom_start():
    result = enumerate_transform(["x", "y"], start=5)
    assert result == [
        {"index": 5, "value": "x"},
        {"index": 6, "value": "y"},
    ]


def test_enumerate_transform_empty():
    result = enumerate_transform([])
    assert result == []


# ── Tests for first_match ──────────────────

def test_first_match_found():
    result = first_match([1, 5, 12, 3, 20], lambda x: x > 10)
    assert result["found"] is True
    assert result["value"] == 12
    assert result["index"] == 2


def test_first_match_not_found():
    result = first_match([1, 2, 3], lambda x: x > 100)
    assert result["found"] is False
    assert result["value"] is None
    assert result["index"] == -1


def test_first_match_first_element():
    result = first_match([99, 1, 2], lambda x: x > 50)
    assert result["value"] == 99
    assert result["index"] == 0


def test_first_match_empty():
    result = first_match([], lambda x: True)
    assert result["found"] is False


# ── Tests for safe_access ──────────────────

def test_safe_access_simple():
    data = {"name": "Alice"}
    assert safe_access(data, "name") == "Alice"


def test_safe_access_nested():
    data = {"user": {"address": {"city": "NYC"}}}
    assert safe_access(data, "user.address.city") == "NYC"


def test_safe_access_missing_key():
    data = {"user": {"name": "Alice"}}
    assert safe_access(data, "user.email", "N/A") == "N/A"


def test_safe_access_missing_intermediate():
    data = {"user": {"name": "Alice"}}
    assert safe_access(data, "user.address.city", "unknown") == "unknown"


def test_safe_access_default_none():
    data = {}
    assert safe_access(data, "missing") is None


# ── Tests for pipeline ─────────────────────

def test_pipeline_filter_sort_transform():
    result = pipeline(
        [3, 1, 4, 1, 5, 9],
        lambda lst: [x for x in lst if x > 2],
        sorted,
        lambda lst: [x * 10 for x in lst],
    )
    assert result == [30, 40, 50, 90], (
        f"Expected [30, 40, 50, 90], got {result}"
    )


def test_pipeline_no_transforms():
    data = [1, 2, 3]
    result = pipeline(data)
    assert result == [1, 2, 3]


def test_pipeline_single_transform():
    result = pipeline([3, 1, 2], sorted)
    assert result == [1, 2, 3]


def test_pipeline_empty_data():
    result = pipeline([], sorted, lambda lst: [x * 2 for x in lst])
    assert result == []
