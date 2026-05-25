"""Week 01 - Python Essentials: Test Suite

~25 targeted tests. Each one mirrors a real AI engineering pattern.
Green = ready for AI engineering Week 1+.
"""
import sys
from pathlib import Path

import pytest

try:
    sys.modules.pop("workbench", None)
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from workbench import (
        classify_type,
        safe_convert_to_int,
        build_profile,
        calculate_stats,
        format_greeting,
        build_prompt,
        truncate,
        chunk_list,
        merge_configs,
        group_by_key,
        unique_sources,
        fizzbuzz,
        route_request,
        is_valid_temperature,
        apply_discount,
        memoize,
        retry,
        make_counter,
    )
except ImportError as e:
    pytest.skip(f"Import failed: {e}", allow_module_level=True)


# -- Section 1: Types & Data --------------------------------

def test_classify_bool_before_int():
    assert classify_type(True) == "boolean", "bool is subclass of int - check bool first"


def test_classify_int():
    assert classify_type(42) == "integer"


def test_classify_float():
    assert classify_type(3.14) == "float"


def test_classify_string():
    assert classify_type("hello") == "string"


def test_classify_other():
    assert classify_type([1, 2]) == "other"


def test_safe_convert_valid():
    assert safe_convert_to_int("42") == 42


def test_safe_convert_invalid():
    assert safe_convert_to_int("abc") is None, "Non-numeric string → None, not exception"


def test_safe_convert_negative():
    assert safe_convert_to_int("-7") == -7


def test_build_profile_shape():
    p = build_profile("Alice", 30, 95.5)
    assert p["name"] == "Alice"
    assert p["age"] == 30
    assert p["score"] == 95.5
    assert p["summary"] == "Alice (30) - 95.5"


def test_calculate_stats():
    s = calculate_stats([10, 20, 30])
    assert s["total"] == 60
    assert s["count"] == 3
    assert s["average"] == 20.0
    assert s["minimum"] == 10
    assert s["maximum"] == 30


# -- Section 2: Strings & Prompts --------------------------

def test_format_greeting():
    assert format_greeting("Alice", 30, "Cairo") == "Hello, Alice! You are 30 years old and live in Cairo."


def test_build_prompt_structure():
    result = build_prompt("Paris is in France.", "Where is Paris?")
    assert "System:" in result
    assert "Context:" in result
    assert "Paris is in France." in result
    assert "Where is Paris?" in result


def test_build_prompt_custom_system():
    result = build_prompt("ctx", "q", system="Be concise.")
    assert result.startswith("System: Be concise.")


def test_truncate_short():
    assert truncate("Hi", 10) == "Hi", "No truncation if within limit"


def test_truncate_long():
    assert truncate("Hello world", 7) == "Hell...", "Append '...' and cut to max_chars total"


# -- Section 3: Collections --------------------------------

def test_chunk_list_even():
    assert chunk_list([1, 2, 3, 4], 2) == [[1, 2], [3, 4]]


def test_chunk_list_remainder():
    assert chunk_list([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]]


def test_merge_configs_override():
    result = merge_configs({"model": "gpt-4", "temp": 0.7}, {"temp": 0.0})
    assert result["model"] == "gpt-4"
    assert result["temp"] == 0.0


def test_group_by_key():
    records = [{"src": "a", "v": 1}, {"src": "b", "v": 2}, {"src": "a", "v": 3}]
    grouped = group_by_key(records, "src")
    assert len(grouped["a"]) == 2
    assert len(grouped["b"]) == 1


def test_unique_sources():
    records = [{"source": "doc1"}, {"source": "doc2"}, {"source": "doc1"}]
    result = unique_sources(records)
    assert result == ["doc1", "doc2"]


# -- Section 4: Control Flow -------------------------------

def test_fizzbuzz_15():
    result = fizzbuzz(15)
    assert result[0] == "1"
    assert result[2] == "Fizz"
    assert result[4] == "Buzz"
    assert result[14] == "FizzBuzz"


def test_route_request_openai():
    url = route_request("openai", "gpt-4")
    assert "openai.com" in url


def test_route_request_anthropic():
    url = route_request("anthropic", "claude-3")
    assert "anthropic.com" in url


def test_route_request_unknown():
    with pytest.raises(ValueError):
        route_request("unknown_provider", "model")


def test_is_valid_temperature():
    assert is_valid_temperature(0.0) is True
    assert is_valid_temperature(1.0) is True
    assert is_valid_temperature(2.0) is True
    assert is_valid_temperature(-0.1) is False
    assert is_valid_temperature(2.1) is False


# -- Section 5: Functions & Decorators --------------------

def test_apply_discount_default():
    assert apply_discount(100.0) == 90.0


def test_apply_discount_custom():
    assert apply_discount(49.99, 0.25) == pytest.approx(37.49, abs=0.01)


def test_memoize_caches_result():
    call_count = 0

    @memoize
    def square(x):
        nonlocal call_count
        call_count += 1
        return x ** 2

    assert square(4) == 16
    assert square(4) == 16  # cached
    assert call_count == 1, "Second call should use cache, not re-execute"
    assert hasattr(square, "cache"), "Memoized function must have .cache attribute"
    assert (4,) in square.cache


def test_retry_succeeds_eventually():
    call_count = 0

    @retry(max_attempts=3)
    def flaky():
        nonlocal call_count
        call_count += 1
        if call_count < 3:
            raise ValueError("not yet")
        return "ok"

    assert flaky() == "ok"
    assert call_count == 3


def test_retry_raises_after_exhaustion():
    @retry(max_attempts=2)
    def always_fails():
        raise RuntimeError("broken")

    with pytest.raises(RuntimeError, match="broken"):
        always_fails()


def test_make_counter():
    c = make_counter(10)
    assert c["get_value"]() == 10
    assert c["increment"]() == 11
    assert c["decrement"]() == 10
    assert c["get_value"]() == 10
