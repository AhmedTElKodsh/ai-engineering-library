"""
Day 12: Comprehensions & Generators
comprehensions are Python's one-liners — generators make them lazy and memory-efficient

Learning Objectives:
- Write list, dict, and set comprehensions with filtering
- Understand generator expressions vs list comprehensions
- Build generator functions with yield
- Chain generators into processing pipelines

Concepts: list/dict/set comprehensions, generator expressions, yield, pipelines
Builds On: Day 03 — lists, Day 04 — dicts and sets, Day 06 — functions
Prepares For: Day 13 — unpacking and Pythonic patterns, Day 14 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 35 min


# ── Comprehension Exercises ─────────────────

def transform_data(records: list[dict]) -> dict[str, float]:
    """Transform a list of records into a name->score dict using dict comprehension.

    Each record has "name" (str) and "score" (int/float) keys.
    Only include records where score >= 60.
    Convert each name to uppercase in the result.

    Args:
        records: list of dicts like [{"name": "alice", "score": 85}, ...]

    Returns:
        Dict mapping uppercase names to scores for passing records.
        e.g. {"ALICE": 85}

    Pseudocode:
        1. Use a dict comprehension:
           {record["name"].upper(): record["score"]
            for record in records
            if record["score"] >= 60}
    """
    pass  # YOUR CODE HERE


def matrix_operations(matrix: list[list[int]]) -> dict:
    """Perform operations on a matrix (list of lists) using comprehensions.

    Args:
        matrix: a 2D list of integers, e.g. [[1, 2], [3, 4]]

    Returns:
        A dict with:
        - "flat": flattened list [1, 2, 3, 4]
        - "transposed": transposed matrix [[1, 3], [2, 4]]
        - "row_sums": sum of each row [3, 7]

    Pseudocode:
        flat: [n for row in matrix for n in row]
        transposed: [[row[i] for row in matrix] for i in range(len(matrix[0]))]
        row_sums: [sum(row) for row in matrix]
    """
    pass  # YOUR CODE HERE


def word_statistics(text: str) -> dict:
    """Compute word statistics using comprehensions.

    Args:
        text: a string of words separated by spaces

    Returns:
        A dict with:
        - "word_lengths": dict mapping each unique lowercase word to its length
        - "unique_lengths": sorted list of unique word lengths
        - "long_words": sorted list of words with length > 4 (lowercase)

    Pseudocode:
        1. Split text into words, convert to lowercase
        2. word_lengths: {word: len(word) for word in unique_words}
        3. unique_lengths: sorted({len(w) for w in words})
        4. long_words: sorted([w for w in unique_words if len(w) > 4])
    """
    pass  # YOUR CODE HERE


# ── Generator Exercises ────────────────────

def fibonacci(n: int):
    """Generate the first n Fibonacci numbers.

    Args:
        n: how many Fibonacci numbers to generate (n >= 0)

    Yields:
        The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...

    Pseudocode:
        1. Handle n <= 0: return immediately
        2. Initialize a, b = 0, 1
        3. Loop n times:
           a. Yield a
           b. Update: a, b = b, a + b
    """
    pass  # YOUR CODE HERE


def filter_pipeline(data: list[dict], filters: list) -> list:
    """Apply a sequence of filter functions to data using generators.

    Each filter is a callable that takes a dict and returns True to keep it.

    Args:
        data: list of dicts to filter
        filters: list of callables, each takes a dict → bool

    Returns:
        List of dicts that pass ALL filters

    Pseudocode:
        1. Create a generator that yields items from data
        2. For each filter function, create a new generator that only
           yields items where filter(item) is True
        3. Convert the final generator to a list and return
    """
    pass  # YOUR CODE HERE


def batch_processor(items: list, batch_size: int):
    """Yield items in batches (chunks) using a generator.

    Args:
        items: the list to process in batches
        batch_size: number of items per batch (must be >= 1)

    Yields:
        Lists of up to batch_size items.
        The last batch may be smaller.

    Pseudocode:
        1. Loop from 0 to len(items) with step batch_size
        2. Yield items[i:i+batch_size]
    """
    pass  # YOUR CODE HERE
