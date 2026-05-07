"""Tests for Day 01: Variables and Types."""
import pytest

try:
    from solution_template import (
        classify_type,
        safe_convert_to_int,
        swap_values,
        build_profile,
        calculate_stats,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )



# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(classify_type), "classify_type should be a callable function"
    assert callable(safe_convert_to_int), "safe_convert_to_int should be a callable function"
    assert callable(swap_values), "swap_values should be a callable function"
    assert callable(build_profile), "build_profile should be a callable function"
    assert callable(calculate_stats), "calculate_stats should be a callable function"


# ── Tests for classify_type ────────────────

def test_classify_type_integer():
    result = classify_type(42)
    assert result == "integer", (
        "classify_type(42) should identify an integer. "
        f"Expected 'integer', got '{result}'. "
        "Hint: Use isinstance() to check the type"
    )


def test_classify_type_boolean_before_int():
    result = classify_type(True)
    assert result == "boolean", (
        "classify_type(True) should identify a boolean, not an integer. "
        f"Expected 'boolean', got '{result}'. "
        "Hint: Check for bool BEFORE int — bool is a subclass of int in Python"
    )


def test_classify_type_float():
    result = classify_type(3.14)
    assert result == "float", (
        "classify_type(3.14) should identify a float. "
        f"Expected 'float', got '{result}'. "
        "Hint: Use isinstance(value, float)"
    )


def test_classify_type_string():
    result = classify_type("hello")
    assert result == "string", (
        "classify_type('hello') should identify a string. "
        f"Expected 'string', got '{result}'. "
        "Hint: Use isinstance(value, str)"
    )


def test_classify_type_other():
    result = classify_type([1, 2, 3])
    assert result == "other", (
        "classify_type([1, 2, 3]) should return 'other' for a list. "
        f"Expected 'other', got '{result}'. "
        "Hint: If none of the known types match, return 'other'"
    )


# ── Tests for safe_convert_to_int ──────────

def test_safe_convert_valid_number():
    result = safe_convert_to_int("42")
    assert result == 42, (
        "safe_convert_to_int('42') should convert to integer 42. "
        f"Expected 42, got {result}. "
        "Hint: Use int() to convert strings to integers"
    )


def test_safe_convert_invalid_string():
    result = safe_convert_to_int("hello")
    assert result is None, (
        "safe_convert_to_int('hello') should return None for non-numeric strings. "
        f"Expected None, got {result}. "
        "Hint: Use try/except ValueError to handle failed conversions"
    )


def test_safe_convert_negative_number():
    result = safe_convert_to_int("-7")
    assert result == -7, (
        "safe_convert_to_int('-7') should handle negative number strings. "
        f"Expected -7, got {result}. "
        "Hint: int() handles negative number strings like '-7' natively"
    )


# ── Tests for swap_values ──────────────────

def test_swap_values_basic():
    result = swap_values(1, 2)
    assert result == (2, 1), (
        "swap_values(1, 2) should return (2, 1). "
        f"Expected (2, 1), got {result}. "
        "Hint: Return a tuple with the arguments in reversed order"
    )


def test_swap_values_different_types():
    result = swap_values("hello", 42)
    assert result == (42, "hello"), (
        "swap_values('hello', 42) should work with mixed types. "
        f"Expected (42, 'hello'), got {result}. "
        "Hint: Python tuples can hold values of different types"
    )


# ── Tests for build_profile ────────────────

def test_build_profile_basic():
    result = build_profile("Alice", 30, 95.5)
    assert isinstance(result, dict), (
        "build_profile should return a dictionary. "
        f"Expected dict, got {type(result).__name__}. "
        "Hint: Create a dict with curly braces or dict()"
    )
    assert result["name"] == "Alice", (
        "Profile 'name' should match the input. "
        f"Expected 'Alice', got '{result.get('name')}'. "
        "Hint: Set dict key 'name' to the name parameter"
    )
    assert result["summary"] == "Alice (30) - 95.5", (
        "Profile 'summary' should be formatted as 'name (age) - score'. "
        f"Expected 'Alice (30) - 95.5', got '{result.get('summary')}'. "
        "Hint: Use an f-string to build the summary"
    )


# ── Tests for calculate_stats ──────────────

def test_calculate_stats_basic():
    result = calculate_stats([10, 20, 30])
    assert result["total"] == 60, (
        "Total of [10, 20, 30] should be 60. "
        f"Expected 60, got {result.get('total')}. "
        "Hint: Use sum() to add up the numbers"
    )
    assert result["count"] == 3, (
        "Count of [10, 20, 30] should be 3. "
        f"Expected 3, got {result.get('count')}. "
        "Hint: Use len() to count elements"
    )
    assert result["average"] == 20.0, (
        "Average of [10, 20, 30] should be 20.0. "
        f"Expected 20.0, got {result.get('average')}. "
        "Hint: Divide total by count and ensure it's a float"
    )


def test_calculate_stats_min_max():
    result = calculate_stats([5, 1, 9, 3])
    assert result["minimum"] == 1, (
        "Minimum of [5, 1, 9, 3] should be 1. "
        f"Expected 1, got {result.get('minimum')}. "
        "Hint: Use min() to find the smallest value"
    )
    assert result["maximum"] == 9, (
        "Maximum of [5, 1, 9, 3] should be 9. "
        f"Expected 9, got {result.get('maximum')}. "
        "Hint: Use max() to find the largest value"
    )


def test_calculate_stats_single_element():
    result = calculate_stats([42])
    assert result["average"] == 42.0, (
        "Average of a single-element list [42] should be 42.0. "
        f"Expected 42.0, got {result.get('average')}. "
        "Hint: The average of one number is that number itself"
    )
