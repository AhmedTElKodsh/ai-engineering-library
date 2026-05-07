"""
Day 08: Error Handling & Custom Exceptions
bugs are inevitable — how you handle them separates amateurs from professionals

Learning Objectives:
- Use try/except/else/finally blocks effectively
- Create custom exception classes with additional attributes
- Chain exceptions to preserve error context
- Implement retry logic for flaky operations
- Build validation pipelines with meaningful error messages

Concepts: try/except/else/finally, custom exceptions, exception chaining, EAFP
Builds On: Day 05 — control flow, Day 06 — functions and scope
Prepares For: Day 09 — context managers, Day 10 — OOP
"""

# ── Difficulty ──────────────────────────────
# Level: ★★☆☆☆ (2/5)
# Estimated Time: 35 min


# ── Custom Exceptions ──────────────────────
# Define these BEFORE the functions that use them.

class ValidationError(Exception):
    """Raised when input validation fails.

    Attributes:
        field: the name of the field that failed validation
        message: a human-readable description of the failure
    """

    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")


class CalculationError(Exception):
    """Raised when a mathematical calculation cannot be performed.

    Attributes:
        operation: the operation that failed (e.g. "division")
        reason: why it failed
    """

    def __init__(self, operation: str, reason: str):
        self.operation = operation
        self.reason = reason
        super().__init__(f"{operation} failed: {reason}")


# ── safe_divide ────────────────────────────
def safe_divide(a, b):
    """Safely divide a by b with proper error handling.

    Args:
        a: the numerator (must be int or float)
        b: the denominator (must be int or float, non-zero)

    Returns:
        The result of a / b as a float

    Raises:
        TypeError: if either argument is not a number (int or float)
        CalculationError: if b is zero (operation="division", reason="division by zero")

    Pseudocode:
        1. Check if both a and b are int or float — raise TypeError if not
        2. Check if b is zero — raise CalculationError if so
        3. Return a / b
    """
    pass  # YOUR CODE HERE


# ── validate_user ──────────────────────────
def validate_user(user_data: dict) -> dict:
    """Validate a user data dictionary.

    Args:
        user_data: a dict that must contain "name" (non-empty str)
                   and "age" (int, 0-150)

    Returns:
        The validated user_data dict (unchanged)

    Raises:
        ValidationError: with field="name" if name is missing or empty
        ValidationError: with field="age" if age is missing, not an int,
                        or outside 0-150

    Pseudocode:
        1. Check if "name" key exists and its value is a non-empty string
           — raise ValidationError(field="name", ...) if not
        2. Check if "age" key exists
           — raise ValidationError(field="age", ...) if not
        3. Check if age is an int (not bool!) and between 0 and 150
           — raise ValidationError(field="age", ...) if not
        4. Return user_data
    """
    pass  # YOUR CODE HERE


# ── process_records ────────────────────────
def process_records(records: list[dict]) -> dict:
    """Process a list of records, collecting successes and failures.

    Each record is a dict with a "value" key containing a numeric string.
    Convert each value to a float. If conversion fails, record the error.

    Args:
        records: list of dicts, each with a "value" key

    Returns:
        A dict with:
        - "successes": list of successfully converted floats
        - "failures": list of dicts with "index" and "error" keys

    Pseudocode:
        1. Create empty lists for successes and failures
        2. Loop through records with enumerate for the index
        3. Try to convert record["value"] to float
        4. On success, append to successes
        5. On ValueError or KeyError, append {"index": i, "error": str(e)} to failures
        6. Return the result dict
    """
    pass  # YOUR CODE HERE


# ── retry_operation ────────────────────────
def retry_operation(func, max_retries: int = 3) -> any:
    """Retry a function up to max_retries times on exception.

    Args:
        func: a callable that takes no arguments
        max_retries: maximum number of attempts (must be >= 1)

    Returns:
        The return value of func() on the first successful call

    Raises:
        ValueError: if max_retries < 1
        The last exception raised by func if all retries fail

    Pseudocode:
        1. Validate max_retries >= 1 — raise ValueError if not
        2. Track the last exception
        3. Loop max_retries times
        4. Try calling func() — return its result on success
        5. On any Exception, store it as last_exception and continue
        6. After the loop, raise the last_exception
    """
    pass  # YOUR CODE HERE


# ── build_error_report ─────────────────────
def build_error_report(operations: list[tuple]) -> dict:
    """Execute operations and build an error report.

    Each operation is a tuple of (name: str, func: callable).
    Call each func() and categorize the result.

    Args:
        operations: list of (name, callable) tuples

    Returns:
        A dict with:
        - "passed": list of operation names that succeeded
        - "failed": list of dicts with "name" and "error_type" keys,
          where error_type is the exception class name (e.g. "ValueError")

    Pseudocode:
        1. Create empty lists for passed and failed
        2. For each (name, func) in operations:
           a. Try calling func()
           b. On success, append name to passed
           c. On exception, append {"name": name, "error_type": type(e).__name__}
              to failed
        3. Return the result dict
    """
    pass  # YOUR CODE HERE
