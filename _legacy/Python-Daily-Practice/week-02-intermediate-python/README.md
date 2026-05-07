# Week 02: Intermediate Python

You survived the foundation — now it's time to think in objects, handle errors like a pro, and write code that *reads* like Python. By the end of this week you'll be building real systems with classes, context managers, generators, and Pythonic idioms.

Each day adds one concept on top of the last. Do them in order.

## This Week's Journey

| Day | Topic | Difficulty |
|-----|-------|-----------|
| 08 | Error Handling & Custom Exceptions | ★★☆☆☆ |
| 09 | Context Managers & Resource Management | ★★★☆☆ |
| 10 | OOP: Classes & Inheritance | ★★★☆☆ |
| 11 | Magic Methods & Properties | ★★★☆☆ |
| 12 | Comprehensions & Generators | ★★★☆☆ |
| 13 | Unpacking & Pythonic Patterns | ★★★☆☆ |
| 14 | **Weekly Project:** Inventory Management System | ★★★★☆ |

## Run All Week 2 Tests

```
pytest week-02-intermediate-python/ -v
```

Expected on day one: setup checks pass, everything else fails — work through each day to turn them green.

## Cheatsheet: Intermediate Patterns

**Error Handling:**
```python
try:
    result = risky_operation()
except ValueError as e:
    handle_error(e)
else:
    use_result(result)
finally:
    cleanup()

class MyError(Exception):
    def __init__(self, detail):
        self.detail = detail
        super().__init__(f"Something went wrong: {detail}")
```

**Context Managers:**
```python
class MyContext:
    def __enter__(self):
        return self              # setup
    def __exit__(self, *exc):
        self.cleanup()           # teardown
        return False             # don't suppress exceptions
```

**OOP Essentials:**
```python
class Child(Parent):
    def __init__(self, extra):
        super().__init__()       # call parent
        self.extra = extra

    def __str__(self):           # for print()
        return f"Child({self.extra})"

    def __eq__(self, other):     # for ==
        return self.extra == other.extra
```

**Comprehensions & Generators:**
```python
squares = [x**2 for x in range(10)]          # list
unique = {x % 3 for x in range(10)}          # set
mapping = {x: x**2 for x in range(10)}       # dict
lazy = (x**2 for x in range(10))             # generator

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

**Pythonic Patterns:**
```python
first, *rest = [1, 2, 3, 4, 5]               # star unpack
merged = {**dict_a, **dict_b}                 # dict merge
for i, item in enumerate(lst, start=1):       # indexed loop
pairs = dict(zip(keys, values))               # parallel iteration
value = x if condition else default           # ternary
```
