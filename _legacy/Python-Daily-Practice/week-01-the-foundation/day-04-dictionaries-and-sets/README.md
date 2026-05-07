# Day 04: Dictionaries and Sets

> lists store things in order — dictionaries let you find them by name

**Concepts:** dictionaries, sets, dict methods, set operations, dict comprehension | **Difficulty:** ★★☆☆☆ | **Time:** ~30 min
**Builds On:** Day 01 — variables and types, Day 03 — lists and tuples
**Prepares For:** Day 06 — functions and scope, Day 07 — weekly project

## Learning Objectives

By the end of this lesson, you will be able to:
- Merge dictionaries and handle key conflicts
- Invert dictionaries using comprehensions
- Use set operations (intersection, union, difference) for data analysis
- Group related data using dictionaries and default values
- Compare two dictionaries to identify differences

## Your Task

Build five functions that work with key-value data and unique collections. You'll merge dictionaries, invert key-value pairs, find common elements using sets, group data by a property, and compute differences between dictionaries.

## How to Work

This daily practice uses a two-step workflow to balance exploration with professional standards:

1. **Draft & Explore** in `exercises.ipynb`: Use the Jupyter Notebook as your interactive scratchpad. It's designed for visual feedback and rapid iteration.
2. **Formalize** in `solution_template.py`: Once your logic is solid, copy your functions into the Python script. This file is your "production" code.
3. **Verify** with the test suite:
   ```bash
   pytest test_solution.py -v
   ```
   **Goal:** Turn all failing tests green. Success reveals the expert model answers!

---

## Deep Dive: Dictionaries and Sets

### Dictionaries: Your Key-Value Store

Think of a dictionary like a phone book — you look up a name (key) to find a number (value). You don't search page by page like a list; you jump directly to the entry. That's why dict lookups are O(1) on average, while list searches are O(n).

```python
# Creating dictionaries
user = {"name": "Alice", "age": 30, "city": "NYC"}
empty = {}
from_pairs = dict([("a", 1), ("b", 2)])
from_kwargs = dict(name="Bob", age=25)

# Accessing values
user["name"]              # "Alice" — raises KeyError if missing
user.get("email", "N/A")  # "N/A" — safe lookup with default
```

### Essential Dict Methods

```python
# Reading
user.keys()               # dict_keys(["name", "age", "city"])
user.values()             # dict_values(["Alice", 30, "NYC"])
user.items()              # dict_items([("name", "Alice"), ...])
"name" in user            # True — checks keys, not values
len(user)                 # 3

# Writing
user["email"] = "a@b.com" # add or update a key
user.update({"age": 31, "role": "dev"})  # bulk update
user.setdefault("score", 0)  # set only if key missing

# Removing
del user["city"]          # remove key (raises KeyError if missing)
email = user.pop("email", None)  # remove & return (safe with default)
user.clear()              # remove all keys

# Merging (Python 3.9+)
merged = {"a": 1} | {"b": 2}           # {"a": 1, "b": 2}
merged = {"a": 1} | {"a": 99, "b": 2}  # {"a": 99, "b": 2} — right wins
```

> **Gotcha Alert:** Dict keys must be hashable (immutable). Strings, numbers, tuples work. Lists and dicts don't. If you need a list as a key, convert to a tuple first.

### Dict Comprehensions

```python
# Basic: {key_expr: value_expr for item in iterable}
squares = {n: n**2 for n in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With filtering
even_sq = {n: n**2 for n in range(10) if n % 2 == 0}

# Inverting a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: "a", 2: "b", 3: "c"}

# From two lists
keys = ["name", "age"]
vals = ["Alice", 30]
d = dict(zip(keys, vals))  # {"name": "Alice", "age": 30}
```

### Sets: Unique Collections

Sets are like a bag of unique marbles — no duplicates, no order. They excel at membership testing and mathematical set operations.

```python
# Creating sets
colors = {"red", "green", "blue"}
from_list = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3} — duplicates removed
empty_set = set()                       # NOT {} — that's an empty dict!

# Adding and removing
colors.add("yellow")
colors.discard("red")        # no error if missing
colors.remove("green")       # KeyError if missing
```

### Set Operations

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b          # union:        {1, 2, 3, 4, 5, 6}
a & b          # intersection: {3, 4}
a - b          # difference:   {1, 2}
a ^ b          # symmetric difference: {1, 2, 5, 6}
a <= b         # subset check: False
a.isdisjoint(b)  # no common elements? False
```

### Common Patterns

```python
# Remove duplicates while preserving order
items = [3, 1, 4, 1, 5, 9, 2, 6, 5]
unique = list(dict.fromkeys(items))    # [3, 1, 4, 5, 9, 2, 6]

# Counting occurrences
from collections import Counter
counts = Counter("mississippi")
# Counter({"s": 4, "i": 4, "p": 2, "m": 1})

# Grouping with defaultdict
from collections import defaultdict
groups = defaultdict(list)
for word in ["apple", "ant", "banana", "bear"]:
    groups[word[0]].append(word)
# {"a": ["apple", "ant"], "b": ["banana", "bear"]}

# Iterating with items()
for key, value in user.items():
    print(f"{key}: {value}")
```

### Performance: Why Dicts and Sets Are Fast

| Operation | List | Dict/Set |
|-----------|------|----------|
| Lookup (`x in collection`) | O(n) | O(1) |
| Insert | O(1) append, O(n) insert | O(1) |
| Delete | O(n) | O(1) |

If you're checking membership frequently, convert your list to a set first.

### Try This!

1. What happens if you use a list as a dictionary key? Why?
2. Create a set from the string `"hello"`. What do you get?
3. How would you count how many unique words are in a sentence?

---

## Cheatsheet

| Operation | Dict | Set |
|-----------|------|-----|
| Create | `{"k": v}` | `{1, 2, 3}` |
| Empty | `{}` | `set()` |
| Lookup | `d["key"]` / `d.get("key")` | `x in s` |
| Add | `d["key"] = val` | `s.add(x)` |
| Remove | `del d["key"]` / `d.pop("key")` | `s.discard(x)` |
| Merge | `d1 \| d2` | `s1 \| s2` |
| Size | `len(d)` | `len(s)` |
