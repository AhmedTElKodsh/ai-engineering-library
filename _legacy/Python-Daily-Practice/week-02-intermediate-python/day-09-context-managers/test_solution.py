"""Tests for Day 09: Context Managers & Resource Management."""
import pytest
import time

try:
    from solution_template import (
        Timer,
        Indenter,
        TempValue,
        Suppress,
        Transaction,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a class?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(Timer), "Timer should be a class"
    assert callable(Indenter), "Indenter should be a class"
    assert callable(TempValue), "TempValue should be a class"
    assert callable(Suppress), "Suppress should be a class"
    assert callable(Transaction), "Transaction should be a class"


# ── Tests for Timer ────────────────────────

def test_timer_measures_time():
    with Timer() as t:
        time.sleep(0.05)
    assert hasattr(t, "elapsed"), (
        "Timer should have an 'elapsed' attribute after exiting. "
        "Hint: Set self.elapsed in __exit__"
    )
    assert t.elapsed >= 0.04, (
        f"Timer elapsed should be >= 0.04s for a 0.05s sleep, got {t.elapsed}. "
        "Hint: elapsed = time.time() - self.start"
    )


def test_timer_returns_self():
    with Timer() as t:
        pass
    assert isinstance(t, Timer), (
        "Timer __enter__ should return self"
    )


def test_timer_no_suppression():
    with pytest.raises(ValueError):
        with Timer() as t:
            raise ValueError("test")
    assert hasattr(t, "elapsed"), (
        "Timer should set elapsed even when an exception occurs"
    )


# ── Tests for Indenter ────────────────────

def test_indenter_single_level():
    ind = Indenter()
    with ind:
        result = ind.print("hello")
    assert result == "  hello", (
        f"Expected '  hello' (2 spaces + text), got '{result}'. "
        "Hint: prefix = '  ' * self.level"
    )


def test_indenter_nested_levels():
    ind = Indenter()
    results = []
    with ind:
        results.append(ind.print("level 1"))
        with ind:
            results.append(ind.print("level 2"))
            with ind:
                results.append(ind.print("level 3"))
        results.append(ind.print("back to 1"))

    assert results[0] == "  level 1", f"Level 1 should have 2 spaces, got '{results[0]}'"
    assert results[1] == "    level 2", f"Level 2 should have 4 spaces, got '{results[1]}'"
    assert results[2] == "      level 3", f"Level 3 should have 6 spaces, got '{results[2]}'"
    assert results[3] == "  back to 1", f"Back to level 1 should have 2 spaces, got '{results[3]}'"


def test_indenter_starts_at_zero():
    ind = Indenter()
    result = ind.print("no indent")
    assert result == "no indent", (
        f"Before entering a with block, level should be 0 (no indent), got '{result}'"
    )


# ── Tests for TempValue ───────────────────

def test_temp_value_basic():
    class Config:
        debug = False

    cfg = Config()
    assert cfg.debug is False

    with TempValue(cfg, "debug", True):
        assert cfg.debug is True, (
            "Inside the with block, debug should be True"
        )

    assert cfg.debug is False, (
        "After the with block, debug should be restored to False"
    )


def test_temp_value_restores_on_exception():
    class Config:
        mode = "production"

    cfg = Config()
    with pytest.raises(RuntimeError):
        with TempValue(cfg, "mode", "testing"):
            assert cfg.mode == "testing"
            raise RuntimeError("oops")

    assert cfg.mode == "production", (
        "TempValue should restore the original value even when an exception occurs"
    )


def test_temp_value_with_none():
    class Settings:
        value = 42

    s = Settings()
    with TempValue(s, "value", None):
        assert s.value is None

    assert s.value == 42


# ── Tests for Suppress ────────────────────

def test_suppress_catches_matching_exception():
    s = Suppress(ValueError)
    with s:
        int("abc")

    assert isinstance(s.exception, ValueError), (
        f"Suppress should store the ValueError, got {type(s.exception)}"
    )


def test_suppress_ignores_non_matching():
    s = Suppress(ValueError)
    with pytest.raises(TypeError):
        with s:
            1 + "2"  # TypeError


def test_suppress_multiple_types():
    s = Suppress(ValueError, TypeError)
    with s:
        1 + "2"  # TypeError

    assert isinstance(s.exception, TypeError), (
        "Suppress should catch TypeError when it's in the suppressed types"
    )


def test_suppress_no_exception():
    s = Suppress(ValueError)
    with s:
        x = 1 + 1

    assert s.exception is None, (
        "When no exception occurs, s.exception should be None"
    )


# ── Tests for Transaction ─────────────────

def test_transaction_commit_on_success():
    log = []
    t = Transaction()
    t.add_operation(
        do=lambda: log.append("A"),
        undo=lambda: log.remove("A"),
    )
    t.add_operation(
        do=lambda: log.append("B"),
        undo=lambda: log.remove("B"),
    )

    with t:
        t.execute()

    assert log == ["A", "B"], (
        f"After successful transaction, log should be ['A', 'B'], got {log}"
    )
    assert t.committed is True, (
        "Transaction should be committed on success"
    )


def test_transaction_rollback_on_failure():
    log = []
    t = Transaction()
    t.add_operation(
        do=lambda: log.append("A"),
        undo=lambda: log.remove("A"),
    )
    t.add_operation(
        do=lambda: log.append("B"),
        undo=lambda: log.remove("B"),
    )

    with pytest.raises(RuntimeError):
        with t:
            t.execute()
            raise RuntimeError("something went wrong")

    assert log == [], (
        f"After rollback, log should be empty, got {log}. "
        "Hint: Call undo() for each executed operation in reverse order"
    )
    assert t.committed is False, (
        "Transaction should not be committed after rollback"
    )


def test_transaction_partial_rollback():
    log = []
    t = Transaction()
    t.add_operation(
        do=lambda: log.append("A"),
        undo=lambda: log.remove("A"),
    )
    t.add_operation(
        do=lambda: log.append("B"),
        undo=lambda: log.remove("B"),
    )

    # Only execute first operation, then fail
    with pytest.raises(RuntimeError):
        with t:
            t.operations[0]["do"]()
            t.executed.append(t.operations[0])
            raise RuntimeError("fail after first op")

    assert log == [], (
        f"Only 'A' was executed and should be undone, got {log}"
    )


def test_transaction_empty():
    t = Transaction()
    with t:
        t.execute()
    assert t.committed is True
