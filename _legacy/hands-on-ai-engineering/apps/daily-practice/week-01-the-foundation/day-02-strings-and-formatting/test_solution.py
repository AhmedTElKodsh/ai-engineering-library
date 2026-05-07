"""Tests for Day 02: Strings and Formatting."""
import pytest

try:
    from solution_template import (
        reverse_string,
        count_vowels,
        title_case,
        extract_digits,
        format_greeting,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(reverse_string), "reverse_string should be a callable function"
    assert callable(count_vowels), "count_vowels should be a callable function"
    assert callable(title_case), "title_case should be a callable function"
    assert callable(extract_digits), "extract_digits should be a callable function"
    assert callable(format_greeting), "format_greeting should be a callable function"


# ── Tests for reverse_string ─────────────────

def test_reverse_string_basic():
    result = reverse_string("hello")
    assert result == "olleh", (
        "reverse_string('hello') should reverse all characters. "
        f"Expected 'olleh', got '{result}'. "
        "Hint: Use slice notation text[::-1] to reverse a string"
    )


def test_reverse_string_palindrome():
    result = reverse_string("racecar")
    assert result == "racecar", (
        "reverse_string('racecar') should return the same palindrome. "
        f"Expected 'racecar', got '{result}'. "
        "Hint: A palindrome reads the same forwards and backwards"
    )


def test_reverse_string_single_char():
    result = reverse_string("x")
    assert result == "x", (
        "reverse_string('x') should return the single character unchanged. "
        f"Expected 'x', got '{result}'. "
        "Hint: Reversing a single character gives the same character"
    )


def test_reverse_string_empty():
    result = reverse_string("")
    assert result == "", (
        "reverse_string('') should return an empty string. "
        f"Expected '', got '{result}'. "
        "Hint: Reversing an empty string gives an empty string"
    )


def test_reverse_string_with_spaces():
    result = reverse_string("a b c")
    assert result == "c b a", (
        "reverse_string('a b c') should reverse all characters including spaces. "
        f"Expected 'c b a', got '{result}'. "
        "Hint: Spaces are characters too — they get reversed along with letters"
    )


# ── Tests for count_vowels ───────────────────

def test_count_vowels_basic():
    result = count_vowels("hello")
    assert result == 2, (
        "count_vowels('hello') should find 2 vowels (e, o). "
        f"Expected 2, got {result}. "
        "Hint: Check each character against 'aeiou'"
    )


def test_count_vowels_all_vowels():
    result = count_vowels("aeiou")
    assert result == 5, (
        "count_vowels('aeiou') should find 5 vowels. "
        f"Expected 5, got {result}. "
        "Hint: Every character in 'aeiou' is a vowel"
    )


def test_count_vowels_mixed_case():
    result = count_vowels("HeLLo WoRLd")
    assert result == 3, (
        "count_vowels('HeLLo WoRLd') should count vowels case-insensitively. "
        f"Expected 3, got {result}. "
        "Hint: Convert to lowercase first, then check against 'aeiou'"
    )


def test_count_vowels_no_vowels():
    result = count_vowels("rhythm")
    assert result == 0, (
        "count_vowels('rhythm') should find 0 vowels. "
        f"Expected 0, got {result}. "
        "Hint: 'rhythm' contains no a, e, i, o, or u"
    )


def test_count_vowels_empty():
    result = count_vowels("")
    assert result == 0, (
        "count_vowels('') should return 0 for an empty string. "
        f"Expected 0, got {result}. "
        "Hint: An empty string has no characters to count"
    )


# ── Tests for title_case ─────────────────────

def test_title_case_basic():
    result = title_case("hello world")
    assert result == "Hello World", (
        "title_case('hello world') should capitalize each word. "
        f"Expected 'Hello World', got '{result}'. "
        "Hint: Split on spaces, capitalize first char of each word, rejoin"
    )


def test_title_case_single_word():
    result = title_case("python")
    assert result == "Python", (
        "title_case('python') should capitalize the first letter. "
        f"Expected 'Python', got '{result}'. "
        "Hint: A single word still needs its first letter capitalized"
    )


def test_title_case_already_capitalized():
    result = title_case("Hello World")
    assert result == "Hello World", (
        "title_case('Hello World') should keep already-capitalized text unchanged. "
        f"Expected 'Hello World', got '{result}'. "
        "Hint: Capitalizing an already-capitalized letter is a no-op"
    )


def test_title_case_all_uppercase():
    result = title_case("HELLO WORLD")
    assert result == "Hello World", (
        "title_case('HELLO WORLD') should lowercase non-first letters. "
        f"Expected 'Hello World', got '{result}'. "
        "Hint: Capitalize the first char and lowercase the rest of each word"
    )


def test_title_case_empty():
    result = title_case("")
    assert result == "", (
        "title_case('') should return an empty string. "
        f"Expected '', got '{result}'. "
        "Hint: Splitting an empty string and rejoining gives an empty string"
    )


# ── Tests for extract_digits ─────────────────

def test_extract_digits_mixed():
    result = extract_digits("abc123def456")
    assert result == "123456", (
        "extract_digits('abc123def456') should extract '123456'. "
        f"Expected '123456', got '{result}'. "
        "Hint: Use .isdigit() to test each character"
    )


def test_extract_digits_no_digits():
    result = extract_digits("hello")
    assert result == "", (
        "extract_digits('hello') should return '' when no digits exist. "
        f"Expected '', got '{result}'. "
        "Hint: If no characters pass .isdigit(), the result is empty"
    )


def test_extract_digits_all_digits():
    result = extract_digits("90210")
    assert result == "90210", (
        "extract_digits('90210') should return the string unchanged. "
        f"Expected '90210', got '{result}'. "
        "Hint: When every character is a digit, the output matches the input"
    )


def test_extract_digits_with_spaces_and_symbols():
    result = extract_digits("Phone: (555) 867-5309")
    assert result == "5558675309", (
        "extract_digits('Phone: (555) 867-5309') should extract '5558675309'. "
        f"Expected '5558675309', got '{result}'. "
        "Hint: Spaces, parentheses, colons, and dashes are not digits"
    )


# ── Tests for format_greeting ────────────────

def test_format_greeting_basic():
    result = format_greeting("Alice", 30, "Paris")
    assert result == "Hello, Alice! You are 30 years old and live in Paris.", (
        "format_greeting('Alice', 30, 'Paris') should build the greeting string. "
        f"Expected 'Hello, Alice! You are 30 years old and live in Paris.', got '{result}'. "
        "Hint: Use an f-string with the exact punctuation shown"
    )


def test_format_greeting_different_values():
    result = format_greeting("Bob", 25, "Tokyo")
    assert result == "Hello, Bob! You are 25 years old and live in Tokyo.", (
        "format_greeting('Bob', 25, 'Tokyo') should interpolate all three values. "
        f"Expected 'Hello, Bob! You are 25 years old and live in Tokyo.', got '{result}'. "
        "Hint: Make sure name, age, and city all appear in the f-string"
    )


def test_format_greeting_zero_age():
    result = format_greeting("Baby", 0, "London")
    assert result == "Hello, Baby! You are 0 years old and live in London.", (
        "format_greeting('Baby', 0, 'London') should handle age 0. "
        f"Expected 'Hello, Baby! You are 0 years old and live in London.', got '{result}'. "
        "Hint: Zero is a valid integer — f-strings render it as '0'"
    )
