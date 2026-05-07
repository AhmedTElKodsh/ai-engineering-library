"""
Tests for Day 06 — Functions and Scope

Run:  pytest test_solution.py -v
"""

import pytest

try:
    from solution_template import (
        apply_discount,
        make_greeting,
        compose,
        memoize,
        create_counter,
        retry,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import solution_template: {e}",
        allow_module_level=True,
    )


# ── Setup Verification ───────────────────────────
class TestSetup:
    """Verify the template is importable and functions exist."""

    def test_setup_imports_work(self):
        """All six functions should be importable from the template."""
        funcs = [apply_discount, make_greeting, compose, memoize, create_counter, retry]
        assert len(funcs) == 6, (
            "Setup check: expected 6 importable functions, "
            f"got {len(funcs)}. "
            "Hint: do not rename or delete any function stubs."
        )


# ── Apply Discount ────────────────────────────────
class TestApplyDiscount:
    """Tests for apply_discount(price, discount=0.1)."""

    def test_default_discount(self):
        """10% discount should be applied when no discount is given."""
        result = apply_discount(100.0)
        assert result == 90.0, (
            "apply_discount(100.0) with default 10% discount: "
            f"expected 90.0, got {result}. "
            "Hint: multiply price by (1 - discount)."
        )

    def test_custom_discount(self):
        """A 25% discount on 49.99 should yield 37.49."""
        result = apply_discount(49.99, 0.25)
        assert result == 37.49, (
            "apply_discount(49.99, 0.25): "
            f"expected 37.49, got {result}. "
            "Hint: round the result to 2 decimal places."
        )

    def test_zero_discount(self):
        """A 0% discount should return the original price."""
        result = apply_discount(75.50, 0.0)
        assert result == 75.50, (
            "apply_discount(75.50, 0.0): "
            f"expected 75.50, got {result}. "
            "Hint: a discount of 0.0 means no reduction."
        )


# ── Make Greeting ─────────────────────────────────
class TestMakeGreeting:
    """Tests for make_greeting(name, **kwargs)."""

    def test_name_only(self):
        """A plain name should produce 'Hello, Alice!'."""
        result = make_greeting("Alice")
        assert result == "Hello, Alice!", (
            "make_greeting('Alice'): "
            f"expected 'Hello, Alice!', got '{result}'. "
            "Hint: format as 'Hello, <name>!' when no kwargs given."
        )

    def test_with_title(self):
        """A title kwarg should appear before the name."""
        result = make_greeting("Smith", title="Dr.")
        assert result == "Hello, Dr. Smith!", (
            "make_greeting('Smith', title='Dr.'): "
            f"expected 'Hello, Dr. Smith!', got '{result}'. "
            "Hint: insert the title before the name with a space."
        )

    def test_with_title_and_suffix(self):
        """Both title and suffix should wrap the name."""
        result = make_greeting("Smith", title="Dr.", suffix="Jr.")
        assert result == "Hello, Dr. Smith Jr.!", (
            "make_greeting('Smith', title='Dr.', suffix='Jr.'): "
            f"expected 'Hello, Dr. Smith Jr.!', got '{result}'. "
            "Hint: build the full name as '<title> <name> <suffix>', trimming spaces."
        )

    def test_with_suffix_only(self):
        """A suffix without a title should appear after the name."""
        result = make_greeting("King", suffix="III")
        assert result == "Hello, King III!", (
            "make_greeting('King', suffix='III'): "
            f"expected 'Hello, King III!', got '{result}'. "
            "Hint: suffix goes after the name with a space."
        )


# ── Compose ───────────────────────────────────────
class TestCompose:
    """Tests for compose(f, g) -> callable."""

    def test_compose_basic(self):
        """compose(double, add_one)(3) should give 8: add_one first, then double."""
        double = lambda x: x * 2
        add_one = lambda x: x + 1
        result = compose(double, add_one)(3)
        assert result == 8, (
            "compose(double, add_one)(3): "
            f"expected 8, got {result}. "
            "Hint: apply g first (3+1=4), then f (4*2=8)."
        )

    def test_compose_strings(self):
        """Composition should work with string functions."""
        shout = lambda s: s.upper()
        greet = lambda s: f"hi {s}"
        result = compose(shout, greet)("world")
        assert result == "HI WORLD", (
            "compose(shout, greet)('world'): "
            f"expected 'HI WORLD', got '{result}'. "
            "Hint: greet first -> 'hi world', then shout -> 'HI WORLD'."
        )

    def test_compose_identity(self):
        """Composing with identity should return the same result."""
        identity = lambda x: x
        square = lambda x: x ** 2
        result = compose(identity, square)(5)
        assert result == 25, (
            "compose(identity, square)(5): "
            f"expected 25, got {result}. "
            "Hint: square(5)=25, identity(25)=25."
        )


# ── Memoize ───────────────────────────────────────
class TestMemoize:
    """Tests for memoize(func) -> cached callable with .cache attribute."""

    def test_memoize_returns_correct_value(self):
        """Memoized function should return the same result as the original."""
        @memoize
        def square(x):
            return x ** 2

        assert square(4) == 16, (
            "memoize(square)(4): "
            "expected 16, got something else. "
            "Hint: the wrapper should call the original function and return its result."
        )

    def test_memoize_cache_populated(self):
        """After a call, the .cache dict should contain the arguments and result."""
        @memoize
        def add(a, b):
            return a + b

        add(2, 3)
        assert (2, 3) in add.cache, (
            "add.cache after add(2, 3): "
            f"expected key (2, 3) in cache, got keys {list(add.cache.keys())}. "
            "Hint: use the args tuple as the cache key."
        )
        assert add.cache[(2, 3)] == 5, (
            "add.cache[(2, 3)]: "
            f"expected 5, got {add.cache[(2, 3)]}. "
            "Hint: store the return value in the cache dict."
        )

    def test_memoize_avoids_recomputation(self):
        """A cached call should not invoke the original function again."""
        call_count = 0

        @memoize
        def expensive(x):
            nonlocal call_count
            call_count += 1
            return x * 10

        expensive(7)
        expensive(7)
        assert call_count == 1, (
            "memoize recomputation check: "
            f"expected 1 call, got {call_count}. "
            "Hint: check the cache before calling the original function."
        )


# ── Create Counter ────────────────────────────────
class TestCreateCounter:
    """Tests for create_counter(start=0) -> dict of closures."""

    def test_initial_value(self):
        """get_value should return the start value before any operations."""
        counter = create_counter(10)
        result = counter["get_value"]()
        assert result == 10, (
            "create_counter(10)['get_value'](): "
            f"expected 10, got {result}. "
            "Hint: the closure should capture the start value."
        )

    def test_increment(self):
        """increment should add 1 and return the new value."""
        counter = create_counter(0)
        result = counter["increment"]()
        assert result == 1, (
            "create_counter(0)['increment'](): "
            f"expected 1, got {result}. "
            "Hint: increment the shared variable and return it."
        )

    def test_decrement(self):
        """decrement should subtract 1 and return the new value."""
        counter = create_counter(5)
        result = counter["decrement"]()
        assert result == 4, (
            "create_counter(5)['decrement'](): "
            f"expected 4, got {result}. "
            "Hint: decrement the shared variable and return it."
        )

    def test_multiple_operations(self):
        """A sequence of operations should accumulate correctly."""
        counter = create_counter(0)
        counter["increment"]()
        counter["increment"]()
        counter["increment"]()
        counter["decrement"]()
        result = counter["get_value"]()
        assert result == 2, (
            "create_counter(0) after 3 increments and 1 decrement: "
            f"expected 2, got {result}. "
            "Hint: all three closures must share the same mutable variable."
        )

    def test_independent_counters(self):
        """Two counters should not share state."""
        c1 = create_counter(0)
        c2 = create_counter(100)
        c1["increment"]()
        result_c1 = c1["get_value"]()
        result_c2 = c2["get_value"]()
        assert result_c1 == 1 and result_c2 == 100, (
            "Independent counters: "
            f"expected c1=1, c2=100, got c1={result_c1}, c2={result_c2}. "
            "Hint: each call to create_counter should create a new closure scope."
        )


# ── Retry ─────────────────────────────────────────
class TestRetry:
    """Tests for retry(max_attempts=3) -> decorator."""

    def test_succeeds_first_try(self):
        """A function that never fails should return normally."""
        @retry(max_attempts=3)
        def always_works():
            return "ok"

        result = always_works()
        assert result == "ok", (
            "retry: function that succeeds immediately: "
            f"expected 'ok', got {result}. "
            "Hint: if no exception is raised, return the result right away."
        )

    def test_succeeds_after_failures(self):
        """A function that fails twice then succeeds should return on the third try."""
        attempts = 0

        @retry(max_attempts=3)
        def flaky():
            nonlocal attempts
            attempts += 1
            if attempts < 3:
                raise ValueError("not yet")
            return "recovered"

        result = flaky()
        assert result == "recovered", (
            "retry: function that fails twice then succeeds: "
            f"expected 'recovered', got {result}. "
            "Hint: catch the exception and retry up to max_attempts times."
        )

    def test_raises_after_all_attempts(self):
        """A function that always fails should re-raise the last exception."""
        @retry(max_attempts=2)
        def always_fails():
            raise RuntimeError("boom")

        with pytest.raises(RuntimeError, match="boom"):
            always_fails()

    def test_retry_custom_attempts(self):
        """The decorator should respect a custom max_attempts value."""
        call_count = 0

        @retry(max_attempts=5)
        def fails_four_times():
            nonlocal call_count
            call_count += 1
            if call_count < 5:
                raise OSError("fail")
            return "finally"

        result = fails_four_times()
        assert result == "finally" and call_count == 5, (
            "retry(max_attempts=5) with function that fails 4 times: "
            f"expected 'finally' after 5 calls, got '{result}' after {call_count} calls. "
            "Hint: loop up to max_attempts, not a hardcoded number."
        )
