"""
Day 04: Dictionaries and Sets
lists store things in order — dictionaries let you find them by name

Learning Objectives:
- Merge two dictionaries with conflict resolution
- Invert a dictionary's keys and values
- Use set intersection to find common elements
- Group items by a computed property
- Compute the diff between two dictionaries

Concepts: dictionaries, sets, dict methods, set operations, dict comprehension
Builds On: Day 01 — variables and types, Day 03 — lists and tuples
Prepares For: Day 06 — functions and scope, Day 07 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★☆☆☆ (2/5)
# Estimated Time: 30 min

# ── Data Flow ──────────────────────────────
# Input:  Dictionaries and lists of various elements
# Process: Merge, invert, intersect, group, and diff key-value data
# Output: Transformed dicts, sorted lists, or grouped structures


def merge_dicts(dict_a: dict, dict_b: dict) -> dict:
    """
    Merge two dictionaries; dict_b values override dict_a on key conflicts.

    Args:
        dict_a: the base dictionary
        dict_b: the overriding dictionary

    Returns:
        A new dictionary containing all keys from both; dict_b wins on conflict

    Pseudocode:
        1. Create a copy of dict_a (so you don't mutate the original)
        2. Update the copy with all key-value pairs from dict_b
        3. Return the merged copy
    """
    pass  # YOUR CODE HERE


def invert_dict(d: dict) -> dict:
    """
    Swap keys and values in a dictionary.

    Args:
        d: a dictionary whose values are unique and hashable

    Returns:
        A new dictionary with original values as keys and original keys as values

    Pseudocode:
        1. Iterate over d.items() to get each (key, value) pair
        2. Build a new dict mapping value → key for each pair
        3. Return the inverted dict (a dict comprehension works well here)
    """
    pass  # YOUR CODE HERE


def common_elements(list_a: list, list_b: list) -> list:
    """
    Return a sorted list of elements that appear in both input lists.

    Args:
        list_a: the first list
        list_b: the second list

    Returns:
        A sorted list of elements common to both lists (duplicates removed)

    Pseudocode:
        1. Convert both lists to sets
        2. Use set intersection (&) to find shared elements
        3. Convert the result to a sorted list and return it
    """
    pass  # YOUR CODE HERE


def group_by_length(words: list[str]) -> dict[int, list[str]]:
    """
    Group a list of words by their character length.

    Args:
        words: a list of strings

    Returns:
        A dict mapping each length (int) to a list of words with that length,
        in the order they appeared in the input

    Pseudocode:
        1. Create an empty result dict
        2. For each word, compute its length
        3. If that length key doesn't exist yet, initialise it to an empty list
        4. Append the word to the list at that length key
        5. Return the result dict
    """
    pass  # YOUR CODE HERE


def dict_diff(dict_a: dict, dict_b: dict) -> dict:
    """
    Return the differences between two dictionaries from dict_a's perspective.

    Only keys present in dict_a are considered:
    - If a key exists in both but values differ → include as (a_value, b_value)
    - If a key exists only in dict_a → include as (a_value, None)
    - Keys only in dict_b are ignored

    Args:
        dict_a: the reference dictionary
        dict_b: the dictionary to compare against

    Returns:
        A dict of {key: (a_value, b_value_or_None)} for all differing/missing keys

    Pseudocode:
        1. Create an empty result dict
        2. For each key in dict_a:
            a. If the key is not in dict_b → add {key: (a_value, None)}
            b. If the key is in dict_b but values differ → add {key: (a_val, b_val)}
        3. Return the result dict
    """
    pass  # YOUR CODE HERE
