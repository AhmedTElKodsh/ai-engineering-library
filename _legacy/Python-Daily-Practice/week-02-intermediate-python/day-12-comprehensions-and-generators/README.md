# Day 12: Comprehensions & Generators

> comprehensions are Python's way of saying "give me a list/dict/set in one line" — generators take that idea and make it lazy

**Concepts:** list/dict/set comprehensions, generator expressions, `yield`, generator pipelines | **Difficulty:** ★★★☆☆ | **Time:** ~35 min
**Builds On:** Day 03 — lists, Day 04 — dicts and sets, Day 06 — functions
**Prepares For:** Day 13 — unpacking and Pythonic patterns, Day 14 — weekly project

## Your Task

Build six functions: three using comprehensions (data transformation, filtering, nested flattening) and three using generators (fibonacci sequence, file-like line filtering, and a data processing pipeline).

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Comprehensions

### List Comprehensions

The most common and powerful one-liner in Python:

```python
# Basic: [expression for item in iterable]
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With filter: [expression for item in iterable if condition]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# With transformation
words = ["Hello", "World", "Python"]
lengths = [len(w) for w in words]
# [5, 5, 6]

# Nested loops (flatten a matrix)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
# Read as: for row in matrix → for n in row → append n
```

### Dict Comprehensions

```python
# {key_expr: value_expr for item in iterable}
word_lengths = {w: len(w) for w in ["hello", "world", "python"]}
# {"hello": 5, "world": 5, "python": 6}

# Inverting a dictionary
colors = {"red": "#FF0000", "green": "#00FF00"}
hex_to_name = {v: k for k, v in colors.items()}
# {"#FF0000": "red", "#00FF00": "green"}

# With filtering
scores = {"Alice": 85, "Bob": 62, "Charlie": 91, "Diana": 58}
passed = {name: score for name, score in scores.items() if score >= 70}
# {"Alice": 85, "Charlie": 91}
```

### Set Comprehensions

```python
# {expression for item in iterable}
unique_lengths = {len(w) for w in ["hello", "hi", "hey", "world"]}
# {2, 3, 5}

# Remove duplicates with transformation
words = ["Hello", "HELLO", "hello", "World", "WORLD"]
unique_lower = {w.lower() for w in words}
# {"hello", "world"}
```

### When NOT to Use Comprehensions

```python
# BAD: too complex, hard to read
result = [
    transform(x, y)
    for x in range(10)
    for y in range(10)
    if x != y
    if is_valid(x, y)
]

# GOOD: use a regular loop instead
result = []
for x in range(10):
    for y in range(10):
        if x != y and is_valid(x, y):
            result.append(transform(x, y))
```

> **Rule of thumb:** If a comprehension doesn't fit on one or two lines, or if you need to add comments to explain it, use a regular loop.

---

## Deep Dive: Generators

### The Problem with Lists

Lists store everything in memory at once. For large datasets, this is wasteful:

```python
# This creates a list of 10 million items in memory!
big_list = [x**2 for x in range(10_000_000)]   # ~80MB of RAM

# This creates a generator — uses almost no memory
big_gen = (x**2 for x in range(10_000_000))     # ~100 bytes!
```

### Generator Expressions

Just like list comprehensions, but with parentheses instead of brackets:

```python
# Generator expression — lazy, produces values one at a time
squares_gen = (x**2 for x in range(1_000_000))

# Values are produced on demand
next(squares_gen)    # 0
next(squares_gen)    # 1
next(squares_gen)    # 4

# Works with sum, max, min, any, all — no list needed!
total = sum(x**2 for x in range(1_000_000))    # efficient!
```

### Generator Functions with `yield`

`yield` turns a function into a generator. Each call to `next()` runs the function until the next `yield`, then pauses.

```python
def countdown(n):
    while n > 0:
        yield n        # pause here, give n to caller
        n -= 1         # resume here on next call

for num in countdown(5):
    print(num)         # 5, 4, 3, 2, 1

# What's happening under the hood:
gen = countdown(3)
next(gen)    # runs until yield → returns 3
next(gen)    # resumes, runs until yield → returns 2
next(gen)    # resumes, runs until yield → returns 1
next(gen)    # StopIteration! (function ended)
```

### Generator Pipelines

Chain generators together for memory-efficient data processing:

```python
def read_lines(filename):
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_comments(lines):
    for line in lines:
        if not line.startswith("#"):
            yield line

def parse_csv(lines):
    for line in lines:
        yield line.split(",")

# Pipeline — processes one line at a time, no matter the file size
lines = read_lines("huge_file.csv")
data = filter_comments(lines)
rows = parse_csv(data)

for row in rows:
    process(row)    # memory-efficient!
```

### `yield from`: Delegating to Sub-generators

```python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)    # delegate to recursive call
        else:
            yield item

list(flatten([1, [2, [3, 4], 5], 6]))
# [1, 2, 3, 4, 5, 6]
```

### Try This!

1. Write a generator that produces the infinite sequence 1, 1, 2, 3, 5, 8, 13... (Fibonacci).
2. Use a dict comprehension to create a letter frequency counter for a string.
3. Chain two generators: one that reads numbers, one that filters evens.

---

## Cheatsheet

| Type | Syntax | Returns |
|------|--------|---------|
| List comp | `[expr for x in iter]` | list |
| Dict comp | `{k: v for x in iter}` | dict |
| Set comp | `{expr for x in iter}` | set |
| Generator expr | `(expr for x in iter)` | generator |
| Generator func | `def f(): yield val` | generator |
| yield from | `yield from iterable` | delegates |
