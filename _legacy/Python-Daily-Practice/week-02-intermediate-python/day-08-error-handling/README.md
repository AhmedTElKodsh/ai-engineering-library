# Day 08: Error Handling & Custom Exceptions

> bugs are inevitable — how you handle them separates amateurs from professionals

**Concepts:** try/except/else/finally, custom exceptions, exception chaining, EAFP vs LBYL | **Difficulty:** ★★☆☆☆ | **Time:** ~35 min
**Builds On:** Day 05 — control flow, Day 06 — functions and scope
**Prepares For:** Day 09 — context managers, Day 10 — OOP

## Your Task

Build five functions that demonstrate robust error handling: safe division with proper exceptions, input validation with custom exception classes, a nested operation with exception chaining, retry logic with multiple exception types, and a validation pipeline.

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Error Handling

### The Basics: try/except

When something goes wrong in Python, it raises an **exception** — an object that describes what happened. Without handling, exceptions crash your program. With handling, you decide what happens next.

```python
# Without handling — program crashes
result = 10 / 0    # ZeroDivisionError!

# With handling — you stay in control
try:
    result = 10 / 0
except ZeroDivisionError:
    result = 0
    print("Can't divide by zero, using 0 instead")
```

### The Full try/except/else/finally Block

```python
try:
    # Code that might fail
    f = open("data.txt")
    data = f.read()
except FileNotFoundError:
    # Runs ONLY if that specific exception occurred
    print("File not found!")
    data = ""
except PermissionError as e:
    # Catch the exception object for details
    print(f"Permission denied: {e}")
    data = ""
else:
    # Runs ONLY if NO exception occurred
    print(f"Read {len(data)} characters")
finally:
    # ALWAYS runs — cleanup goes here
    print("Done attempting file read")
```

**When to use each block:**
- `try`: wrap the risky operation (keep it minimal!)
- `except`: handle specific exception types
- `else`: code that should only run on success
- `finally`: cleanup that must happen regardless (closing files, releasing locks)

### Exception Hierarchy

All exceptions inherit from `BaseException`. The ones you'll catch most often inherit from `Exception`:

```
BaseException
├── SystemExit
├── KeyboardInterrupt
├── Exception
│   ├── ValueError        ← wrong value for the type
│   ├── TypeError         ← wrong type entirely
│   ├── KeyError          ← dict key not found
│   ├── IndexError        ← list index out of range
│   ├── FileNotFoundError ← file doesn't exist
│   ├── AttributeError    ← object has no such attribute
│   ├── ZeroDivisionError ← division by zero
│   └── RuntimeError      ← generic runtime error
```

> **Rule:** Never catch bare `except:` or `except Exception:` unless you re-raise. Catching too broadly hides bugs.

### Custom Exceptions

Custom exceptions make your error messages domain-specific and let callers handle different failure modes differently.

```python
# Simple custom exception
class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the account balance."""
    pass

# Custom exception with extra data
class ValidationError(Exception):
    """Raised when input validation fails."""
    def __init__(self, field, message, value=None):
        self.field = field
        self.value = value
        super().__init__(f"{field}: {message}")

# Using them
def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(
            f"Cannot withdraw ${amount} from balance of ${balance}"
        )
    return balance - amount

def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("age", "must be an integer", age)
    if age < 0 or age > 150:
        raise ValidationError("age", "must be between 0 and 150", age)
    return age
```

### Exception Chaining: `raise ... from ...`

When one exception causes another, chain them so the full story is preserved:

```python
def load_config(path):
    try:
        with open(path) as f:
            return parse(f.read())
    except FileNotFoundError as e:
        raise ConfigError(f"Config file missing: {path}") from e
    except ValueError as e:
        raise ConfigError(f"Invalid config format in {path}") from e
```

The `from e` attaches the original exception as `__cause__`, so tracebacks show both the original and the new exception.

### EAFP vs LBYL

**EAFP** — Easier to Ask Forgiveness than Permission (Pythonic):
```python
try:
    value = data["key"]
except KeyError:
    value = default
```

**LBYL** — Look Before You Leap (less Pythonic):
```python
if "key" in data:
    value = data["key"]
else:
    value = default
```

Python strongly favors EAFP. It's faster when exceptions are rare and avoids race conditions.

### Best Practices

1. **Catch specific exceptions** — never bare `except:`
2. **Keep try blocks small** — only wrap what might fail
3. **Use else for success logic** — separates happy path from error path
4. **Always clean up in finally** — or better yet, use context managers (Day 09)
5. **Custom exceptions for your domain** — don't reuse `ValueError` for everything
6. **Chain exceptions** — `raise NewError(...) from original_error`

### Try This!

1. What's the difference between `except ValueError` and `except (ValueError, TypeError)`?
2. Write a function that asks for user input until they enter a valid integer.
3. Create a custom `NegativeNumberError` that stores the invalid number.

---

## Cheatsheet

| Pattern | Syntax | When |
|---------|--------|------|
| Basic catch | `except ValueError:` | Handle one type |
| Multiple types | `except (ValueError, TypeError):` | Handle several |
| Capture error | `except ValueError as e:` | Need error details |
| Custom exception | `class MyError(Exception): pass` | Domain errors |
| Chain exceptions | `raise X from e` | Preserve cause |
| Re-raise | `raise` (bare) | Let it propagate |
| Else | `else:` after except | Success-only code |
| Finally | `finally:` | Always-run cleanup |
