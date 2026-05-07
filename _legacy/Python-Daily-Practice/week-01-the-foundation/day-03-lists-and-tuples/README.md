# Day 03: Lists and Tuples

> strings taught you sequences of characters — now meet sequences of anything

**Concepts:** lists, tuples, indexing, slicing, list methods, unpacking | **Difficulty:** ★★☆☆☆ | **Time:** ~30 min
**Builds On:** Day 01 — variables and types, Day 02 — strings and formatting

## Learning Objectives

By the end of this lesson, you will be able to:
- Create and manipulate lists using built-in methods
- Use tuples for immutable, hashable data collections
- Index, slice, and unpack sequences efficiently
- Choose appropriately between lists and tuples in your programs

## Your Task

Build five functions that work with ordered collections. You'll find values in lists without sorting, rotate elements, interleave two lists, split a list into chunks, and compute summary statistics from a tuple of numbers.

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

## Deep Dive: Lists and Tuples

### The Big Picture

Think of a **list** like a row of lockers at a gym — each locker has a number (index), you can open any locker to see what's inside, swap things between lockers, add new lockers at the end, or remove lockers entirely. The row can grow and shrink.

A **tuple** is like the same row of lockers, but welded shut after you fill them. You can look inside any locker, but you can't add, remove, or swap. That rigidity is the point — it signals "this data shouldn't change."

### Lists: Your Mutable Workhorse

```python
# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]       # any types allowed
empty = []

# Indexing (0-based, negative wraps from end)
fruits[0]     # "apple"
fruits[-1]    # "cherry"

# Slicing: list[start:stop:step]
numbers[1:4]    # [2, 3, 4]   — stop is exclusive
numbers[::2]    # [1, 3, 5]   — every other element
numbers[::-1]   # [5, 4, 3, 2, 1] — reversed copy
```

### Essential List Methods

```python
# Adding elements
fruits.append("date")           # add to end
fruits.insert(1, "blueberry")   # insert at index
fruits.extend(["elderberry"])   # add multiple items

# Removing elements
fruits.remove("banana")         # remove first occurrence
last = fruits.pop()             # remove & return last item
fruits.pop(0)                   # remove & return by index

# Searching and sorting
fruits.index("cherry")          # find index (raises ValueError if missing)
"apple" in fruits               # True/False membership test
fruits.sort()                   # sort in place (mutates!)
sorted(fruits)                  # return sorted copy (original unchanged)
fruits.reverse()                # reverse in place
len(fruits)                     # how many items
```

> **Gotcha Alert:** `sort()` and `reverse()` return `None` — they modify the list in place. If you write `x = mylist.sort()`, then `x` is `None`. Use `sorted()` when you need a new list.

### Tuples: Immutable and Hashable

```python
# Creating tuples
point = (3, 4)
single = (42,)          # trailing comma required for single-element tuple!
empty_tuple = ()
from_list = tuple([1, 2, 3])

# Tuples are immutable
point[0] = 10           # TypeError!

# But they support indexing and slicing just like lists
point[0]                # 3
point[-1]               # 4
```

**When to use tuples over lists:**
- Function return values: `return (min_val, max_val)`
- Dictionary keys (lists can't be dict keys — they're not hashable)
- Data that shouldn't change (coordinates, RGB colors, database rows)
- Named tuples for lightweight data objects

### Unpacking: Python's Secret Weapon

```python
# Basic unpacking
x, y = (3, 4)
first, second, third = [10, 20, 30]

# Star unpacking (Python 3+)
first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5

# Swap without temp variable
a, b = b, a

# Ignore values with _
_, y, _ = (1, 2, 3)    # only care about y
```

### Slicing Patterns You'll Use Every Day

```python
data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

data[:3]          # first 3 items: [0, 1, 2]
data[-3:]         # last 3 items: [7, 8, 9]
data[2:7]         # middle slice: [2, 3, 4, 5, 6]
data[::2]         # even indices: [0, 2, 4, 6, 8]
data[1::2]        # odd indices: [1, 3, 5, 7, 9]
data[::-1]        # full reverse: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Slicing creates a shallow copy
copy = data[:]    # same as data.copy() or list(data)
```

### Common Patterns

```python
# Flatten a list of lists
nested = [[1, 2], [3, 4], [5, 6]]
flat = [item for sublist in nested for item in sublist]
# [1, 2, 3, 4, 5, 6]

# Zip two lists together
names = ["Alice", "Bob"]
scores = [95, 87]
pairs = list(zip(names, scores))    # [("Alice", 95), ("Bob", 87)]

# Enumerate for index + value
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
```

### Try This!

1. What does `[1, 2, 3] + [4, 5]` return? What about `[1, 2, 3] * 3`?
2. Create a tuple `t = (1, [2, 3], 4)`. Can you modify `t[1]`? Why?
3. What happens when you sort a list of mixed types like `[1, "hello", 3]`?

---

## Self-Check

After completing the exercises, verify you can:
- [ ] Create lists with `[]` and tuples with `()`
- [ ] Access elements by index (positive and negative)
- [ ] Slice sequences using `start:stop:step`
- [ ] Use `.append()`, `.pop()`, `.sort()` for list manipulation
- [ ] Explain why tuples are useful for immutable data
- [ ] Unpack sequences into variables using `a, b, c = ...`

---

## Cheatsheet

| Operation | List | Tuple |
|-----------|------|-------|
| Create | `[1, 2, 3]` | `(1, 2, 3)` |
| Mutable? | Yes | No |
| Hashable? | No | Yes (if contents are) |
| Add item | `.append()`, `.insert()` | N/A |
| Remove item | `.pop()`, `.remove()` | N/A |
| Sort | `.sort()` / `sorted()` | `sorted()` only |
| Length | `len(x)` | `len(x)` |
| Contains | `item in x` | `item in x` |
| Unpack | `a, b, c = x` | `a, b, c = x` |
