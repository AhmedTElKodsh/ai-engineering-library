# Day 13: Unpacking & Pythonic Patterns

> Python has an elegant way to do almost everything — today you learn the idioms that mark you as someone who truly knows the language

**Concepts:** *, **, enumerate, zip, walrus operator, EAFP, Pythonic idioms | **Difficulty:** ★★★☆☆ | **Time:** ~35 min
**Builds On:** Day 03 — lists and tuples, Day 06 — functions, Day 12 — comprehensions
**Prepares For:** Day 14 — weekly project

## Your Task

Build six functions that showcase Pythonic patterns: advanced unpacking, zip-based data merging, enumerate-based processing, the walrus operator, EAFP-style programming, and functional pipeline composition.

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Pythonic Patterns

### Star Unpacking: * and **

```python
# Basic unpacking
a, b, c = [1, 2, 3]

# Star unpacking — capture "the rest"
first, *rest = [1, 2, 3, 4, 5]
# first = 1, rest = [2, 3, 4, 5]

first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5

# Star in function calls — spread a list into arguments
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
add(*numbers)    # same as add(1, 2, 3)

# Double star — spread a dict into keyword arguments
config = {"host": "localhost", "port": 8080}
connect(**config)    # same as connect(host="localhost", port=8080)

# Merging dicts with **
defaults = {"color": "blue", "size": 10}
overrides = {"size": 20, "bold": True}
merged = {**defaults, **overrides}
# {"color": "blue", "size": 20, "bold": True}

# Merging lists with *
a = [1, 2, 3]
b = [4, 5, 6]
combined = [*a, *b]    # [1, 2, 3, 4, 5, 6]
```

### enumerate: Index + Value

```python
# Instead of this:
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# Do this:
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Start counting from 1:
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
```

### zip: Parallel Iteration

```python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Iterate two sequences together
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Create dict from two lists
name_scores = dict(zip(names, scores))
# {"Alice": 85, "Bob": 92, "Charlie": 78}

# Unzip: transpose a list of tuples
pairs = [("a", 1), ("b", 2), ("c", 3)]
letters, numbers = zip(*pairs)
# letters = ("a", "b", "c"), numbers = (1, 2, 3)

# zip_longest for unequal lengths
from itertools import zip_longest
list(zip_longest([1, 2], [3, 4, 5], fillvalue=0))
# [(1, 3), (2, 4), (0, 5)]
```

### The Walrus Operator `:=` (Python 3.8+)

Assigns a value AND uses it in an expression:

```python
# Without walrus — reads the file twice (conceptually)
line = input()
while line != "quit":
    process(line)
    line = input()

# With walrus — cleaner
while (line := input()) != "quit":
    process(line)

# In comprehensions
results = [
    y
    for x in data
    if (y := expensive_computation(x)) > threshold
]

# In if statements
if (match := pattern.search(text)) is not None:
    print(match.group())
```

### EAFP vs LBYL

**EAFP** (Easier to Ask Forgiveness than Permission) — Pythonic:
```python
# Try it, handle failure
try:
    value = mapping[key]
except KeyError:
    value = default_value
```

**LBYL** (Look Before You Leap) — Less Pythonic:
```python
# Check first, then act
if key in mapping:
    value = mapping[key]
else:
    value = default_value
```

Python idiom: use EAFP when the exception is rare. Use LBYL when the check is cheap and failure is common.

### Common Pythonic Idioms

```python
# Swap variables
a, b = b, a

# Ternary expression
status = "pass" if score >= 60 else "fail"

# Chained comparisons
if 0 < x < 100:     # instead of if x > 0 and x < 100

# Truthy/falsy checks
if items:            # instead of if len(items) > 0
if not items:        # instead of if len(items) == 0

# String joining (not concatenation in a loop!)
result = ", ".join(words)    # instead of result += word + ", "

# any() and all()
has_negative = any(x < 0 for x in numbers)
all_positive = all(x > 0 for x in numbers)

# dict.get() for safe access
value = config.get("key", "default")

# collections.defaultdict for auto-defaults
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)
```

### Try This!

1. Use `zip` to create a dictionary from two lists.
2. Write a one-liner using the walrus operator to find the first number > 100 in a list.
3. Rewrite `if x is not None and len(x) > 0` in a more Pythonic way.

---

## Cheatsheet

| Pattern | Example | Purpose |
|---------|---------|---------|
| Star unpack | `first, *rest = lst` | Capture remainder |
| Dict spread | `{**d1, **d2}` | Merge dicts |
| enumerate | `for i, x in enumerate(lst)` | Index + value |
| zip | `for a, b in zip(xs, ys)` | Parallel loop |
| Walrus | `if (n := f()) > 0:` | Assign + test |
| Ternary | `x if cond else y` | Inline if |
| any/all | `any(x > 0 for x in lst)` | Quick checks |
| EAFP | `try: ... except:` | Pythonic errors |
