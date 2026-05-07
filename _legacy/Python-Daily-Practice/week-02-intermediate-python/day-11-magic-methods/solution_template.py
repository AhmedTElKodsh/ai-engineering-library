"""
Day 11: Magic Methods & Properties
magic methods let your objects behave like built-in types — that's real Python power

Learning Objectives:
- Implement __str__ and __repr__ for readable object output
- Use __eq__, __lt__ for comparison and sorting
- Implement __add__, __sub__ for arithmetic operators
- Use __len__, __getitem__ for container behavior
- Use @property for computed attributes with validation

Concepts: __str__, __repr__, __eq__, __lt__, __add__, __len__, __getitem__, @property
Builds On: Day 10 — OOP classes and inheritance
Prepares For: Day 12 — comprehensions and generators, Day 14 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 40 min

from functools import total_ordering


@total_ordering
class Money:
    """A class representing monetary values with currency.

    Supports arithmetic operations and comparisons between same-currency amounts.

    Attributes:
        amount: the monetary value (float)
        currency: the currency code (str, e.g. "USD")

    Magic Methods to Implement:
        __repr__: return "Money({amount:.2f}, '{currency}')"
        __str__: return "{currency} {amount:.2f}" (e.g. "USD 10.50")
        __eq__: equal if same currency and same amount
        __lt__: less than if same currency and amount is less
        __add__: add two Money objects (same currency only)
        __sub__: subtract two Money objects (same currency only)
        __mul__: multiply Money by a number (scalar)
        __rmul__: allow number * Money (same as __mul__)
        __bool__: True if amount != 0

    Raise ValueError if operations involve different currencies.

    Pseudocode:
        __init__(amount, currency="USD"):
            1. Store amount as float and currency as uppercase string

        __repr__: return f"Money({self.amount:.2f}, '{self.currency}')"
        __str__: return f"{self.currency} {self.amount:.2f}"

        __eq__(other):
            1. If other is not a Money instance, return NotImplemented
            2. Return True if currency matches AND amount matches

        __lt__(other):
            1. If other is not Money or currency differs, raise ValueError
            2. Return self.amount < other.amount

        __add__(other):
            1. If other is not Money or currency differs, raise ValueError
            2. Return new Money(self.amount + other.amount, self.currency)

        __sub__(other): same pattern as __add__ but subtract

        __mul__(scalar):
            1. If scalar is not int/float, return NotImplemented
            2. Return new Money(self.amount * scalar, self.currency)

        __rmul__(scalar): return self.__mul__(scalar)

        __bool__: return self.amount != 0
    """

    def __init__(self, amount: float, currency: str = "USD"):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE

    def __str__(self):
        pass  # YOUR CODE HERE

    def __eq__(self, other):
        pass  # YOUR CODE HERE

    def __lt__(self, other):
        pass  # YOUR CODE HERE

    def __add__(self, other):
        pass  # YOUR CODE HERE

    def __sub__(self, other):
        pass  # YOUR CODE HERE

    def __mul__(self, scalar):
        pass  # YOUR CODE HERE

    def __rmul__(self, scalar):
        pass  # YOUR CODE HERE

    def __bool__(self):
        pass  # YOUR CODE HERE


class Playlist:
    """A playlist of songs that supports container operations.

    Attributes:
        name: the playlist name
        _songs: internal list of song title strings

    Magic Methods to Implement:
        __repr__: return "Playlist('{name}', {n} songs)"
        __str__: return "{name} ({n} songs)"
        __len__: return number of songs
        __getitem__(index): return song at index (support slicing)
        __contains__(song): return True if song is in playlist
        __iter__: iterate over songs
        __add__(other): combine two playlists into a new one

    Regular Methods:
        add_song(title): append a song title
        remove_song(title): remove first occurrence (raise ValueError if missing)

    Pseudocode:
        __init__(name):
            1. Store name, initialize _songs as empty list

        add_song(title): append to _songs
        remove_song(title): remove from _songs (ValueError if not found)

        __len__: return len(self._songs)
        __getitem__(index): return self._songs[index]
        __contains__(song): return song in self._songs
        __iter__: return iter(self._songs)

        __add__(other):
            1. Create new Playlist named "{self.name} + {other.name}"
            2. Add all songs from self, then all from other
            3. Return the new playlist
    """

    def __init__(self, name: str):
        pass  # YOUR CODE HERE

    def add_song(self, title: str):
        pass  # YOUR CODE HERE

    def remove_song(self, title: str):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE

    def __str__(self):
        pass  # YOUR CODE HERE

    def __len__(self):
        pass  # YOUR CODE HERE

    def __getitem__(self, index):
        pass  # YOUR CODE HERE

    def __contains__(self, song):
        pass  # YOUR CODE HERE

    def __iter__(self):
        pass  # YOUR CODE HERE

    def __add__(self, other):
        pass  # YOUR CODE HERE


class Temperature:
    """A temperature class with property-based conversion.

    Stores temperature internally in Celsius.
    Provides properties for Fahrenheit and Kelvin that auto-convert.

    Properties:
        celsius (read/write): get or set the temperature in Celsius
        fahrenheit (read/write): get or set in Fahrenheit (auto-converts)
        kelvin (read/write): get or set in Kelvin (auto-converts)

    Validation:
        Temperature cannot go below absolute zero (-273.15 C).
        Raise ValueError if any setter receives a value below absolute zero.

    Conversions:
        F = C * 9/5 + 32
        C = (F - 32) * 5/9
        K = C + 273.15
        C = K - 273.15

    Magic Methods:
        __repr__: return "Temperature({celsius:.2f}°C)"
        __str__: return "{celsius:.1f}°C / {fahrenheit:.1f}°F / {kelvin:.1f}K"
        __eq__: equal if celsius values match (within 0.01)
        __lt__: less if celsius is less

    Pseudocode:
        __init__(celsius=0.0):
            1. Use the celsius setter to store and validate

        celsius property:
            getter: return self._celsius
            setter: validate >= -273.15, then set self._celsius

        fahrenheit property:
            getter: convert self._celsius to F and return
            setter: convert F to C, then use celsius setter

        kelvin property:
            getter: convert self._celsius to K and return
            setter: convert K to C, then use celsius setter
    """

    def __init__(self, celsius: float = 0.0):
        pass  # YOUR CODE HERE

    @property
    def celsius(self) -> float:
        pass  # YOUR CODE HERE

    @celsius.setter
    def celsius(self, value: float):
        pass  # YOUR CODE HERE

    @property
    def fahrenheit(self) -> float:
        pass  # YOUR CODE HERE

    @fahrenheit.setter
    def fahrenheit(self, value: float):
        pass  # YOUR CODE HERE

    @property
    def kelvin(self) -> float:
        pass  # YOUR CODE HERE

    @kelvin.setter
    def kelvin(self, value: float):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE

    def __str__(self):
        pass  # YOUR CODE HERE

    def __eq__(self, other):
        pass  # YOUR CODE HERE

    def __lt__(self, other):
        pass  # YOUR CODE HERE
