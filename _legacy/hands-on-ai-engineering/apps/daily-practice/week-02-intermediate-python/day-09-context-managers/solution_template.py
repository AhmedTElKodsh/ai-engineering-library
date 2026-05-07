"""
Day 09: Context Managers & Resource Management
the `with` statement isn't magic — it's a protocol you can implement yourself

Learning Objectives:
- Build class-based context managers with __enter__ and __exit__
- Understand exception handling inside __exit__
- Use contextlib for lightweight context managers
- Implement real-world patterns: timing, transactions, suppression

Concepts: with statement, __enter__/__exit__, contextlib, custom context managers
Builds On: Day 06 — functions and scope, Day 08 — error handling
Prepares For: Day 10 — OOP, Day 14 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 35 min

import time


class Timer:
    """A context manager that measures the elapsed time of a block.

    After the block completes, `self.elapsed` holds the time in seconds.

    Usage:
        with Timer() as t:
            do_something()
        print(t.elapsed)   # e.g. 0.0042

    Pseudocode:
        __enter__:
            1. Record the start time using time.time()
            2. Return self (so the `as` variable refers to this Timer)

        __exit__:
            1. Calculate elapsed = current time - start time
            2. Store it in self.elapsed
            3. Return False (don't suppress exceptions)
    """

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


class Indenter:
    """A context manager that tracks indentation level for nested output.

    Each nested `with` block increases the indent level by one.
    The `print` method outputs text with the correct indentation
    (using 2 spaces per level).

    Usage:
        ind = Indenter()
        with ind:
            ind.print("level 1")       # "  level 1"
            with ind:
                ind.print("level 2")   # "    level 2"
            ind.print("back to 1")     # "  back to 1"

    Pseudocode:
        __init__: set self.level = 0

        __enter__:
            1. Increment self.level by 1
            2. Return self

        __exit__:
            1. Decrement self.level by 1
            2. Return False

        print(text):
            1. Build prefix = "  " * self.level
            2. Print prefix + text
    """

    def __init__(self):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE

    def print(self, text: str) -> str:
        """Return the indented text string (also prints it).

        Returns the string so tests can verify the output.
        """
        pass  # YOUR CODE HERE


class TempValue:
    """A context manager that temporarily replaces an attribute on an object.

    On enter, it saves the old value and sets the new one.
    On exit, it restores the original value.

    Usage:
        class Config:
            debug = False

        cfg = Config()
        with TempValue(cfg, "debug", True):
            print(cfg.debug)   # True
        print(cfg.debug)       # False (restored)

    Pseudocode:
        __init__(obj, attr_name, temp_value):
            1. Store obj, attr_name, temp_value
            2. Don't read old_value yet (wait for __enter__)

        __enter__:
            1. Save the current value: self.old_value = getattr(self.obj, self.attr_name)
            2. Set the temporary value: setattr(self.obj, self.attr_name, self.temp_value)
            3. Return self

        __exit__:
            1. Restore the original value: setattr(self.obj, self.attr_name, self.old_value)
            2. Return False
    """

    def __init__(self, obj, attr_name: str, temp_value):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


class Suppress:
    """A context manager that suppresses specified exception types.

    If an exception of the given type(s) is raised inside the block,
    it is caught and stored in self.exception. Other exception types
    propagate normally.

    Usage:
        s = Suppress(ValueError, TypeError)
        with s:
            int("abc")     # ValueError is suppressed
        print(s.exception) # the ValueError instance

    Pseudocode:
        __init__(*exception_types):
            1. Store the exception types as a tuple
            2. Initialize self.exception = None

        __enter__:
            1. Reset self.exception to None
            2. Return self

        __exit__(exc_type, exc_val, exc_tb):
            1. If exc_type is one of our suppressed types:
               a. Store exc_val in self.exception
               b. Return True (suppress the exception)
            2. Otherwise return False (let it propagate)
    """

    def __init__(self, *exception_types):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


class Transaction:
    """A context manager for a simple rollback-able transaction.

    Maintains a list of operations. If the block completes without error,
    the transaction is committed. If an exception occurs, all operations
    are rolled back in reverse order.

    Usage:
        log = []
        t = Transaction()
        t.add_operation(
            do=lambda: log.append("inserted"),
            undo=lambda: log.remove("inserted")
        )
        with t:
            t.execute()    # runs all do functions
        # on success: committed
        # on error: undo functions run in reverse order

    Pseudocode:
        __init__:
            1. self.operations = []   (list of {"do": fn, "undo": fn} dicts)
            2. self.committed = False
            3. self.executed = []      (track which operations ran)

        add_operation(do, undo):
            1. Append {"do": do, "undo": undo} to self.operations

        execute:
            1. For each operation in self.operations:
               a. Call operation["do"]()
               b. Append the operation to self.executed

        __enter__:
            1. Reset committed, executed
            2. Return self

        __exit__(exc_type, exc_val, exc_tb):
            1. If no exception (exc_type is None):
               a. Set self.committed = True
            2. If exception occurred:
               a. Roll back: call undo() for each executed operation (in reverse)
               b. Set self.committed = False
            3. Return False (don't suppress the exception)
    """

    def __init__(self):
        pass  # YOUR CODE HERE

    def add_operation(self, do, undo):
        pass  # YOUR CODE HERE

    def execute(self):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE
