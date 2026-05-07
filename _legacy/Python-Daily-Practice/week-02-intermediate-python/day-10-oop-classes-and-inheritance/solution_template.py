"""
Day 10: OOP — Classes & Inheritance
functions organize code — classes organize data AND the code that operates on it

Learning Objectives:
- Define classes with __init__, instance attributes, and methods
- Use inheritance to create specialized subclasses
- Use super() for cooperative initialization
- Implement class methods and static methods
- Build a real-world class hierarchy

Concepts: classes, __init__, instance/class attributes, inheritance, super(), MRO
Builds On: Day 06 — functions and scope, Day 08 — error handling
Prepares For: Day 11 — magic methods, Day 14 — weekly project
"""

# ── Difficulty ──────────────────────────────
# Level: ★★★☆☆ (3/5)
# Estimated Time: 40 min

import math


class Shape:
    """Base class for geometric shapes.

    Attributes:
        name: the name of the shape (e.g. "circle", "rectangle")

    Methods:
        area() -> float: calculate the area (must be overridden)
        perimeter() -> float: calculate the perimeter (must be overridden)
        describe() -> str: return "{name}: area={area:.2f}, perimeter={perimeter:.2f}"

    Pseudocode:
        __init__(name):
            1. Store name as instance attribute

        area():
            1. Raise NotImplementedError — subclasses must override

        perimeter():
            1. Raise NotImplementedError — subclasses must override

        describe():
            1. Return f"{self.name}: area={self.area():.2f}, perimeter={self.perimeter():.2f}"
    """

    def __init__(self, name: str):
        pass  # YOUR CODE HERE

    def area(self) -> float:
        pass  # YOUR CODE HERE

    def perimeter(self) -> float:
        pass  # YOUR CODE HERE

    def describe(self) -> str:
        pass  # YOUR CODE HERE


class Circle(Shape):
    """A circle shape.

    Args:
        radius: the radius of the circle (positive float)

    Formulas:
        area = pi * r^2
        perimeter = 2 * pi * r

    Pseudocode:
        __init__(radius):
            1. Call super().__init__("circle")
            2. Store radius as instance attribute

        area():
            1. Return math.pi * self.radius ** 2

        perimeter():
            1. Return 2 * math.pi * self.radius
    """

    def __init__(self, radius: float):
        pass  # YOUR CODE HERE

    def area(self) -> float:
        pass  # YOUR CODE HERE

    def perimeter(self) -> float:
        pass  # YOUR CODE HERE


class Rectangle(Shape):
    """A rectangle shape.

    Args:
        width: the width (positive float)
        height: the height (positive float)

    Pseudocode:
        __init__(width, height):
            1. Call super().__init__("rectangle")
            2. Store width and height

        area(): return width * height
        perimeter(): return 2 * (width + height)
    """

    def __init__(self, width: float, height: float):
        pass  # YOUR CODE HERE

    def area(self) -> float:
        pass  # YOUR CODE HERE

    def perimeter(self) -> float:
        pass  # YOUR CODE HERE


class Square(Rectangle):
    """A square — a special case of rectangle where width == height.

    Args:
        side: the side length (positive float)

    Pseudocode:
        __init__(side):
            1. Call super().__init__(side, side)
            2. Override self.name = "square"
    """

    def __init__(self, side: float):
        pass  # YOUR CODE HERE


class BankAccount:
    """A basic bank account with deposit, withdraw, and transfer.

    Attributes:
        owner: the account owner's name
        balance: the current balance (starts at 0.0 or initial_balance)
        transaction_history: list of strings describing each transaction

    Methods:
        deposit(amount) -> float: add money, return new balance
        withdraw(amount) -> float: remove money, return new balance
        transfer(other, amount) -> float: move money to another account
        get_statement() -> str: multi-line summary

    Pseudocode:
        __init__(owner, initial_balance=0.0):
            1. Store owner and balance
            2. Initialize empty transaction_history list
            3. If initial_balance > 0, record "Initial deposit: {amount:.2f}"

        deposit(amount):
            1. Validate amount > 0 — raise ValueError if not
            2. Add amount to balance
            3. Append "Deposit: {amount:.2f}" to transaction_history
            4. Return new balance

        withdraw(amount):
            1. Validate amount > 0 — raise ValueError if not
            2. Validate amount <= balance — raise ValueError("Insufficient funds") if not
            3. Subtract amount from balance
            4. Append "Withdrawal: {amount:.2f}" to transaction_history
            5. Return new balance

        transfer(other, amount):
            1. Call self.withdraw(amount) — let it raise if insufficient
            2. Call other.deposit(amount)
            3. Append "Transfer to {other.owner}: {amount:.2f}" to self's history
            4. Append "Transfer from {self.owner}: {amount:.2f}" to other's history
            5. Return self's new balance

        get_statement():
            1. Build a multi-line string:
               "Account: {owner}"
               "Balance: {balance:.2f}"
               "--- Transactions ---"
               then each transaction on its own line
    """

    def __init__(self, owner: str, initial_balance: float = 0.0):
        pass  # YOUR CODE HERE

    def deposit(self, amount: float) -> float:
        pass  # YOUR CODE HERE

    def withdraw(self, amount: float) -> float:
        pass  # YOUR CODE HERE

    def transfer(self, other: "BankAccount", amount: float) -> float:
        pass  # YOUR CODE HERE

    def get_statement(self) -> str:
        pass  # YOUR CODE HERE


class SavingsAccount(BankAccount):
    """A savings account that earns interest and has a withdrawal limit.

    Args:
        owner: the account owner's name
        initial_balance: starting balance
        interest_rate: annual interest rate as a decimal (e.g. 0.05 for 5%)
        withdrawal_limit: max amount per single withdrawal

    Additional Methods:
        apply_interest() -> float: add interest to balance, return new balance

    Pseudocode:
        __init__(owner, initial_balance, interest_rate, withdrawal_limit):
            1. Call super().__init__(owner, initial_balance)
            2. Store interest_rate and withdrawal_limit

        withdraw(amount):
            1. Check amount <= withdrawal_limit — raise ValueError if not
            2. Call super().withdraw(amount)

        apply_interest():
            1. Calculate interest = balance * interest_rate
            2. Deposit the interest using self.deposit(interest)
            3. Replace the last transaction entry with "Interest: {interest:.2f}"
            4. Return new balance
    """

    def __init__(self, owner: str, initial_balance: float = 0.0,
                 interest_rate: float = 0.05, withdrawal_limit: float = 500.0):
        pass  # YOUR CODE HERE

    def withdraw(self, amount: float) -> float:
        pass  # YOUR CODE HERE

    def apply_interest(self) -> float:
        pass  # YOUR CODE HERE
