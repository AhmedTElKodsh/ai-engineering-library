"""
Day 02: Strings and Formatting
yesterday you gave Python values names — today you'll teach them to speak

Learning Objectives:
- Reverse strings using slice notation
- Count specific characters with case-insensitive matching
- Build title case manually without using .title()
- Extract subsets of characters from mixed strings
- Format output with f-strings

Concepts: strings, f-strings, string methods, slicing, formatting
Builds On: Day 01 — variables and types
Prepares For: Day 04 — dictionaries and sets, Day 08 — file I/O

💡 STUCK? Check hints.md in this folder for progressive hints!
"""

# ── Difficulty ──────────────────────────────
# Level: ★☆☆☆☆ (1/5)
# Estimated Time: 25 min

# ── Data Flow ──────────────────────────────
# Input:  Raw strings and formatting parameters
# Process: Slice, scan, split, join, and format strings
# Output: Transformed or formatted strings


def reverse_string(text: str) -> str:
    """
    Reverse a string using slicing.

    Args:
        text: the string to reverse

    Returns:
        The reversed string

    Pseudocode:
        1. Use slice notation with a step of -1 to reverse the string
    """
    pass  # YOUR CODE HERE 


def count_vowels(text: str) -> int:
    """
    Count the number of vowels (a, e, i, o, u) in a string, case-insensitively.

    Args:
        text: the string to scan for vowels

    Returns:
        The count of vowel characters

    Pseudocode:
        1. Convert the string to lowercase
        2. Count how many characters are in the set of vowels "aeiou"
        3. Return the total count
    """
    pass  # YOUR CODE HERE


def title_case(text: str) -> str:
    """
    Convert a string to title case WITHOUT using the built-in .title() method.

    Args:
        text: the string to convert

    Returns:
        The string with the first letter of each word capitalized

    Pseudocode:
        1. Split the text into a list of words using space as the delimiter
        2. For each word, capitalize the first letter and lowercase the rest
        3. Join the processed words back into a single string with spaces
        4. Return the title-cased string
    """
    pass  # YOUR CODE HERE


def extract_digits(text: str) -> str:
    """
    Extract only the digit characters from a string.

    Args:
        text: a string potentially containing digits and other characters

    Returns:
        A string containing only the digit characters, in order

    Pseudocode:
        1. Filter each character in the string using the isdigit() method
        2. Join only the digit characters into a new string
        3. Return the string of digits
    """
    pass  # YOUR CODE HERE


def format_greeting(name: str, age: int, city: str) -> str:
    """
    Build a formatted greeting string using an f-string.

    Args:
        name: the person's name
        age: the person's age
        city: the person's city

    Returns:
        A string: "Hello, {name}! You are {age} years old and live in {city}."

    Pseudocode:
        1. Use an f-string to interpolate the name, age, and city into the greeting
        2. Return the formatted string
    """
    pass  # YOUR CODE HERE
