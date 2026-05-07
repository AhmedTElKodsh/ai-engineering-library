# Week 01: The Foundation

Your first week builds the muscle memory that every Python developer relies on daily. By Friday you'll be writing functions, wrangling data structures, and controlling program flow — all tested with `pytest`.

Each day adds one concept on top of the last. Do them in order.

## This Week's Journey

| Day | Topic | Difficulty |
|-----|-------|-----------|
| 01 | Variables and Types | ★☆☆☆☆ |
| 02 | Strings and Formatting | ★☆☆☆☆ |
| 03 | Lists and Tuples | ★★☆☆☆ |
| 04 | Dictionaries and Sets | ★★☆☆☆ |
| 05 | Control Flow | ★★☆☆☆ |
| 06 | Functions and Scope | ★★★☆☆ |
| 07 | **Weekly Project:** Student Grade Analyzer | ★★★★☆ |

## Run All Week 1 Tests

```
pytest week-01-the-foundation/ -v
```

Expected on day one: 9 passed (setup checks), 141 failed — work through each day to turn them green.

## Cheatsheet: Foundation Patterns

**Type checking:**
```python
isinstance(x, (int, float))   # True if x is a number
type(x).__name__               # "str", "int", "list", etc.
```

**String formatting:**
```python
f"{name:>10}"     # right-align in 10 chars
f"{price:.2f}"    # two decimal places
f"{pct:.1%}"      # percentage with 1 decimal
```

**List & tuple unpacking:**
```python
first, *middle, last = [1, 2, 3, 4, 5]
a, b = b, a   # swap without temp variable
```

**Dictionary essentials:**
```python
d.get("key", default)         # safe lookup
{k: v for k, v in items}     # dict comprehension
d1 | d2                       # merge (Python 3.9+)
```

**Control flow patterns:**
```python
for i, item in enumerate(lst):     # index + value
for k, v in d.items():             # dict iteration
result = x if condition else y     # ternary
```

**Function defaults and closures:**
```python
def greet(name, greeting="Hello"):  # default parameter
    return f"{greeting}, {name}!"

def make_adder(n):                  # closure
    def add(x):
        return x + n
    return add
```
