"""
Day 01: Variables and Types
every journey starts with a single variable — today you'll meet Python's building blocks

Learning Objectives:
- Use Python's core data types: int, float, str, bool
- Apply type conversion between numeric and string types
- Implement variable swapping and multiple assignment
- Build a simple data processor using type checking

Concepts: variables, types, type conversion, isinstance, multiple assignment
Builds On: —
Prepares For: Day 02 — strings and formatting, Day 03 — lists and tuples
"""

# ── Difficulty ──────────────────────────────
# Level: ★☆☆☆☆ (1/5)
# Estimated Time: 20 min

# ── Data Flow ──────────────────────────────
# Input:  Raw values of various types (int, float, str, bool)
# Process: Convert, check, swap, and classify values
# Output: Transformed values with correct types


def classify_type(value: object) -> str:
    """
    Return the type category of a value as a human-readable string.

    Args:
        value: any Python value to classify

    Returns:
        One of: "integer", "float", "string", "boolean", "other"

    Pseudocode:
        1. Check if value is a boolean (must check before int, since bool is subclass of int)
        2. Check if value is an integer
        3. Check if value is a float
        4. Check if value is a string
        5. Return "other" if none match
    """
    pass  # YOUR CODE HERE


def safe_convert_to_int(value: str) -> int | None:
    """
    Safely convert a string to an integer, returning None if conversion fails.

    Args:
        value: a string that may or may not represent an integer

    Returns:
        The integer value if conversion succeeds, None otherwise

    Pseudocode:
        1. Try to convert the string to an integer
        2. If successful, return the integer
        3. If conversion fails (ValueError), return None
    """
    pass  # YOUR CODE HERE


def swap_values(a: object, b: object) -> tuple:
    """
    Return two values in swapped order.

    Args:
        a: first value
        b: second value

    Returns:
        A tuple of (b, a)

    Pseudocode:
        1. Return a tuple with b first, then a
    """
    pass  # YOUR CODE HERE


def build_profile(name: str, age: int, score: float) -> dict:
    """
    Build a user profile dictionary from individual values.

    Args:
        name: the user's name
        age: the user's age in years
        score: the user's score as a decimal

    Returns:
        A dictionary with keys "name", "age", "score", and "summary"
        where summary is a formatted string like "Alice (30) - 95.5"

    Pseudocode:
        1. Create a dictionary with name, age, and score
        2. Build a summary string in the format "name (age) - score"
        3. Add the summary to the dictionary
        4. Return the dictionary
    """
    pass  # YOUR CODE HERE


def calculate_stats(numbers: list[int | float]) -> dict:
    """
    Calculate basic statistics for a list of numbers.

    Args:
        numbers: a non-empty list of integers or floats

    Returns:
        A dictionary with keys "total", "count", "average" (as float),
        "minimum", and "maximum"

    Pseudocode:
        1. Calculate the sum of all numbers
        2. Count how many numbers there are
        3. Compute the average (total / count) as a float
        4. Find the minimum and maximum values
        5. Return all stats in a dictionary
    """
    pass  # YOUR CODE HERE
