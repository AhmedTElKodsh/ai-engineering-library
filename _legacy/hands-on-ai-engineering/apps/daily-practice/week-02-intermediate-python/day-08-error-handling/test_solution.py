"""Tests for Day 08: Error Handling & Custom Exceptions."""
import pytest

try:
    from solution_template import (
        ValidationError,
        CalculationError,
        safe_divide,
        validate_user,
        process_records,
        retry_operation,
        build_error_report,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(safe_divide), "safe_divide should be a callable function"
    assert callable(validate_user), "validate_user should be a callable function"
    assert callable(process_records), "process_records should be a callable function"
    assert callable(retry_operation), "retry_operation should be a callable function"
    assert callable(build_error_report), "build_error_report should be a callable function"


# ── Tests for safe_divide ──────────────────

def test_safe_divide_basic():
    result = safe_divide(10, 3)
    assert result == pytest.approx(3.3333, abs=0.001), (
        f"safe_divide(10, 3) should return ~3.333, got {result}. "
        "Hint: Just return a / b"
    )


def test_safe_divide_integers():
    result = safe_divide(10, 2)
    assert result == 5.0, (
        f"safe_divide(10, 2) should return 5.0, got {result}"
    )


def test_safe_divide_zero_denominator():
    with pytest.raises(CalculationError) as exc_info:
        safe_divide(10, 0)
    assert exc_info.value.operation == "division", (
        "CalculationError should have operation='division'. "
        "Hint: raise CalculationError('division', 'division by zero')"
    )


def test_safe_divide_type_error_string():
    with pytest.raises(TypeError):
        safe_divide("10", 2)


def test_safe_divide_type_error_none():
    with pytest.raises(TypeError):
        safe_divide(10, None)


# ── Tests for validate_user ────────────────

def test_validate_user_valid():
    data = {"name": "Alice", "age": 30}
    result = validate_user(data)
    assert result == data, (
        "validate_user should return the input dict when valid"
    )


def test_validate_user_missing_name():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"age": 30})
    assert exc_info.value.field == "name", (
        "ValidationError should have field='name' when name is missing"
    )


def test_validate_user_empty_name():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "", "age": 30})
    assert exc_info.value.field == "name", (
        "ValidationError should have field='name' when name is empty string"
    )


def test_validate_user_missing_age():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "Alice"})
    assert exc_info.value.field == "age", (
        "ValidationError should have field='age' when age is missing"
    )


def test_validate_user_invalid_age_type():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "Alice", "age": "thirty"})
    assert exc_info.value.field == "age", (
        "ValidationError should have field='age' when age is not an int"
    )


def test_validate_user_age_out_of_range():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "Alice", "age": 200})
    assert exc_info.value.field == "age", (
        "ValidationError should have field='age' when age > 150"
    )


def test_validate_user_negative_age():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "Alice", "age": -5})
    assert exc_info.value.field == "age", (
        "ValidationError should have field='age' when age is negative"
    )


def test_validate_user_bool_not_int():
    with pytest.raises(ValidationError) as exc_info:
        validate_user({"name": "Alice", "age": True})
    assert exc_info.value.field == "age", (
        "ValidationError should have field='age' when age is a bool. "
        "Hint: bool is a subclass of int, so check isinstance(age, bool) first"
    )


# ── Tests for process_records ──────────────

def test_process_records_all_valid():
    records = [{"value": "3.14"}, {"value": "42"}, {"value": "-1.5"}]
    result = process_records(records)
    assert result["successes"] == [3.14, 42.0, -1.5], (
        f"Expected [3.14, 42.0, -1.5], got {result['successes']}. "
        "Hint: Convert each record['value'] to float"
    )
    assert result["failures"] == [], (
        "No failures expected for valid records"
    )


def test_process_records_some_invalid():
    records = [{"value": "10"}, {"value": "abc"}, {"value": "20"}]
    result = process_records(records)
    assert result["successes"] == [10.0, 20.0], (
        f"Expected [10.0, 20.0], got {result['successes']}"
    )
    assert len(result["failures"]) == 1, (
        f"Expected 1 failure, got {len(result['failures'])}"
    )
    assert result["failures"][0]["index"] == 1, (
        "The failure should be at index 1 (the 'abc' record)"
    )


def test_process_records_missing_key():
    records = [{"value": "10"}, {"other": "20"}]
    result = process_records(records)
    assert len(result["failures"]) == 1, (
        "A record missing the 'value' key should be a failure"
    )
    assert result["failures"][0]["index"] == 1


def test_process_records_empty():
    result = process_records([])
    assert result == {"successes": [], "failures": []}, (
        "Empty input should return empty successes and failures"
    )


# ── Tests for retry_operation ──────────────

def test_retry_operation_succeeds_first_try():
    result = retry_operation(lambda: 42)
    assert result == 42, (
        "retry_operation should return the function result on success"
    )


def test_retry_operation_succeeds_after_retries():
    call_count = 0

    def flaky():
        nonlocal call_count
        call_count += 1
        if call_count < 3:
            raise ValueError("not yet")
        return "success"

    result = retry_operation(flaky, max_retries=3)
    assert result == "success", (
        f"Expected 'success' after 3 attempts, got {result}. "
        "Hint: Keep retrying until max_retries is exhausted"
    )


def test_retry_operation_all_fail():
    def always_fails():
        raise RuntimeError("always broken")

    with pytest.raises(RuntimeError, match="always broken"):
        retry_operation(always_fails, max_retries=2)


def test_retry_operation_invalid_retries():
    with pytest.raises(ValueError):
        retry_operation(lambda: 1, max_retries=0)


# ── Tests for build_error_report ───────────

def test_build_error_report_all_pass():
    ops = [
        ("add", lambda: 1 + 1),
        ("concat", lambda: "a" + "b"),
    ]
    result = build_error_report(ops)
    assert result["passed"] == ["add", "concat"], (
        f"Expected ['add', 'concat'], got {result['passed']}"
    )
    assert result["failed"] == [], "No failures expected"


def test_build_error_report_mixed():
    ops = [
        ("good", lambda: 42),
        ("bad_value", lambda: int("abc")),
        ("bad_type", lambda: 1 + "2"),
        ("also_good", lambda: True),
    ]
    result = build_error_report(ops)
    assert result["passed"] == ["good", "also_good"], (
        f"Expected ['good', 'also_good'], got {result['passed']}"
    )
    assert len(result["failed"]) == 2, (
        f"Expected 2 failures, got {len(result['failed'])}"
    )
    error_types = [f["error_type"] for f in result["failed"]]
    assert "ValueError" in error_types, "Should capture ValueError"
    assert "TypeError" in error_types, "Should capture TypeError"


def test_build_error_report_empty():
    result = build_error_report([])
    assert result == {"passed": [], "failed": []}, (
        "Empty input should return empty passed and failed"
    )
