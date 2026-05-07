"""
Day 13: Unpacking & Pythonic Patterns
Python has an elegant way to do almost everything — today you learn the idioms

Learning Objectives:
- Master star unpacking (* and **) in various contexts
- Use enumerate and zip effectively
- Apply the walrus operator for cleaner code
- Write EAFP-style code (try/except over if/else)
- Compose functions into processing pipelines

Concepts: *, **, enumerate, zip, walrus operator, EAFP, Pythonic idioms
Builds On: Day 03 — lists, Day 06 — functions, Day 12 — comprehensions
Prepares For: Day 14 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 35 min


def unpack_and_merge(*dicts) -> dict:
    """Merge an arbitrary number of dictionaries using ** unpacking.

    Later dicts override earlier ones on key conflicts.

    Args:
        *dicts: any number of dictionaries

    Returns:
        A single merged dictionary

    Examples:
        >>> unpack_and_merge({"a": 1}, {"b": 2}, {"a": 3})
        {"a": 3, "b": 2}

    Pseudocode:
        1. Start with an empty result dict
        2. For each dict in dicts, merge it with {**result, **d}
        3. Return the result
    """
    pass  # YOUR CODE HERE


def zip_records(headers: list[str], *rows: list) -> list[dict]:
    """Create a list of dicts by zipping headers with each row.

    Args:
        headers: list of column names, e.g. ["name", "age", "city"]
        *rows: each row is a list of values matching the headers

    Returns:
        List of dicts, one per row

    Examples:
        >>> zip_records(["name", "age"], ["Alice", 30], ["Bob", 25])
        [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]

    Pseudocode:
        1. For each row in rows:
           a. zip(headers, row) to create key-value pairs
           b. Convert to dict
        2. Return the list of dicts
    """
    pass  # YOUR CODE HERE


def enumerate_transform(items: list, start: int = 0) -> list[dict]:
    """Transform a list into indexed records using enumerate.

    Args:
        items: list of any values
        start: starting index (default 0)

    Returns:
        List of dicts with "index" and "value" keys

    Examples:
        >>> enumerate_transform(["a", "b"], start=1)
        [{"index": 1, "value": "a"}, {"index": 2, "value": "b"}]

    Pseudocode:
        1. Use enumerate(items, start=start)
        2. For each (i, item), create {"index": i, "value": item}
        3. Return the list
    """
    pass  # YOUR CODE HERE


def first_match(items: list, predicate) -> dict:
    """Find the first item matching a predicate, using the walrus operator.

    Args:
        items: list of values to search
        predicate: callable that takes a value and returns True/False

    Returns:
        A dict with:
        - "found": True/False
        - "value": the matching item (or None if not found)
        - "index": the index of the match (or -1 if not found)

    Examples:
        >>> first_match([1, 5, 12, 3], lambda x: x > 10)
        {"found": True, "value": 12, "index": 2}

    Pseudocode:
        1. Loop through items with enumerate
        2. For each item, test the predicate
        3. If True, return {"found": True, "value": item, "index": i}
        4. If no match found, return {"found": False, "value": None, "index": -1}

    Note: Using the walrus operator is optional but encouraged for practice.
    """
    pass  # YOUR CODE HERE


def safe_access(data: dict, path: str, default=None):
    """Safely navigate a nested dict using dot-separated path (EAFP style).

    Args:
        data: a possibly nested dictionary
        path: dot-separated keys, e.g. "user.address.city"
        default: value to return if any key is missing

    Returns:
        The value at the nested path, or default if any key is missing

    Examples:
        >>> safe_access({"user": {"name": "Alice"}}, "user.name")
        "Alice"
        >>> safe_access({"user": {"name": "Alice"}}, "user.email", "N/A")
        "N/A"

    Pseudocode:
        1. Split path by "."
        2. Start with current = data
        3. For each key in the path:
           a. Try current = current[key]
           b. On KeyError or TypeError, return default
        4. Return current
    """
    pass  # YOUR CODE HERE


def pipeline(data: list, *transforms) -> list:
    """Apply a sequence of transformation functions to data.

    Each transform is a callable that takes a list and returns a list.
    Transforms are applied left to right.

    Args:
        data: the input list
        *transforms: callables that take a list and return a list

    Returns:
        The data after all transforms have been applied

    Examples:
        >>> pipeline(
        ...     [3, 1, 4, 1, 5],
        ...     lambda lst: [x for x in lst if x > 2],   # filter
        ...     sorted,                                     # sort
        ...     lambda lst: [x * 10 for x in lst],        # multiply
        ... )
        [30, 40, 50]

    Pseudocode:
        1. Start with result = data
        2. For each transform in transforms:
           a. result = transform(result)
        3. Return result
    """
    pass  # YOUR CODE HERE
