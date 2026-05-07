# Day 11: Magic Methods & Properties

> magic methods let your objects behave like built-in types — that's real Python power

**Concepts:** `__str__`, `__repr__`, `__eq__`, `__lt__`, `__add__`, `__len__`, `__getitem__`, `@property` | **Difficulty:** ★★★☆☆ | **Time:** ~40 min
**Builds On:** Day 10 — OOP classes and inheritance
**Prepares For:** Day 12 — comprehensions and generators, Day 14 — weekly project

## Your Task

Build three classes that make heavy use of magic methods: a `Money` class that supports arithmetic and comparison, a `Playlist` class that supports indexing and iteration, and a `Temperature` class that uses properties for automatic conversion.

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Magic Methods

### What Are Magic Methods?

Magic methods (also called dunder methods, for "double underscore") let your custom objects plug into Python's built-in operators and functions. When you write `len(my_list)`, Python actually calls `my_list.__len__()`. When you write `a + b`, Python calls `a.__add__(b)`.

By implementing these methods, your objects can:
- Be printed meaningfully (`__str__`, `__repr__`)
- Be compared (`__eq__`, `__lt__`, `__le__`, `__gt__`, `__ge__`)
- Support arithmetic (`__add__`, `__sub__`, `__mul__`)
- Work with `len()`, `in`, indexing, and iteration

### String Representations

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        """For developers — unambiguous, ideally eval()-able."""
        return f"Point({self.x}, {self.y})"

    def __str__(self):
        """For users — readable and friendly."""
        return f"({self.x}, {self.y})"

p = Point(3, 4)
repr(p)     # "Point(3, 4)" — what you see in the REPL
str(p)      # "(3, 4)" — what print() uses
print(p)    # (3, 4)
f"{p}"      # "(3, 4)" — f-strings use __str__
```

> **Rule of thumb:** Always implement `__repr__`. Only add `__str__` if you want a different user-facing format. If only `__repr__` exists, Python uses it for both.

### Comparison Methods

```python
from functools import total_ordering

@total_ordering   # fill in the rest from __eq__ and __lt__
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.grade == other.grade

    def __lt__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.grade < other.grade

# Now all comparisons work:
alice = Student("Alice", 90)
bob = Student("Bob", 85)
alice > bob      # True
alice >= bob     # True
sorted([bob, alice])  # [bob, alice] — sorted by grade
```

> **Pro tip:** Return `NotImplemented` (not `raise NotImplementedError`) when the comparison doesn't make sense. Python will then try the other operand's method.

### Arithmetic Methods

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):
        return self.__mul__(scalar)    # 3 * vector works too

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v1 + v2        # Vector(4, 6)
v1 * 3         # Vector(3, 6)
3 * v1         # Vector(3, 6) — uses __rmul__
abs(v1)        # 2.236...
```

### Container Methods

```python
class Deck:
    def __init__(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        ranks = list(range(2, 11)) + ["J", "Q", "K", "A"]
        self.cards = [f"{r} of {s}" for s in suits for r in ranks]

    def __len__(self):
        return len(self.cards)

    def __getitem__(self, index):
        return self.cards[index]

    def __contains__(self, card):
        return card in self.cards

deck = Deck()
len(deck)                # 52
deck[0]                  # "2 of Hearts"
deck[-1]                 # "A of Spades"
deck[0:3]                # first 3 cards (slicing works!)
"A of Spades" in deck    # True — uses __contains__

# __getitem__ also enables iteration:
for card in deck:
    print(card)
```

### Properties: Computed Attributes

Properties let you define methods that look like attributes. They're perfect for validation, computed values, and controlled access.

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius     # convention: _ prefix = "private"

    @property
    def radius(self):
        """Getter — called when you read circle.radius."""
        return self._radius

    @radius.setter
    def radius(self, value):
        """Setter — called when you write circle.radius = x."""
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        """Read-only computed property — no setter defined."""
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
c.radius        # 5 — calls the getter
c.radius = 10   # calls the setter
c.area          # 314.159... — computed on access
c.radius = -1   # ValueError!
c.area = 100    # AttributeError — no setter for area
```

### Common Magic Methods Reference

| Method | Trigger | Example |
|--------|---------|---------|
| `__repr__` | `repr(obj)`, REPL | Developer string |
| `__str__` | `str(obj)`, `print()` | User string |
| `__eq__` | `a == b` | Equality |
| `__lt__` | `a < b` | Less than |
| `__add__` | `a + b` | Addition |
| `__sub__` | `a - b` | Subtraction |
| `__mul__` | `a * b` | Multiplication |
| `__len__` | `len(obj)` | Length |
| `__getitem__` | `obj[key]` | Indexing |
| `__contains__` | `x in obj` | Membership |
| `__iter__` | `for x in obj` | Iteration |
| `__bool__` | `if obj:` | Truthiness |
| `__hash__` | `hash(obj)` | Dict keys, sets |

### Try This!

1. Add `__sub__` and `__neg__` to the Vector class.
2. Implement `__bool__` on a class so empty containers are falsy.
3. Create a `Range` class with `__contains__` that checks if a number is in range without storing all values.

---

## Cheatsheet

| Category | Methods | Purpose |
|----------|---------|---------|
| String | `__str__`, `__repr__` | Human/dev readable |
| Comparison | `__eq__`, `__lt__`, `__le__`, ... | Sorting, equality |
| Arithmetic | `__add__`, `__sub__`, `__mul__` | Operators |
| Container | `__len__`, `__getitem__`, `__contains__` | Indexing, `in` |
| Property | `@property`, `@x.setter` | Computed attributes |
| Lifecycle | `__init__`, `__del__` | Creation, cleanup |
