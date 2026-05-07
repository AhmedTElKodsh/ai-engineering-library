"""
Tests for Day 05 — Control Flow
================================
Run:  pytest test_solution.py -v
"""

import pytest

try:
    from solution_template import (
        fizzbuzz,
        collatz_steps,
        is_palindrome,
        find_primes,
        matrix_sum,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import solution_template: {e}",
        allow_module_level=True,
    )


# ── Setup Verification ───────────────────────────────────────────────
class TestSetup:
    """Verify the template loads and all functions exist."""

    def test_template_imports_successfully(self):
        """Template should import without errors."""
        assert callable(fizzbuzz), (
            "Setup check failed: fizzbuzz is not callable. "
            "Expected a function, got {0}. "
            "Hint: do not remove the function definitions."
        ).format(type(fizzbuzz).__name__)


# ── FizzBuzz ─────────────────────────────────────────────────────────
class TestFizzBuzz:
    """Tests for fizzbuzz()."""

    def test_fizzbuzz_15(self):
        result = fizzbuzz(15)
        assert result[-1] == "FizzBuzz", (
            "fizzbuzz(15): last element "
            "expected 'FizzBuzz', got '{0}'. "
            "Hint: 15 is divisible by both 3 and 5."
        ).format(result[-1] if result else "empty list")

    def test_fizzbuzz_5(self):
        result = fizzbuzz(5)
        expected = ["1", "2", "Fizz", "4", "Buzz"]
        assert result == expected, (
            "fizzbuzz(5): "
            "expected {0}, got {1}. "
            "Hint: check each number from 1 to 5 against the rules."
        ).format(expected, result)

    def test_fizzbuzz_1(self):
        result = fizzbuzz(1)
        assert result == ["1"], (
            "fizzbuzz(1): "
            "expected ['1'], got {0}. "
            "Hint: 1 is not divisible by 3 or 5, return it as a string."
        ).format(result)

    def test_fizzbuzz_length(self):
        result = fizzbuzz(10)
        assert len(result) == 10, (
            "fizzbuzz(10): length "
            "expected 10, got {0}. "
            "Hint: fizzbuzz(n) should return exactly n elements."
        ).format(len(result) if result else 0)


# ── Collatz Steps ────────────────────────────────────────────────────
class TestCollatzSteps:
    """Tests for collatz_steps()."""

    def test_collatz_1(self):
        result = collatz_steps(1)
        assert result == 0, (
            "collatz_steps(1): "
            "expected 0, got {0}. "
            "Hint: 1 is already at 1, so zero steps needed."
        ).format(result)

    def test_collatz_2(self):
        result = collatz_steps(2)
        assert result == 1, (
            "collatz_steps(2): "
            "expected 1, got {0}. "
            "Hint: 2 -> 1 is one step (2 is even, 2 // 2 = 1)."
        ).format(result)

    def test_collatz_6(self):
        result = collatz_steps(6)
        assert result == 8, (
            "collatz_steps(6): "
            "expected 8, got {0}. "
            "Hint: 6->3->10->5->16->8->4->2->1 is 8 steps."
        ).format(result)

    def test_collatz_27(self):
        result = collatz_steps(27)
        assert result == 111, (
            "collatz_steps(27): "
            "expected 111, got {0}. "
            "Hint: 27 is a famously long Collatz sequence."
        ).format(result)


# ── Is Palindrome ────────────────────────────────────────────────────
class TestIsPalindrome:
    """Tests for is_palindrome()."""

    def test_simple_palindrome(self):
        result = is_palindrome("racecar")
        assert result is True, (
            "is_palindrome('racecar'): "
            "expected True, got {0}. "
            "Hint: 'racecar' reads the same forwards and backwards."
        ).format(result)

    def test_not_palindrome(self):
        result = is_palindrome("hello")
        assert result is False, (
            "is_palindrome('hello'): "
            "expected False, got {0}. "
            "Hint: 'hello' reversed is 'olleh'."
        ).format(result)

    def test_case_insensitive(self):
        result = is_palindrome("Madam")
        assert result is True, (
            "is_palindrome('Madam'): "
            "expected True, got {0}. "
            "Hint: comparison should be case-insensitive."
        ).format(result)

    def test_ignores_spaces(self):
        result = is_palindrome("nurses run")
        assert result is True, (
            "is_palindrome('nurses run'): "
            "expected True, got {0}. "
            "Hint: remove spaces before checking."
        ).format(result)

    def test_empty_string(self):
        result = is_palindrome("")
        assert result is True, (
            "is_palindrome(''): "
            "expected True, got {0}. "
            "Hint: an empty string is trivially a palindrome."
        ).format(result)


# ── Find Primes ──────────────────────────────────────────────────────
class TestFindPrimes:
    """Tests for find_primes()."""

    def test_primes_up_to_10(self):
        result = find_primes(10)
        assert result == [2, 3, 5, 7], (
            "find_primes(10): "
            "expected [2, 3, 5, 7], got {0}. "
            "Hint: 2 is the smallest prime number."
        ).format(result)

    def test_primes_up_to_1(self):
        result = find_primes(1)
        assert result == [], (
            "find_primes(1): "
            "expected [], got {0}. "
            "Hint: 1 is not a prime number."
        ).format(result)

    def test_primes_up_to_2(self):
        result = find_primes(2)
        assert result == [2], (
            "find_primes(2): "
            "expected [2], got {0}. "
            "Hint: 2 is prime and should be included."
        ).format(result)


# ── Matrix Sum ───────────────────────────────────────────────────────
class TestMatrixSum:
    """Tests for matrix_sum()."""

    def test_simple_matrix(self):
        result = matrix_sum([[1, 2], [3, 4]])
        assert result == 10, (
            "matrix_sum([[1,2],[3,4]]): "
            "expected 10, got {0}. "
            "Hint: 1 + 2 + 3 + 4 = 10."
        ).format(result)

    def test_single_row(self):
        result = matrix_sum([[5, 10, 15]])
        assert result == 30, (
            "matrix_sum([[5,10,15]]): "
            "expected 30, got {0}. "
            "Hint: a single-row matrix still works with nested loops."
        ).format(result)

    def test_empty_matrix(self):
        result = matrix_sum([])
        assert result == 0, (
            "matrix_sum([]): "
            "expected 0, got {0}. "
            "Hint: an empty matrix has a sum of 0."
        ).format(result)
