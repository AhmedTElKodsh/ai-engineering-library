"""
Day 00: Python Confidence Inventory
before the journey begins, let's see where you stand

This is a diagnostic assessment — not a test you need to pass.
Run it now to see your strengths and gaps across six Python skill areas.
Run it again after Day 42 to see how far you've come.

Skill Areas Assessed:
- Fundamentals: variables, types, operators
- Data Structures: lists, dicts, sets, tuples
- Functions: parameters, returns, scope, closures
- OOP: classes, inheritance, magic methods
- Pythonic Patterns: comprehensions, generators, unpacking
- Error Handling: try/except, custom exceptions, context managers

Concepts: self-assessment, diagnostic, all topics
Builds On: —
Prepares For: Day 01 — variables and types
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 15-20 min
# Note: You are NOT expected to pass everything. That's the point.


# ── Fundamentals ───────────────────────────

def swap_without_temp(a: int, b: int) -> tuple[int, int]:
    """
    Swap two values without using a temporary variable.

    Args:
        a: first integer
        b: second integer

    Returns:
        A tuple of (b, a)

    Pseudocode:
        1. Return both values in swapped order using tuple packing
    """

    return (b, a)


def is_even_and_positive(n: int) -> bool:
    """
    Check if a number is both even and positive.

    Args:
        n: an integer to check

    Returns:
        True if n is even AND positive, False otherwise

    Pseudocode:
        1. Check if n is greater than 0
        2. Check if n is divisible by 2 (no remainder)
        3. Return True only if both conditions are met
    """
    pass  # YOUR CODE HERE


# ── Data Structures ────────────────────────

def flatten_list(nested: list[list]) -> list:
    """
    Flatten a list of lists into a single list.

    Args:
        nested: a list where each element is itself a list

    Returns:
        A single flat list containing all elements

    Pseudocode:
        1. Create an empty result list
        2. For each sublist in the nested list
        3. Extend the result with elements from the sublist
        4. Return the result
    """
    pass  # YOUR CODE HERE


def count_words(text: str) -> dict[str, int]:
    """
    Count occurrences of each word in a text (case-insensitive).

    Args:
        text: a string of words separated by spaces

    Returns:
        A dictionary mapping lowercase words to their counts

    Pseudocode:
        1. Convert text to lowercase
        2. Split into words
        3. Count each word using a dictionary
        4. Return the counts dictionary
    """
    pass  # YOUR CODE HERE


def unique_elements(items: list) -> list:
    """
    Return unique elements preserving original order.

    Args:
        items: a list that may contain duplicates

    Returns:
        A list with duplicates removed, order preserved

    Pseudocode:
        1. Track seen elements with a set
        2. Build result list, adding only unseen elements
        3. Return the result
    """
    pass  # YOUR CODE HERE


# ── Functions ──────────────────────────────

def make_multiplier(factor: int):
    """
    Return a function that multiplies its input by factor.

    Args:
        factor: the number to multiply by

    Returns:
        A function that takes one argument and returns it multiplied by factor

    Pseudocode:
        1. Define an inner function that takes one argument
        2. Return the argument multiplied by factor
        3. Return the inner function
    """
    pass  # YOUR CODE HERE


def apply_to_all(func, items: list) -> list:
    """
    Apply a function to every item in a list.

    Args:
        func: a callable that takes one argument
        items: a list of values

    Returns:
        A new list with func applied to each element

    Pseudocode:
        1. Create a new list by calling func on each item
        2. Return the new list
    """
    pass  # YOUR CODE HERE


# ── OOP ────────────────────────────────────

class Counter:
    """
    A simple counter that can increment, decrement, and reset.

    Attributes:
        count (int): the current count value

    Pseudocode:
        - __init__: set count to start value (default 0)
        - increment: add 1 to count
        - decrement: subtract 1 from count (minimum 0)
        - reset: set count back to 0
        - __str__: return "Counter(N)" where N is current count
    """

    def __init__(self, start: int = 0) -> None:
        """Initialize Counter with a starting value."""
        pass  # YOUR CODE HERE

    def increment(self) -> None:
        """Add 1 to the counter."""
        pass  # YOUR CODE HERE

    def decrement(self) -> None:
        """Subtract 1 from the counter (minimum 0)."""
        pass  # YOUR CODE HERE

    def reset(self) -> None:
        """Reset the counter to 0."""
        pass  # YOUR CODE HERE

    def __str__(self) -> str:
        """Return string representation like 'Counter(5)'."""
        pass  # YOUR CODE HERE


# ── Pythonic Patterns ──────────────────────

def even_squares(numbers: list[int]) -> list[int]:
    """
    Return squares of even numbers using a list comprehension.

    Args:
        numbers: a list of integers

    Returns:
        A list of squared values for only the even numbers

    Pseudocode:
        1. Use a list comprehension
        2. Filter for even numbers
        3. Square each even number
        4. Return the result
    """
    pass  # YOUR CODE HERE


def first_n_fibonacci(n: int) -> list[int]:
    """
    Generate the first n Fibonacci numbers.

    Args:
        n: how many Fibonacci numbers to generate (n >= 1)

    Returns:
        A list of the first n Fibonacci numbers starting with [0, 1, 1, 2, ...]

    Pseudocode:
        1. Start with [0] if n == 1, [0, 1] if n >= 2
        2. Loop until you have n numbers
        3. Each new number is sum of previous two
        4. Return the list
    """
    pass  # YOUR CODE HERE


# ── Error Handling ─────────────────────────

def safe_divide(a: float, b: float) -> float | str:
    """
    Divide a by b, returning an error message if b is zero.

    Args:
        a: the dividend
        b: the divisor

    Returns:
        The result of a / b, or "Error: division by zero" if b is 0

    Pseudocode:
        1. Try to divide a by b
        2. If ZeroDivisionError occurs, return the error message string
        3. Otherwise return the result
    """
    pass  # YOUR CODE HERE


def validate_age(age) -> int:
    """
    Validate and return an age value, raising appropriate errors.

    Args:
        age: a value that should be a positive integer

    Returns:
        The validated age as an integer

    Raises:
        TypeError: if age is not an integer
        ValueError: if age is negative or zero

    Pseudocode:
        1. Check if age is an integer (not bool) — raise TypeError if not
        2. Check if age is positive — raise ValueError if not
        3. Return the validated age
    """
    pass  # YOUR CODE HERE
