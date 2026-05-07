"""Tests for Day 10: OOP — Classes & Inheritance."""
import pytest
import math

try:
    from solution_template import (
        Shape,
        Circle,
        Rectangle,
        Square,
        BankAccount,
        SavingsAccount,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a class?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(Shape), "Shape should be a class"
    assert callable(Circle), "Circle should be a class"
    assert callable(Rectangle), "Rectangle should be a class"
    assert callable(Square), "Square should be a class"
    assert callable(BankAccount), "BankAccount should be a class"
    assert callable(SavingsAccount), "SavingsAccount should be a class"


# ── Tests for Shape hierarchy ──────────────

def test_shape_base_class_raises():
    s = Shape("test")
    with pytest.raises(NotImplementedError):
        s.area()
    with pytest.raises(NotImplementedError):
        s.perimeter()


def test_circle_area():
    c = Circle(5)
    assert c.area() == pytest.approx(math.pi * 25, abs=0.01), (
        f"Circle(5).area() should be {math.pi * 25:.2f}, got {c.area()}"
    )


def test_circle_perimeter():
    c = Circle(5)
    assert c.perimeter() == pytest.approx(2 * math.pi * 5, abs=0.01), (
        f"Circle(5).perimeter() should be {2 * math.pi * 5:.2f}"
    )


def test_circle_is_shape():
    c = Circle(3)
    assert isinstance(c, Shape), "Circle should inherit from Shape"
    assert c.name == "circle"


def test_rectangle_area():
    r = Rectangle(4, 6)
    assert r.area() == 24, f"Rectangle(4, 6).area() should be 24, got {r.area()}"


def test_rectangle_perimeter():
    r = Rectangle(4, 6)
    assert r.perimeter() == 20, f"Rectangle(4, 6).perimeter() should be 20, got {r.perimeter()}"


def test_rectangle_describe():
    r = Rectangle(3, 4)
    desc = r.describe()
    assert "rectangle" in desc, "describe() should contain 'rectangle'"
    assert "12.00" in desc, "describe() should contain the area '12.00'"
    assert "14.00" in desc, "describe() should contain the perimeter '14.00'"


def test_square_is_rectangle():
    sq = Square(5)
    assert isinstance(sq, Rectangle), "Square should inherit from Rectangle"
    assert isinstance(sq, Shape), "Square should also be a Shape"


def test_square_area():
    sq = Square(5)
    assert sq.area() == 25, f"Square(5).area() should be 25, got {sq.area()}"


def test_square_name():
    sq = Square(5)
    assert sq.name == "square", (
        f"Square should have name 'square', got '{sq.name}'. "
        "Hint: Override self.name after calling super().__init__()"
    )


def test_square_perimeter():
    sq = Square(5)
    assert sq.perimeter() == 20, f"Square(5).perimeter() should be 20"


# ── Tests for BankAccount ──────────────────

def test_bank_account_creation():
    acc = BankAccount("Alice")
    assert acc.owner == "Alice"
    assert acc.balance == 0.0


def test_bank_account_initial_balance():
    acc = BankAccount("Bob", 100.0)
    assert acc.balance == 100.0
    assert len(acc.transaction_history) == 1, (
        "Initial deposit should be recorded in transaction_history"
    )


def test_bank_account_deposit():
    acc = BankAccount("Alice")
    result = acc.deposit(50.0)
    assert result == 50.0, f"deposit(50) should return 50.0, got {result}"
    assert acc.balance == 50.0


def test_bank_account_deposit_invalid():
    acc = BankAccount("Alice")
    with pytest.raises(ValueError):
        acc.deposit(-10)


def test_bank_account_withdraw():
    acc = BankAccount("Alice", 100.0)
    result = acc.withdraw(30.0)
    assert result == 70.0, f"After withdrawing 30 from 100, balance should be 70, got {result}"


def test_bank_account_withdraw_insufficient():
    acc = BankAccount("Alice", 50.0)
    with pytest.raises(ValueError, match="Insufficient funds"):
        acc.withdraw(100.0)


def test_bank_account_transfer():
    alice = BankAccount("Alice", 100.0)
    bob = BankAccount("Bob", 50.0)

    alice.transfer(bob, 30.0)

    assert alice.balance == 70.0, f"Alice should have 70.0, got {alice.balance}"
    assert bob.balance == 80.0, f"Bob should have 80.0, got {bob.balance}"


def test_bank_account_statement():
    acc = BankAccount("Alice", 100.0)
    acc.deposit(50.0)
    acc.withdraw(20.0)
    stmt = acc.get_statement()

    assert "Alice" in stmt, "Statement should contain owner name"
    assert "130.00" in stmt, "Statement should show current balance"
    assert "Deposit" in stmt, "Statement should list deposits"
    assert "Withdrawal" in stmt, "Statement should list withdrawals"


# ── Tests for SavingsAccount ──────────────

def test_savings_account_is_bank_account():
    sa = SavingsAccount("Alice", 1000.0)
    assert isinstance(sa, BankAccount), "SavingsAccount should inherit from BankAccount"


def test_savings_account_interest():
    sa = SavingsAccount("Alice", 1000.0, interest_rate=0.05)
    result = sa.apply_interest()
    assert result == pytest.approx(1050.0), (
        f"1000 * 0.05 = 50 interest, new balance should be 1050, got {result}"
    )


def test_savings_account_withdrawal_limit():
    sa = SavingsAccount("Alice", 1000.0, withdrawal_limit=200.0)
    with pytest.raises(ValueError):
        sa.withdraw(300.0)


def test_savings_account_withdraw_within_limit():
    sa = SavingsAccount("Alice", 1000.0, withdrawal_limit=200.0)
    result = sa.withdraw(150.0)
    assert result == 850.0, f"Expected 850.0 after withdrawing 150, got {result}"
