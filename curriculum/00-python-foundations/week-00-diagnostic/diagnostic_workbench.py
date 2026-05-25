"""
Week 00: Python Confidence Inventory
Before the journey begins, see where you stand.

This is a diagnostic assessment, not a test you need to pass.
Run it now to see your strengths and gaps across six Python skill areas.
Run it again after the refresher path to see how far you have come.

Skill Areas Assessed:
- Fundamentals: variables, types, operators
- Data Structures: lists, dicts, sets, tuples
- Functions: parameters, returns, scope, closures
- OOP: classes, inheritance, magic methods
- Pythonic Patterns: comprehensions, generators, unpacking
- Error Handling: try/except, custom exceptions, context managers

Concepts: self-assessment, diagnostic, all topics
Builds On: none
Prepares For: Week 01 Python Essentials
"""

# Difficulty
# Level: 3/5
# Estimated Time: 15-20 min
# Note: You are NOT expected to pass everything. That's the point.


# Fundamentals

def swap_without_temp(a: int, b: int) -> tuple[int, int]:
    """
    Swap two values without using a temporary variable.

    Args:
        a: first integer
        b: second integer

    Returns:
        A tuple of (b, a)

    Examples:
        - swap_without_temp(1, 2) -> (2, 1)
        - swap_without_temp(10, 20) -> (20, 10)

    Pseudocode:
        1. Return both values in swapped order using tuple packing
    """
    (d,c) = (a,b)
    return (b, a)


def is_even_and_positive(n: int) -> bool:
    """
    Check if a number is both even and positive.

    Args:
        n: an integer to check

    Returns:
        True if n is even AND positive, False otherwise

    Examples:
        - is_even_and_positive(4) -> True
        - is_even_and_positive(-2) -> False
        - is_even_and_positive(3) -> False

    Pseudocode:
        1. Check if n is greater than 0
        2. Check if n is divisible by 2 (no remainder)
        3. Return True only if both conditions are met
    """
    return n > 0 and n % 2 == 0


# Data Structures

def flatten_list(nested: list[list]) -> list:
    """
    Flatten a list of lists into a single list.

    Args:
        nested: a list where each element is itself a list

    Returns:
        A single flat list containing all elements

    Examples:
        - flatten_list([[1, 2], [3, 4]]) -> [1, 2, 3, 4]
        - flatten_list([[1], [], [2, 3]]) -> [1, 2, 3]

    Pseudocode:
        1. Create an empty result list
        2. For each sublist in the nested list
        3. Extend the result with elements from the sublist
        4. Return the result
    """
    # flattened = []
    # for list in nested:
    #     for el in list:
    #         flattened.append(el)
    # return flattened
    return [el for list in nested for el in list]


def count_words(text: str) -> dict[str, int]:
    """
    Count occurrences of each word in a text (case-insensitive).

    Args:
        text: a string of words separated by spaces

    Returns:
        A dictionary mapping lowercase words to their counts

    Examples:
        - count_words("Hello world hello") -> {"hello": 2, "world": 1}
        - count_words("Python is fun") -> {"python": 1, "is": 1, "fun": 1}

    Pseudocode:
        1. Convert text to lowercase
        2. Split into words
        3. Count each word using a dictionary
        4. Return the counts dictionary
    """
    text=text.lower().split()
    dictw={}

    for word in text:
        if word in dictw:
            dictw[word]+=1
        else:
            dictw[word]=1

    return dictw


def unique_elements(items: list) -> list:
    """
    Return unique elements preserving original order.

    Args:
        items: a list that may contain duplicates

    Returns:
        A list with duplicates removed, order preserved

    Examples:
        - unique_elements([1, 2, 2, 3, 1]) -> [1, 2, 3]
        - unique_elements(["a", "b", "a", "c"]) -> ["a", "b", "c"]

    Pseudocode:
        1. Track seen elements with a set
        2. Build result list, adding only unseen elements
        3. Return the result
    """
    pass  # YOUR CODE HERE

# Functions

def make_multiplier(factor: int):
    """
    Return a function that multiplies its input by factor.

    Args:
        factor: the number to multiply by

    Returns:
        A function that takes one argument and returns it multiplied by factor

    Examples:
        - double = make_multiplier(2); double(5) -> 10
        - triple = make_multiplier(3); triple(4) -> 12

    Pseudocode:
        1. Define an inner function that takes one argument
        2. Return the argument multiplied by factor
        3. Return the inner function
    """
    pass  # YOUR CODE HERE


def apply_to_all(func, items: list) -> list:
    """
    Apply a function to every item in a list.

    Args:
        func: a callable that takes one argument
        items: a list of values

    Returns:
        A new list with func applied to each element

    Examples:
        - apply_to_all(str, [1, 2]) -> ["1", "2"]
        - apply_to_all(lambda x: x*2, [1, 2]) -> [2, 4]

    Pseudocode:
        1. Create a new list by calling func on each item
        2. Return the new list
    """
    pass  # YOUR CODE HERE


# OOP

class Counter:
    """
    A simple counter that can increment, decrement, and reset.

    Attributes:
        count (int): the current count value

    Examples:
        - c = Counter(5); c.increment(); str(c) -> "Counter(6)"
        - c = Counter(1); c.decrement(); c.decrement(); str(c) -> "Counter(0)"

    Pseudocode:
        - __init__: set count to start value (default 0)
        - increment: add 1 to count
        - decrement: subtract 1 from count (minimum 0)
        - reset: set count back to 0
        - __str__: return "Counter(N)" where N is current count
    """

    def __init__(self, start: int = 0) -> None:
        """Initialize Counter with a starting value."""
        pass  # YOUR CODE HERE

    def increment(self) -> None:
        """Add 1 to the counter."""
        pass  # YOUR CODE HERE

    def decrement(self) -> None:
        """Subtract 1 from the counter (minimum 0)."""
        pass  # YOUR CODE HERE

    def reset(self) -> None:
        """Reset the counter to 0."""
        pass  # YOUR CODE HERE

    def __str__(self) -> str:
        """Return string representation like 'Counter(5)'."""
        pass  # YOUR CODE HERE


# Pythonic Patterns

def even_squares(numbers: list[int]) -> list[int]:
    """
    Return squares of even numbers using a list comprehension.

    Args:
        numbers: a list of integers

    Returns:
        A list of squared values for only the even numbers

    Examples:
        - even_squares([1, 2, 3, 4]) -> [4, 16]
        - even_squares([5, 7, 9]) -> []

    Pseudocode:
        1. Use a list comprehension
        2. Filter for even numbers
        3. Square each even number
        4. Return the result
    """
    pass  # YOUR CODE HERE


def first_n_fibonacci(n: int) -> list[int]:
    """
    Generate the first n Fibonacci numbers.

    Args:
        n: how many Fibonacci numbers to generate (n >= 1)

    Returns:
        A list of the first n Fibonacci numbers starting with [0, 1, 1, 2, ...]

    Examples:
        - first_n_fibonacci(5) -> [0, 1, 1, 2, 3]
        - first_n_fibonacci(1) -> [0]

    Pseudocode:
        1. Start with [0] if n == 1, [0, 1] if n >= 2
        2. Loop until you have n numbers
        3. Each new number is sum of previous two
        4. Return the list
    """
    pass  # YOUR CODE HERE


# Error Handling

def safe_divide(a: float, b: float) -> float | str:
    """
    Divide a by b, returning an error message if b is zero.

    Args:
        a: the dividend
        b: the divisor

    Returns:
        The result of a / b, or "Error: division by zero" if b is 0

    Examples:
        - safe_divide(10, 2) -> 5.0
        - safe_divide(10, 0) -> "Error: division by zero"

    Pseudocode:
        1. Try to divide a by b
        2. If ZeroDivisionError occurs, return the error message string
        3. Otherwise return the result
    """
    pass  # YOUR CODE HERE


def validate_age(age) -> int:
    """
    Validate and return an age value, raising appropriate errors.

    Args:
        age: a value that should be a positive integer

    Returns:
        The validated age as an integer

    Raises:
        TypeError: if age is not an integer
        ValueError: if age is negative or zero

    Examples:
        - validate_age(25) -> 25
        - validate_age(-5) !! raises ValueError
        - validate_age("25") !! raises TypeError

    Pseudocode:
        1. Check if age is an integer (not bool); raise TypeError if not
        2. Check if age is positive; raise ValueError if not
        3. Return the validated age
    """
    pass  # YOUR CODE HERE


# Diagnostic Test Runner

if __name__ == "__main__":
    import sys

    def run_test(name, func, args, expected):
        try:
            result = func(*args) if isinstance(args, tuple) else func(args)
            if result == expected:
                print(f"PASS {name}")
            else:
                print(f"FAIL {name} (Expected {expected}, got {result})")
        except NotImplementedError:
             print(f"TODO {name}")
        except Exception as e:
            if type(e).__name__ == expected:
                print(f"PASS {name} (Raised {expected})")
            else:
                print(f"ERROR {name} ({type(e).__name__}: {e})")

    print("\n--- Running Python Confidence Inventory ---")
    
    # We use a wrapper to handle functions that are just 'pass'
    def wrap(f):
        def inner(*args, **kwargs):
            res = f(*args, **kwargs)
            # Check for NotImplementedError based on 'pass' or common initial patterns
            if res is None and f.__name__ != "__init__":
                raise NotImplementedError
            return res
        return inner

    # Test cases
    tests = [
        ("Swap (1, 2)", wrap(swap_without_temp), (1, 2), (2, 1)),
        ("Even/Positive (4)", wrap(is_even_and_positive), 4, True),
        ("Even/Positive (-2)", wrap(is_even_and_positive), -2, False),
        ("Flatten [[1, 2], [3]]", wrap(flatten_list), [[1, 2], [3]], [1, 2, 3]),
        ("Count Words 'a B a'", wrap(count_words), "a B a", {"a": 2, "b": 1}),
        ("Unique [1, 1, 2]", wrap(unique_elements), [1, 1, 2], [1, 2]),
        ("Multiplier (2x5)", lambda x: wrap(make_multiplier)(2)(x), 5, 10),
        ("ApplyToAll (str, [1])", wrap(apply_to_all), (str, [1]), ["1"]),
        ("Even Squares [1, 2, 4]", wrap(even_squares), [1, 2, 4], [4, 16]),
        ("Fibonacci (5)", wrap(first_n_fibonacci), 5, [0, 1, 1, 2, 3]),
        ("Safe Divide (10/2)", wrap(safe_divide), (10, 2), 5.0),
        ("Safe Divide (10/0)", wrap(safe_divide), (10, 0), "Error: division by zero"),
        ("Validate Age (25)", wrap(validate_age), 25, 25),
        ("Validate Age (-1)", wrap(validate_age), -1, "ValueError"),
        ("Validate Age ('25')", wrap(validate_age), "25", "TypeError"),
    ]

    for name, func, args, expected in tests:
        run_test(name, func, args, expected)
    
    # Special test for Counter
    try:
        c = Counter(5)
        c.increment()
        if str(c) == "Counter(6)":
             print("PASS Counter")
        else:
             raise Exception(f"Expected Counter(6), got {str(c)}")
    except NotImplementedError:
        print("TODO Counter")
    except Exception as e:
        print(f"ERROR Counter ({type(e).__name__}: {e})")

    print("\n-------------------------------------------")
