"""
Day 03: Lists and Tuples
strings taught you sequences of characters — now meet sequences of anything

Learning Objectives:
- Find values in a list without relying on built-in sort
- Rotate list elements by an arbitrary number of positions
- Interleave two lists of potentially different lengths
- Split a list into fixed-size chunks
- Compute summary statistics from a tuple of numbers

Concepts: lists, tuples, indexing, slicing, list methods, unpacking
Builds On: Day 01 — variables and types, Day 02 — strings and formatting
Prepares For: Day 04 — dictionaries and sets, Day 07 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★☆☆☆ (2/5)
# Estimated Time: 30 min

# ── Data Flow ──────────────────────────────
# Input:  Lists and tuples of various elements
# Process: Search, rearrange, combine, split, and summarize sequences
# Output: Transformed lists, tuples, or summary dictionaries


def find_second_largest(numbers: list[int]) -> int:
    """
    Find the second largest value in a list of integers.

    Args:
        numbers: a list of integers with at least two distinct values

    Returns:
        The second largest integer in the list

    Pseudocode:
        1. Remove duplicates (e.g. convert to a set, then back to a list)
        2. Sort the unique values (or find max, remove it, find max again)
        3. Return the second largest value
    """
    pass  # YOUR CODE HERE


def rotate_list(items: list, n: int) -> list:
    """
    Rotate a list to the right by n positions.

    Args:
        items: the list to rotate
        n: number of positions to rotate right (may be larger than list length)

    Returns:
        A new list with elements rotated right by n positions

    Pseudocode:
        1. Handle the case where the list is empty
        2. Normalize n using modulo (n % len) to handle large values
        3. Slice the list into two parts at the rotation point
        4. Concatenate the tail slice before the head slice
    """
    pass  # YOUR CODE HERE


def interleave(list_a: list, list_b: list) -> list:
    """
    Interleave two lists element by element; append any remaining elements.

    Args:
        list_a: the first list
        list_b: the second list

    Returns:
        A new list like [a0, b0, a1, b1, ...] with leftover elements appended

    Pseudocode:
        1. Find the length of the shorter list
        2. Loop up to that length, appending a[i] then b[i]
        3. Append any remaining elements from the longer list
        4. Return the result
    """
    pass  # YOUR CODE HERE


def chunk_list(items: list, size: int) -> list[list]:
    """
    Split a list into consecutive chunks of the given size.

    Args:
        items: the list to split
        size: the maximum number of elements per chunk (positive integer)

    Returns:
        A list of lists, where each inner list has at most `size` elements

    Pseudocode:
        1. Create an empty result list
        2. Loop through the items with a step of `size`
        3. Slice from current index to current index + size
        4. Append each slice to the result
        5. Return the result
    """
    pass  # YOUR CODE HERE


def tuple_statistics(data: tuple[int | float, ...]) -> dict:
    """
    Compute summary statistics from a tuple of numbers.

    Args:
        data: a non-empty tuple of integers or floats

    Returns:
        A dict with keys "min", "max", "mean", "median"

    Pseudocode:
        1. Calculate min and max using built-in functions
        2. Calculate mean as sum / length
        3. Sort the values to find the median
        4. If the count is odd, median is the middle value
        5. If the count is even, median is the average of the two middle values
        6. Return all four stats in a dictionary
    """
    pass  # YOUR CODE HERE
