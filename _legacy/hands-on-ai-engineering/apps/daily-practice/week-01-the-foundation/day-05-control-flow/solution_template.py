"""
Day 05 — Control Flow
=====================
You've learned to store and organize data — now teach your code to make decisions.

Difficulty: ★★☆☆☆ (2/5)  |  Time: ~30 min

Builds On:
    - Day 01 — variables and types
    - Day 03 — lists and tuples

Prepares For:
    - Day 06 — functions and scope
    - Day 07 — weekly project

Concepts:
    if/elif/else, for loops, while loops, break/continue, nested loops
"""


# ── FizzBuzz ─────────────────────────────────────────────────────────
def fizzbuzz(n: int) -> list[str]:
    """Classic fizzbuzz from 1 to n inclusive.

    Rules:
        - Divisible by 3 and 5 -> "FizzBuzz"
        - Divisible by 3 only  -> "Fizz"
        - Divisible by 5 only  -> "Buzz"
        - Otherwise            -> the number as a string
    """
    pass  # YOUR CODE HERE


# ── Collatz Steps ────────────────────────────────────────────────────
def collatz_steps(n: int) -> int:
    """Count steps to reach 1 in the Collatz sequence.

    Rules:
        - If n is even: n = n // 2
        - If n is odd:  n = 3 * n + 1
        - Count each step until n == 1
    """
    pass  # YOUR CODE HERE


# ── Is Palindrome ────────────────────────────────────────────────────
def is_palindrome(text: str) -> bool:
    """Check if string is a palindrome (case-insensitive, ignore spaces)."""
    pass  # YOUR CODE HERE


# ── Find Primes ──────────────────────────────────────────────────────
def find_primes(limit: int) -> list[int]:
    """Return all prime numbers up to and including limit."""
    pass  # YOUR CODE HERE


# ── Matrix Sum ───────────────────────────────────────────────────────
def matrix_sum(matrix: list[list[int]]) -> int:
    """Sum all elements in a 2D matrix using nested loops."""
    pass  # YOUR CODE HERE
