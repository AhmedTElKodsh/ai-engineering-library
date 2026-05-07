"""Tests for Day 04: Dictionaries and Sets."""
import pytest

try:
    from solution_template import (
        merge_dicts,
        invert_dict,
        common_elements,
        group_by_length,
        dict_diff,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(merge_dicts), "merge_dicts should be a callable function"
    assert callable(invert_dict), "invert_dict should be a callable function"
    assert callable(common_elements), "common_elements should be a callable function"
    assert callable(group_by_length), "group_by_length should be a callable function"
    assert callable(dict_diff), "dict_diff should be a callable function"


# ── Tests for merge_dicts ──────────────────

def test_merge_dicts_non_overlapping():
    result = merge_dicts({"a": 1}, {"b": 2})
    assert result == {"a": 1, "b": 2}, (
        "merge_dicts({'a': 1}, {'b': 2}) should combine both dicts. "
        f"Expected {{'a': 1, 'b': 2}}, got {result}. "
        "Hint: Both keys should appear in the merged result"
    )


def test_merge_dicts_b_wins_on_conflict():
    result = merge_dicts({"x": 1}, {"x": 99})
    assert result == {"x": 99}, (
        "merge_dicts with overlapping key 'x': dict_b should win. "
        f"Expected {{'x': 99}}, got {result}. "
        "Hint: Update the copy of dict_a with dict_b — later values overwrite earlier ones"
    )


def test_merge_dicts_both_empty():
    result = merge_dicts({}, {})
    assert result == {}, (
        "merge_dicts({}, {}) should return an empty dict. "
        f"Expected {{}}, got {result}. "
        "Hint: Merging two empty dicts produces an empty dict"
    )


def test_merge_dicts_one_empty():
    result = merge_dicts({"a": 1}, {})
    assert result == {"a": 1}, (
        "merge_dicts({'a': 1}, {}) should return the non-empty dict's contents. "
        f"Expected {{'a': 1}}, got {result}. "
        "Hint: Updating with an empty dict changes nothing"
    )


def test_merge_dicts_does_not_mutate_inputs():
    a = {"x": 1}
    b = {"y": 2}
    merge_dicts(a, b)
    assert a == {"x": 1}, (
        "merge_dicts should not modify dict_a. "
        f"dict_a was mutated: got {a}. "
        "Hint: Use dict_a.copy() before updating"
    )


# ── Tests for invert_dict ──────────────────

def test_invert_dict_basic():
    result = invert_dict({"a": 1, "b": 2})
    assert result == {1: "a", 2: "b"}, (
        "invert_dict({'a': 1, 'b': 2}) should swap keys and values. "
        f"Expected {{1: 'a', 2: 'b'}}, got {result}. "
        "Hint: Use a dict comprehension: {{v: k for k, v in d.items()}}"
    )


def test_invert_dict_empty():
    result = invert_dict({})
    assert result == {}, (
        "invert_dict({}) should return an empty dict. "
        f"Expected {{}}, got {result}. "
        "Hint: Inverting an empty dict gives an empty dict"
    )


def test_invert_dict_string_values():
    result = invert_dict({1: "x", 2: "y"})
    assert result == {"x": 1, "y": 2}, (
        "invert_dict({1: 'x', 2: 'y'}) should produce string keys. "
        f"Expected {{'x': 1, 'y': 2}}, got {result}. "
        "Hint: Any hashable value can become a key"
    )


def test_invert_dict_roundtrip():
    original = {"a": 1, "b": 2, "c": 3}
    assert invert_dict(invert_dict(original)) == original, (
        "Inverting a dict twice should return the original. "
        "Hint: If values are unique and hashable, inversion is its own inverse"
    )


# ── Tests for common_elements ──────────────

def test_common_elements_some_overlap():
    result = common_elements([1, 2, 3], [2, 3, 4])
    assert result == [2, 3], (
        "common_elements([1, 2, 3], [2, 3, 4]) should return [2, 3]. "
        f"Expected [2, 3], got {result}. "
        "Hint: Use set intersection (&), then sort the result"
    )


def test_common_elements_no_overlap():
    result = common_elements([1, 2], [3, 4])
    assert result == [], (
        "common_elements with no shared elements should return []. "
        f"Expected [], got {result}. "
        "Hint: An empty intersection means no common elements"
    )


def test_common_elements_duplicates_in_input():
    result = common_elements([1, 1, 2], [1, 1, 3])
    assert result == [1], (
        "common_elements with duplicates should deduplicate. "
        f"Expected [1], got {result}. "
        "Hint: Converting to sets removes duplicates automatically"
    )


def test_common_elements_both_empty():
    result = common_elements([], [])
    assert result == [], (
        "common_elements([], []) should return []. "
        f"Expected [], got {result}. "
        "Hint: Two empty lists share no elements"
    )


def test_common_elements_result_is_sorted():
    result = common_elements([3, 1, 2], [2, 3, 4])
    assert result == sorted(result), (
        "common_elements result should be sorted. "
        f"Got {result} which is not sorted. "
        "Hint: Call sorted() on the intersection before returning"
    )


# ── Tests for group_by_length ──────────────

def test_group_by_length_mixed():
    result = group_by_length(["hi", "hey", "go", "wow"])
    assert result == {2: ["hi", "go"], 3: ["hey", "wow"]}, (
        "group_by_length(['hi', 'hey', 'go', 'wow']) should group by word length. "
        f"Expected {{2: ['hi', 'go'], 3: ['hey', 'wow']}}, got {result}. "
        "Hint: Use len(word) as the dict key; preserve insertion order"
    )


def test_group_by_length_empty():
    result = group_by_length([])
    assert result == {}, (
        "group_by_length([]) should return an empty dict. "
        f"Expected {{}}, got {result}. "
        "Hint: No words means no groups"
    )


def test_group_by_length_single_word():
    result = group_by_length(["python"])
    assert result == {6: ["python"]}, (
        "group_by_length(['python']) should return {6: ['python']}. "
        f"Expected {{6: ['python']}}, got {result}. "
        "Hint: One word forms one group"
    )


def test_group_by_length_preserves_order():
    result = group_by_length(["cat", "dog", "ant"])
    assert result == {3: ["cat", "dog", "ant"]}, (
        "group_by_length should preserve insertion order within each group. "
        f"Expected {{3: ['cat', 'dog', 'ant']}}, got {result}. "
        "Hint: Append words in the order they appear in the input"
    )


# ── Tests for dict_diff ────────────────────

def test_dict_diff_differing_values():
    result = dict_diff({"a": 1}, {"a": 2})
    assert result == {"a": (1, 2)}, (
        "dict_diff({'a': 1}, {'a': 2}) should report the differing value. "
        f"Expected {{'a': (1, 2)}}, got {result}. "
        "Hint: When a key exists in both but values differ, store (a_val, b_val)"
    )


def test_dict_diff_key_only_in_a():
    result = dict_diff({"a": 1, "b": 2}, {"a": 1})
    assert result == {"b": (2, None)}, (
        "dict_diff should report keys only in dict_a with None as b_value. "
        f"Expected {{'b': (2, None)}}, got {result}. "
        "Hint: If a key is missing from dict_b, use None as the second tuple element"
    )


def test_dict_diff_identical_dicts():
    result = dict_diff({"a": 1}, {"a": 1})
    assert result == {}, (
        "dict_diff with identical dicts should return {}. "
        f"Expected {{}}, got {result}. "
        "Hint: No differences means an empty result dict"
    )


def test_dict_diff_both_empty():
    result = dict_diff({}, {})
    assert result == {}, (
        "dict_diff({}, {}) should return {}. "
        f"Expected {{}}, got {result}. "
        "Hint: Two empty dicts have no differences"
    )


def test_dict_diff_ignores_keys_only_in_b():
    result = dict_diff({"a": 1}, {"a": 1, "b": 99})
    assert result == {}, (
        "dict_diff should ignore keys that only exist in dict_b. "
        f"Expected {{}}, got {result}. "
        "Hint: Only iterate over dict_a's keys"
    )
