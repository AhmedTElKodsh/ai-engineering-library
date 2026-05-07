"""
Day 14 Weekly Project: Inventory Management System — Core Module

This module contains:
- Custom exceptions (OutOfStockError, InvalidQuantityError)
- Product and PerishableProduct classes
- Inventory class with stock management
- InventoryTransaction context manager
"""

from datetime import date


# ── Custom Exceptions ──────────────────────

class OutOfStockError(Exception):
    """Raised when attempting to sell a product with insufficient stock.

    Attributes:
        product_name: name of the product
        requested: quantity requested
        available: quantity available
    """

    def __init__(self, product_name: str, requested: int, available: int):
        self.product_name = product_name
        self.requested = requested
        self.available = available
        super().__init__(
            f"Cannot sell {requested} of '{product_name}': only {available} in stock"
        )


class InvalidQuantityError(Exception):
    """Raised when a quantity is invalid (negative or zero)."""

    def __init__(self, quantity, message="Quantity must be a positive integer"):
        self.quantity = quantity
        super().__init__(f"{message}: got {quantity}")


# ── Product Classes ────────────────────────

class Product:
    """A product in the inventory.

    Attributes:
        name: product name
        price: unit price (positive float)
        quantity: units in stock (non-negative int)
        category: product category string

    Magic Methods:
        __repr__: "Product('name', price=X.XX, qty=N)"
        __str__: "name (category) — $X.XX — N in stock"
        __eq__: equal if same name (case-insensitive)
        __hash__: hash based on lowercase name

    Pseudocode:
        __init__(name, price, quantity=0, category="general"):
            1. Validate price > 0 (raise ValueError if not)
            2. Validate quantity >= 0 (raise InvalidQuantityError if negative)
            3. Store all attributes

        restock(amount):
            1. Validate amount > 0
            2. Add amount to quantity
            3. Return new quantity

        sell(amount):
            1. Validate amount > 0
            2. If amount > quantity, raise OutOfStockError
            3. Subtract amount from quantity
            4. Return new quantity

        total_value: property that returns price * quantity
    """

    def __init__(self, name: str, price: float, quantity: int = 0,
                 category: str = "general"):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE

    def __str__(self):
        pass  # YOUR CODE HERE

    def __eq__(self, other):
        pass  # YOUR CODE HERE

    def __hash__(self):
        pass  # YOUR CODE HERE

    @property
    def total_value(self) -> float:
        pass  # YOUR CODE HERE

    def restock(self, amount: int) -> int:
        pass  # YOUR CODE HERE

    def sell(self, amount: int) -> int:
        pass  # YOUR CODE HERE


class PerishableProduct(Product):
    """A product with an expiry date.

    Additional Attributes:
        expiry_date: a date object

    Additional Properties:
        is_expired: True if expiry_date < today's date

    Override:
        sell(amount): raise OutOfStockError if expired, otherwise call super().sell()
        __str__: append " [EXPIRED]" if expired, or " [exp: YYYY-MM-DD]" if not
    """

    def __init__(self, name: str, price: float, quantity: int = 0,
                 category: str = "perishable", expiry_date: date = None):
        pass  # YOUR CODE HERE

    @property
    def is_expired(self) -> bool:
        pass  # YOUR CODE HERE

    def sell(self, amount: int) -> int:
        pass  # YOUR CODE HERE

    def __str__(self):
        pass  # YOUR CODE HERE


# ── Inventory Class ────────────────────────

class Inventory:
    """Manages a collection of products.

    Attributes:
        name: inventory/store name
        _products: dict mapping product name (lowercase) to Product

    Magic Methods:
        __len__: number of unique products
        __contains__(product_name): True if product exists
        __getitem__(product_name): return the Product object
        __iter__: iterate over Product objects

    Methods:
        add_product(product): add a Product (raise ValueError if duplicate)
        remove_product(product_name): remove by name (raise KeyError if missing)
        sell_product(product_name, quantity): sell units
        restock_product(product_name, quantity): add stock
        get_products_by_category(category): list of products in that category
        total_inventory_value: property returning sum of all product total_values
    """

    def __init__(self, name: str):
        pass  # YOUR CODE HERE

    def add_product(self, product: Product):
        pass  # YOUR CODE HERE

    def remove_product(self, product_name: str):
        pass  # YOUR CODE HERE

    def sell_product(self, product_name: str, quantity: int) -> int:
        pass  # YOUR CODE HERE

    def restock_product(self, product_name: str, quantity: int) -> int:
        pass  # YOUR CODE HERE

    def get_products_by_category(self, category: str) -> list[Product]:
        pass  # YOUR CODE HERE

    @property
    def total_inventory_value(self) -> float:
        pass  # YOUR CODE HERE

    def __len__(self):
        pass  # YOUR CODE HERE

    def __contains__(self, product_name: str):
        pass  # YOUR CODE HERE

    def __getitem__(self, product_name: str):
        pass  # YOUR CODE HERE

    def __iter__(self):
        pass  # YOUR CODE HERE


# ── Context Manager ────────────────────────

class InventoryTransaction:
    """A context manager for atomic inventory operations.

    On enter: snapshot the current stock levels.
    On exit without error: commit (do nothing, changes stick).
    On exit with error: rollback all stock levels to the snapshot.

    Usage:
        inv = Inventory("Store")
        with InventoryTransaction(inv):
            inv.sell_product("Widget", 5)
            inv.sell_product("Gadget", 3)
            # if any sell fails, ALL changes are rolled back

    Pseudocode:
        __init__(inventory):
            1. Store the inventory reference
            2. self._snapshot = None

        __enter__:
            1. Take a snapshot: {name: product.quantity for all products}
            2. Return self

        __exit__(exc_type, exc_val, exc_tb):
            1. If exception occurred:
               a. Restore each product's quantity from snapshot
            2. Return False (don't suppress the exception)
    """

    def __init__(self, inventory: Inventory):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE
