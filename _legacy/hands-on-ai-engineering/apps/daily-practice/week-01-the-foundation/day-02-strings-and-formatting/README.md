# Day 02: Strings and Formatting

> yesterday you gave Python values names — today you'll teach them to speak

**Concepts:** strings, f-strings, string methods, slicing, formatting | **Difficulty:** ★☆☆☆☆ | **Time:** ~25 min
**Builds On:** Day 01 — variables and types

## Your Task

Build five functions that manipulate and format strings. You'll reverse strings with slicing, count vowels case-insensitively, implement title case from scratch, extract digits from mixed text, and compose formatted greetings with f-strings.

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

## Deep Dive: Strings and Formatting

### Strings Are Sequences

A string is a sequence of characters. Like lists, you can index, slice, and loop through them — but unlike lists, strings are **immutable** (you can't change individual characters in place).

```python
name = "Python"
name[0]       # "P"
name[-1]      # "n"
name[0:3]     # "Pyt"
name[::-1]    # "nohtyP" — reversed!

# Strings are immutable
name[0] = "J"   # TypeError!

# Instead, create a new string
new_name = "J" + name[1:]   # "Jython"
```

### Essential String Methods

```python
s = "  Hello, World!  "

# Case
s.upper()           # "  HELLO, WORLD!  "
s.lower()           # "  hello, world!  "
s.capitalize()      # "  hello, world!  " (only first char of string)

# Whitespace
s.strip()           # "Hello, World!"
s.lstrip()          # "Hello, World!  "
s.rstrip()          # "  Hello, World!"

# Searching
s.find("World")     # 9 (index of first match, -1 if not found)
s.count("l")        # 3
"World" in s        # True

# Replacing
s.replace("World", "Python")   # "  Hello, Python!  "

# Splitting and joining
"a,b,c".split(",")             # ["a", "b", "c"]
" ".join(["Hello", "World"])   # "Hello World"

# Character testing
"hello".isalpha()      # True (all alphabetic)
"123".isdigit()        # True (all digits)
"hello123".isalnum()   # True (alphanumeric)
```

### f-strings: Modern String Formatting

```python
name = "Alice"
age = 30
pi = 3.14159

# Basic interpolation
f"Hello, {name}!"                  # "Hello, Alice!"
f"{name} is {age} years old"       # "Alice is 30 years old"

# Expressions inside braces
f"Next year: {age + 1}"           # "Next year: 31"
f"Name length: {len(name)}"       # "Name length: 5"

# Format specifiers
f"{pi:.2f}"          # "3.14"     — 2 decimal places
f"{age:05d}"         # "00030"    — zero-padded to 5 digits
f"{name:>10}"        # "     Alice" — right-align in 10 chars
f"{name:<10}"        # "Alice     " — left-align
f"{name:^10}"        # "  Alice   " — center

# Percentage
ratio = 0.856
f"{ratio:.1%}"       # "85.6%"
```

### Slicing: The Swiss Army Knife

```python
text = "Hello, World!"

text[0:5]      # "Hello"       — first 5 characters
text[7:]       # "World!"      — from index 7 to end
text[-6:]      # "orld!"       — last 6 characters (oops, "World!" is 6)
text[::2]      # "Hlo ol!"    — every other character
text[::-1]     # "!dlroW ,olleH" — full reverse
```

> **Key insight:** `text[start:stop:step]` — start is inclusive, stop is exclusive, step controls direction and stride.

### Common Patterns

```python
# Check if palindrome
word = "racecar"
word == word[::-1]    # True

# Remove specific characters
phone = "(555) 867-5309"
digits = "".join(c for c in phone if c.isdigit())  # "5558675309"

# Manual title case (without .title())
text = "hello world"
result = " ".join(w[0].upper() + w[1:].lower() for w in text.split())
# "Hello World"

# Repeat a string
"ha" * 3              # "hahaha"
"-" * 40              # "----------------------------------------"
```

### Try This!

1. What does `"hello"[1:4]` return? What about `"hello"[::2]`?
2. How would you check if a string contains only whitespace?
3. What's the difference between `.find()` and `.index()` when the substring isn't found?

---

## Cheatsheet

| Operation | Syntax | Example |
|-----------|--------|---------|
| Index | `s[i]` | `"hello"[0]` → `"h"` |
| Slice | `s[start:stop:step]` | `"hello"[1:4]` → `"ell"` |
| Reverse | `s[::-1]` | `"hello"[::-1]` → `"olleh"` |
| Upper/lower | `.upper()` / `.lower()` | Case conversion |
| Strip | `.strip()` | Remove whitespace |
| Split | `.split(sep)` | String → list |
| Join | `sep.join(lst)` | List → string |
| Find | `.find(sub)` | Index or -1 |
| Replace | `.replace(old, new)` | Substitution |
| f-string | `f"text {expr}"` | Interpolation |
| Format spec | `f"{val:.2f}"` | Decimal places |
