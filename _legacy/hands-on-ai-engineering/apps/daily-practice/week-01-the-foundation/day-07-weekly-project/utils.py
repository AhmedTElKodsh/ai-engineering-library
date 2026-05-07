"""
Day 07: Student Grade Analyzer — Utility Functions
helper functions for formatting and validation

Concepts: string formatting, type checking, validation
Builds On: Day 01 — types, Day 02 — strings, Day 05 — control flow
"""


def validate_score(score: object) -> float:
    """
    Validate that a score is a number between 0 and 100 inclusive.

    Args:
        score: a value to validate as a score

    Returns:
        The score as a float if valid

    Raises:
        TypeError: if score is not int or float
        ValueError: if score is outside 0-100 range

    Pseudocode:
        1. Check if score is a number (int or float, but not bool)
        2. Raise TypeError if not a number
        3. Check if score is between 0 and 100
        4. Raise ValueError if out of range
        5. Return score as float
    """
    pass  # YOUR CODE HERE


def format_percentage(value: float, decimals: int = 1) -> str:
    """
    Format a float as a percentage string.

    Args:
        value: a number to format (e.g., 85.678)
        decimals: number of decimal places (default 1)

    Returns:
        Formatted string like "85.7%"

    Pseudocode:
        1. Round the value to the specified decimal places
        2. Format as string with percent sign
        3. Return the formatted string
    """
    pass  # YOUR CODE HERE


def format_student_row(name: str, grade: str, average: float) -> str:
    """
    Format a student's data as a fixed-width table row.

    Args:
        name: student name (left-aligned, 20 chars wide)
        grade: letter grade (centered, 5 chars wide)
        average: numeric average (right-aligned, 8 chars wide, 1 decimal)

    Returns:
        Formatted string like "Alice               |  A  |    92.5"

    Pseudocode:
        1. Left-align name in 20 characters
        2. Center grade in 5 characters
        3. Right-align average (1 decimal) in 8 characters
        4. Join with " | " separator
        5. Return the formatted row
    """
    pass  # YOUR CODE HERE
