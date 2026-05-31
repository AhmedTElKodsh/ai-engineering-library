"""
Python Confidence Inventory - Week 00 Assessment

This diagnostic covers six skill areas. Do not worry about failing tests;
that is expected. Your results show where to focus during the refresher path.

Run this now, then again after the refresher path to measure your growth.
"""
import pytest

try:
    from diagnostic_workbench import (
        swap_without_temp,
        is_even_and_positive,
        flatten_list,
        count_words,
        unique_elements,
        make_multiplier,
        apply_to_all,
        Counter,
        even_squares,
        first_n_fibonacci,
        safe_divide,
        validate_age,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from diagnostic_workbench: {e}",
        allow_module_level=True,
    )


# ------------------------------------------------------------
# FUNDAMENTALS (2 tests)
# ------------------------------------------------------------

def test_swap_without_temp():
    result = swap_without_temp(10, 20)
    assert result == (20, 10), (
        "swap_without_temp(10, 20) should return (20, 10). "
        f"Expected (20, 10), got {result}. "
        "Hint: Python tuple packing lets you swap in one line"
    )


def test_is_even_and_positive():
    assert is_even_and_positive(4) is True, (
        "4 is both even and positive. "
        "Expected True. "
        "Hint: Use the 'and' operator to combine two conditions"
    )
    assert is_even_and_positive(-2) is False, (
        "-2 is even but not positive. "
        "Expected False. "
        "Hint: Both conditions must be True"
    )
    assert is_even_and_positive(3) is False, (
        "3 is positive but not even. "
        "Expected False. "
        "Hint: Use the modulo operator (%) to check evenness"
    )


# ------------------------------------------------------------
# DATA STRUCTURES (3 tests)
# ------------------------------------------------------------

def test_flatten_list():
    result = flatten_list([[1, 2], [3, 4], [5]])
    assert result == [1, 2, 3, 4, 5], (
        "flatten_list([[1,2],[3,4],[5]]) should produce [1,2,3,4,5]. "
        f"Expected [1,2,3,4,5], got {result}. "
        "Hint: Loop through sublists and extend a result list"
    )


def test_count_words():
    result = count_words("the cat and the dog")
    assert result == {"the": 2, "cat": 1, "and": 1, "dog": 1}, (
        "count_words should count each word case-insensitively. "
        f"Expected {{'the': 2, 'cat': 1, 'and': 1, 'dog': 1}}, got {result}. "
        "Hint: Split the string, then use a dict to count"
    )


def test_unique_elements():
    result = unique_elements([3, 1, 2, 1, 3, 4])
    assert result == [3, 1, 2, 4], (
        "unique_elements should remove duplicates but preserve order. "
        f"Expected [3, 1, 2, 4], got {result}. "
        "Hint: Use a set to track what you've seen"
    )


# ------------------------------------------------------------
# FUNCTIONS (2 tests)
# ------------------------------------------------------------

def test_make_multiplier():
    double = make_multiplier(2)
    assert callable(double), (
        "make_multiplier should return a function. "
        f"Got {type(double).__name__} instead. "
        "Hint: Define an inner function and return it"
    )
    assert double(5) == 10, (
        "make_multiplier(2)(5) should return 10. "
        f"Expected 10, got {double(5)}. "
        "Hint: The inner function should use the outer factor variable"
    )


def test_apply_to_all():
    result = apply_to_all(str.upper, ["hello", "world"])
    assert result == ["HELLO", "WORLD"], (
        "apply_to_all(str.upper, ['hello','world']) should return ['HELLO','WORLD']. "
        f"Expected ['HELLO', 'WORLD'], got {result}. "
        "Hint: Call the function on each item in the list"
    )


# ------------------------------------------------------------
# OOP (3 tests)
# ------------------------------------------------------------

def test_counter_basic():
    c = Counter()
    c.increment()
    c.increment()
    assert c.count == 2, (
        "Counter should be 2 after two increments. "
        f"Expected 2, got {getattr(c, 'count', 'MISSING')}. "
        "Hint: Store count as an instance attribute"
    )


def test_counter_decrement_floor():
    c = Counter()
    c.decrement()
    assert c.count == 0, (
        "Counter should not go below 0. "
        f"Expected 0, got {getattr(c, 'count', 'MISSING')}. "
        "Hint: Use max(0, count - 1) or an if check"
    )


def test_counter_str():
    c = Counter(5)
    assert str(c) == "Counter(5)", (
        "str(Counter(5)) should return 'Counter(5)'. "
        f"Expected 'Counter(5)', got '{str(c)}'. "
        "Hint: Implement __str__ to return a formatted string"
    )


# ------------------------------------------------------------
# PYTHONIC PATTERNS (2 tests)
# ------------------------------------------------------------

def test_even_squares():
    result = even_squares([1, 2, 3, 4, 5])
    assert result == [4, 16], (
        "even_squares([1,2,3,4,5]) should square only even numbers. "
        f"Expected [4, 16], got {result}. "
        "Hint: filter the even numbers first, then square the values you kept"
    )


def test_first_n_fibonacci():
    result = first_n_fibonacci(7)
    assert result == [0, 1, 1, 2, 3, 5, 8], (
        "first_n_fibonacci(7) should return [0, 1, 1, 2, 3, 5, 8]. "
        f"Expected [0, 1, 1, 2, 3, 5, 8], got {result}. "
        "Hint: Each number is the sum of the two before it"
    )


# ------------------------------------------------------------
# ERROR HANDLING (2 tests)
# ------------------------------------------------------------

def test_safe_divide():
    assert safe_divide(10, 3) == pytest.approx(3.333, rel=1e-2), (
        "safe_divide(10, 3) should return ~3.333. "
        f"Expected ~3.333, got {safe_divide(10, 3)}. "
        "Hint: Use regular division (/)"
    )
    assert safe_divide(10, 0) == "Error: division by zero", (
        "safe_divide(10, 0) should return an error message string. "
        f"Expected 'Error: division by zero', got {safe_divide(10, 0)}. "
        "Hint: Use try/except ZeroDivisionError"
    )


def test_validate_age():
    assert validate_age(25) == 25, (
        "validate_age(25) should return 25. "
        f"Expected 25, got {validate_age(25)}. "
        "Hint: Return the age after validation passes"
    )
    with pytest.raises(TypeError):
        validate_age("twenty")
    with pytest.raises(ValueError):
        validate_age(-5)
