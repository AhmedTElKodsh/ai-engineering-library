"""
Day 06 — Functions and Scope

You've been calling functions all week — today you'll master building your own.

Difficulty: ★★☆☆☆ (2/5)  |  Time: 35 min

Builds On:
    Day 01 — variables and types
    Day 05 — control flow

Prepares For:
    Day 07 — weekly project
    Day 11 — generators and iterators
    Day 12 — decorators

Concepts:
    functions, default arguments, *args, **kwargs, closures, lambda, scope
"""

from functools import wraps


# ── Apply Discount ────────────────────────────────
def apply_discount(price: float, discount: float = 0.1) -> float:
    """Apply a percentage discount to a price.

    Parameters
    ----------
    price : float
        The original price.
    discount : float, optional
        The discount rate (0.0 to 1.0). Defaults to 0.1 (10%).

    Returns
    -------
    float
        The discounted price, rounded to 2 decimal places.

    Examples
    --------
    >>> apply_discount(100.0)
    90.0
    >>> apply_discount(49.99, 0.25)
    37.49
    """
    pass  # YOUR CODE HERE


# ── Make Greeting ─────────────────────────────────
def make_greeting(name: str, **kwargs) -> str:
    """Build a greeting string with optional title and suffix.

    Parameters
    ----------
    name : str
        The person's name.
    **kwargs
        Optional keyword arguments:
        - title (str): e.g. "Dr.", "Prof."
        - suffix (str): e.g. "Jr.", "III"

    Returns
    -------
    str
        A greeting like "Hello, Dr. Smith Jr.!"

    Examples
    --------
    >>> make_greeting("Alice")
    'Hello, Alice!'
    >>> make_greeting("Smith", title="Dr.", suffix="Jr.")
    'Hello, Dr. Smith Jr.!'
    """
    pass  # YOUR CODE HERE


# ── Compose ───────────────────────────────────────
def compose(f, g):
    """Return a new function that applies g first, then f.

    compose(f, g)(x) == f(g(x))

    Parameters
    ----------
    f : callable
        The outer function.
    g : callable
        The inner function (applied first).

    Returns
    -------
    callable
        A composed function.

    Examples
    --------
    >>> double = lambda x: x * 2
    >>> add_one = lambda x: x + 1
    >>> compose(double, add_one)(3)
    8
    """
    pass  # YOUR CODE HERE


# ── Memoize ───────────────────────────────────────
def memoize(func):
    """Return a wrapper that caches results based on arguments.

    The returned wrapper must have a `.cache` attribute (a dict)
    mapping argument tuples to cached return values.

    Parameters
    ----------
    func : callable
        The function to memoize.

    Returns
    -------
    callable
        A memoized version of func with a .cache dict attribute.

    Examples
    --------
    >>> @memoize
    ... def square(x):
    ...     return x ** 2
    >>> square(4)
    16
    >>> square.cache
    {(4,): 16}
    """
    pass  # YOUR CODE HERE


# ── Create Counter ────────────────────────────────
def create_counter(start: int = 0) -> dict:
    """Return a dict of closure functions operating on a shared counter.

    Parameters
    ----------
    start : int, optional
        The initial value of the counter. Defaults to 0.

    Returns
    -------
    dict
        A dict with keys:
        - 'increment': callable that adds 1 to the counter and returns new value
        - 'decrement': callable that subtracts 1 from the counter and returns new value
        - 'get_value': callable that returns the current counter value

    Examples
    --------
    >>> c = create_counter(10)
    >>> c['get_value']()
    10
    >>> c['increment']()
    11
    >>> c['decrement']()
    10
    """
    pass  # YOUR CODE HERE


# ── Retry ─────────────────────────────────────────
def retry(max_attempts: int = 3):
    """Return a decorator that retries a function on exception.

    If the decorated function raises an exception, it is retried up to
    max_attempts total times.  If all attempts fail, the last exception
    is re-raised.

    Parameters
    ----------
    max_attempts : int, optional
        Maximum number of attempts. Defaults to 3.

    Returns
    -------
    callable
        A decorator.

    Examples
    --------
    >>> call_count = 0
    >>> @retry(max_attempts=3)
    ... def flaky():
    ...     global call_count
    ...     call_count += 1
    ...     if call_count < 3:
    ...         raise ValueError("not yet")
    ...     return "ok"
    >>> flaky()
    'ok'
    """
    pass  # YOUR CODE HERE
