"""Tests for Day 03: Lists and Tuples."""
import pytest

try:
    from solution_template import (
        find_second_largest,
        rotate_list,
        interleave,
        chunk_list,
        tuple_statistics,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(find_second_largest), "find_second_largest should be a callable function"
    assert callable(rotate_list), "rotate_list should be a callable function"
    assert callable(interleave), "interleave should be a callable function"
    assert callable(chunk_list), "chunk_list should be a callable function"
    assert callable(tuple_statistics), "tuple_statistics should be a callable function"


# ── Tests for find_second_largest ────────────

def test_find_second_largest_basic():
    result = find_second_largest([3, 1, 4, 1, 5, 9])
    assert result == 5, (
        "find_second_largest([3, 1, 4, 1, 5, 9]) should return 5. "
        f"Expected 5, got {result}. "
        "Hint: The largest is 9, so the second largest is 5"
    )


def test_find_second_largest_with_duplicates():
    result = find_second_largest([5, 5, 5, 3, 3])
    assert result == 3, (
        "find_second_largest([5, 5, 5, 3, 3]) should return 3. "
        f"Expected 3, got {result}. "
        "Hint: Remove duplicates first — the unique values are {3, 5}"
    )


def test_find_second_largest_negative_numbers():
    result = find_second_largest([-1, -5, -2, -8])
    assert result == -2, (
        "find_second_largest([-1, -5, -2, -8]) should return -2. "
        f"Expected -2, got {result}. "
        "Hint: Among negatives, -1 is the largest and -2 is second"
    )


def test_find_second_largest_two_elements():
    result = find_second_largest([10, 20])
    assert result == 10, (
        "find_second_largest([10, 20]) should return 10. "
        f"Expected 10, got {result}. "
        "Hint: With two distinct elements, the smaller one is second largest"
    )


# ── Tests for rotate_list ────────────────────

def test_rotate_list_basic():
    result = rotate_list([1, 2, 3, 4, 5], 2)
    assert result == [4, 5, 1, 2, 3], (
        "rotate_list([1, 2, 3, 4, 5], 2) should move last 2 items to front. "
        f"Expected [4, 5, 1, 2, 3], got {result}. "
        "Hint: Rotating right by 2 moves the last 2 elements to the beginning"
    )


def test_rotate_list_full_rotation():
    result = rotate_list([1, 2, 3], 3)
    assert result == [1, 2, 3], (
        "rotate_list([1, 2, 3], 3) should return the same list for full rotation. "
        f"Expected [1, 2, 3], got {result}. "
        "Hint: Rotating by the list length returns the original order"
    )


def test_rotate_list_larger_than_length():
    result = rotate_list([1, 2, 3], 5)
    assert result == [2, 3, 1], (
        "rotate_list([1, 2, 3], 5) should handle n > length using modulo. "
        f"Expected [2, 3, 1], got {result}. "
        "Hint: 5 % 3 = 2, so this is the same as rotating by 2"
    )


def test_rotate_list_empty():
    result = rotate_list([], 3)
    assert result == [], (
        "rotate_list([], 3) should return an empty list. "
        f"Expected [], got {result}. "
        "Hint: Rotating an empty list always gives an empty list"
    )


# ── Tests for interleave ────────────────────

def test_interleave_equal_length():
    result = interleave([1, 3, 5], [2, 4, 6])
    assert result == [1, 2, 3, 4, 5, 6], (
        "interleave([1, 3, 5], [2, 4, 6]) should alternate elements. "
        f"Expected [1, 2, 3, 4, 5, 6], got {result}. "
        "Hint: Take one from each list in turn: a[0], b[0], a[1], b[1], ..."
    )


def test_interleave_first_longer():
    result = interleave([1, 2, 3, 4], [10, 20])
    assert result == [1, 10, 2, 20, 3, 4], (
        "interleave([1, 2, 3, 4], [10, 20]) should append remainder of first list. "
        f"Expected [1, 10, 2, 20, 3, 4], got {result}. "
        "Hint: After interleaving the paired elements, append the leftover [3, 4]"
    )


def test_interleave_second_longer():
    result = interleave([1], [10, 20, 30])
    assert result == [1, 10, 20, 30], (
        "interleave([1], [10, 20, 30]) should append remainder of second list. "
        f"Expected [1, 10, 20, 30], got {result}. "
        "Hint: After interleaving [1, 10], append the leftover [20, 30]"
    )


def test_interleave_one_empty():
    result = interleave([], [1, 2, 3])
    assert result == [1, 2, 3], (
        "interleave([], [1, 2, 3]) should return the non-empty list. "
        f"Expected [1, 2, 3], got {result}. "
        "Hint: With nothing to interleave, just return the other list's elements"
    )


# ── Tests for chunk_list ─────────────────────

def test_chunk_list_even_split():
    result = chunk_list([1, 2, 3, 4, 5, 6], 2)
    assert result == [[1, 2], [3, 4], [5, 6]], (
        "chunk_list([1, 2, 3, 4, 5, 6], 2) should split into 3 pairs. "
        f"Expected [[1, 2], [3, 4], [5, 6]], got {result}. "
        "Hint: Slice from index 0 to 2, 2 to 4, and 4 to 6"
    )


def test_chunk_list_uneven_split():
    result = chunk_list([1, 2, 3, 4, 5], 3)
    assert result == [[1, 2, 3], [4, 5]], (
        "chunk_list([1, 2, 3, 4, 5], 3) should have a smaller last chunk. "
        f"Expected [[1, 2, 3], [4, 5]], got {result}. "
        "Hint: The last chunk can be smaller than `size`"
    )


def test_chunk_list_size_larger_than_list():
    result = chunk_list([1, 2], 10)
    assert result == [[1, 2]], (
        "chunk_list([1, 2], 10) should return one chunk with all elements. "
        f"Expected [[1, 2]], got {result}. "
        "Hint: When size exceeds the list length, everything fits in one chunk"
    )


def test_chunk_list_empty():
    result = chunk_list([], 3)
    assert result == [], (
        "chunk_list([], 3) should return an empty list. "
        f"Expected [], got {result}. "
        "Hint: There are no elements to chunk"
    )


# ── Tests for tuple_statistics ───────────────

def test_tuple_statistics_basic():
    result = tuple_statistics((4, 1, 7, 3, 9))
    assert result["min"] == 1, (
        "tuple_statistics((4, 1, 7, 3, 9))['min'] should be 1. "
        f"Expected 1, got {result.get('min')}. "
        "Hint: Use the built-in min() function"
    )
    assert result["max"] == 9, (
        "tuple_statistics((4, 1, 7, 3, 9))['max'] should be 9. "
        f"Expected 9, got {result.get('max')}. "
        "Hint: Use the built-in max() function"
    )
    assert result["mean"] == pytest.approx(4.8), (
        "tuple_statistics((4, 1, 7, 3, 9))['mean'] should be 4.8. "
        f"Expected 4.8, got {result.get('mean')}. "
        "Hint: Mean is sum / count = 24 / 5 = 4.8"
    )


def test_tuple_statistics_median_odd():
    result = tuple_statistics((3, 1, 2))
    assert result["median"] == 2, (
        "tuple_statistics((3, 1, 2))['median'] should be 2 (middle of sorted [1, 2, 3]). "
        f"Expected 2, got {result.get('median')}. "
        "Hint: Sort the values, then pick the middle element"
    )


def test_tuple_statistics_median_even():
    result = tuple_statistics((1, 2, 3, 4))
    assert result["median"] == pytest.approx(2.5), (
        "tuple_statistics((1, 2, 3, 4))['median'] should be 2.5 (average of 2 and 3). "
        f"Expected 2.5, got {result.get('median')}. "
        "Hint: For even-length data, median is the average of the two middle values"
    )


def test_tuple_statistics_single_element():
    result = tuple_statistics((42,))
    assert result["min"] == 42, (
        "tuple_statistics((42,))['min'] should be 42 for a single-element tuple. "
        f"Expected 42, got {result.get('min')}. "
        "Hint: A single element is both the min and max"
    )
    assert result["median"] == 42, (
        "tuple_statistics((42,))['median'] should be 42 for a single-element tuple. "
        f"Expected 42, got {result.get('median')}. "
        "Hint: A single element is the median"
    )
    assert result["mean"] == pytest.approx(42.0), (
        "tuple_statistics((42,))['mean'] should be 42.0 for a single-element tuple. "
        f"Expected 42.0, got {result.get('mean')}. "
        "Hint: The mean of one number is that number itself"
    )
