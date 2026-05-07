# Day 09: Context Managers & Resource Management

> the `with` statement isn't magic — it's a protocol you can implement yourself

**Concepts:** with statement, `__enter__`/`__exit__`, contextlib, custom context managers | **Difficulty:** ★★★☆☆ | **Time:** ~35 min
**Builds On:** Day 06 — functions and scope, Day 08 — error handling
**Prepares For:** Day 10 — OOP, Day 14 — weekly project

## Your Task

Build five context managers: a timer that measures execution time, an indentation tracker for nested output, a temporary value swapper, a suppressor for specific exceptions, and a transaction manager that supports rollback.

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Context Managers

### Why Context Managers?

Every time you open a file, connect to a database, or acquire a lock, you need to clean up afterward. Forgetting to clean up leads to resource leaks, corrupted data, and hard-to-debug issues.

Context managers automate cleanup using the `with` statement:

```python
# Without context manager — risky!
f = open("data.txt")
data = f.read()
f.close()               # What if an exception happens before this?

# With context manager — guaranteed cleanup
with open("data.txt") as f:
    data = f.read()
# f.close() is called automatically, even if an exception occurs
```

### The Protocol: `__enter__` and `__exit__`

Any object with `__enter__` and `__exit__` methods can be used with `with`:

```python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, "r")
        return self.file        # this is what `as` binds to

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False            # don't suppress exceptions

# Usage
with ManagedFile("data.txt") as f:
    contents = f.read()
```

**The `__exit__` parameters:**
- `exc_type`: the exception class (or None if no exception)
- `exc_val`: the exception instance (or None)
- `exc_tb`: the traceback object (or None)
- Return `True` to suppress the exception, `False` to let it propagate

### The contextlib Shortcut

For simple context managers, use the `@contextmanager` decorator instead of writing a class:

```python
from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    yield                    # everything before yield is __enter__
    elapsed = time.time() - start
    print(f"{label}: {elapsed:.4f}s")
    # everything after yield is __exit__

with timer("database query"):
    result = run_query()
```

The `yield` splits the function into two halves:
- Before `yield`: runs when entering the `with` block
- After `yield`: runs when exiting the `with` block

### Handling Exceptions in contextlib

```python
@contextmanager
def safe_operation(name):
    print(f"Starting {name}")
    try:
        yield
    except Exception as e:
        print(f"{name} failed: {e}")
        raise                    # re-raise after logging
    finally:
        print(f"Cleaning up {name}")
```

### Built-in Context Managers

```python
# File I/O
with open("file.txt", "w") as f:
    f.write("hello")

# Suppressing exceptions
from contextlib import suppress
with suppress(FileNotFoundError):
    os.remove("temp.txt")        # no error if file doesn't exist

# Temporary directory
import tempfile
with tempfile.TemporaryDirectory() as tmpdir:
    # tmpdir is auto-deleted when we exit

# Thread locks
import threading
lock = threading.Lock()
with lock:
    # critical section — lock auto-released
    shared_data.append(item)
```

### Nesting Context Managers

```python
# Multiple resources
with open("input.txt") as fin, open("output.txt", "w") as fout:
    fout.write(fin.read().upper())

# Or with contextlib.ExitStack for dynamic nesting
from contextlib import ExitStack

with ExitStack() as stack:
    files = [stack.enter_context(open(f)) for f in filenames]
    # all files auto-closed when we exit
```

### Try This!

1. Write a context manager that prints "START" on entry and "END" on exit.
2. Write a `suppress_errors` context manager that catches and logs any exception.
3. Use `@contextmanager` to create a `working_directory` that temporarily changes `os.getcwd()`.

---

## Cheatsheet

| Approach | When to Use |
|----------|-------------|
| Class with `__enter__`/`__exit__` | Complex state, need instance attributes |
| `@contextmanager` decorator | Simple setup/teardown logic |
| `contextlib.suppress(ExcType)` | Ignore specific exceptions |
| `contextlib.ExitStack` | Dynamic number of resources |
| `contextlib.closing(obj)` | Objects with `.close()` but no `__exit__` |
