"""Tests for Day 14: Weekly Project — Inventory Management System."""
import pytest
from datetime import date, timedelta

try:
    from core import (
        Product,
        PerishableProduct,
        Inventory,
        InventoryTransaction,
        OutOfStockError,
        InvalidQuantityError,
    )
    from utils import (
        generate_stock_report,
        generate_category_summary,
        find_products,
        format_price_list,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import project modules: {e}",
        allow_module_level=True,
    )


# ── Product Tests ──────────────────────────

class TestProduct:
    def test_create_product(self):
        p = Product("Widget", 9.99, 10, "hardware")
        assert p.name == "Widget"
        assert p.price == 9.99
        assert p.quantity == 10
        assert p.category == "hardware"

    def test_product_total_value(self):
        p = Product("Widget", 9.99, 10)
        assert p.total_value == pytest.approx(99.9)

    def test_product_restock(self):
        p = Product("Widget", 9.99, 10)
        result = p.restock(5)
        assert result == 15
        assert p.quantity == 15

    def test_product_sell(self):
        p = Product("Widget", 9.99, 10)
        result = p.sell(3)
        assert result == 7
        assert p.quantity == 7

    def test_product_sell_out_of_stock(self):
        p = Product("Widget", 9.99, 2)
        with pytest.raises(OutOfStockError) as exc_info:
            p.sell(5)
        assert exc_info.value.product_name == "Widget"
        assert exc_info.value.requested == 5
        assert exc_info.value.available == 2

    def test_product_invalid_quantity(self):
        with pytest.raises(InvalidQuantityError):
            Product("Widget", 9.99, -1)

    def test_product_invalid_price(self):
        with pytest.raises(ValueError):
            Product("Widget", -5.0)

    def test_product_eq(self):
        p1 = Product("Widget", 9.99)
        p2 = Product("widget", 19.99)  # same name, different case
        assert p1 == p2

    def test_product_repr(self):
        p = Product("Widget", 9.99, 10)
        assert "Widget" in repr(p)
        assert "9.99" in repr(p)

    def test_product_str(self):
        p = Product("Widget", 9.99, 10, "hardware")
        s = str(p)
        assert "Widget" in s
        assert "9.99" in s


# ── PerishableProduct Tests ────────────────

class TestPerishableProduct:
    def test_perishable_not_expired(self):
        tomorrow = date.today() + timedelta(days=1)
        p = PerishableProduct("Milk", 3.49, 10, "dairy", tomorrow)
        assert p.is_expired is False

    def test_perishable_expired(self):
        yesterday = date.today() - timedelta(days=1)
        p = PerishableProduct("Old Milk", 3.49, 10, "dairy", yesterday)
        assert p.is_expired is True

    def test_perishable_sell_expired(self):
        yesterday = date.today() - timedelta(days=1)
        p = PerishableProduct("Old Milk", 3.49, 10, "dairy", yesterday)
        with pytest.raises(OutOfStockError):
            p.sell(1)

    def test_perishable_sell_not_expired(self):
        tomorrow = date.today() + timedelta(days=1)
        p = PerishableProduct("Milk", 3.49, 10, "dairy", tomorrow)
        result = p.sell(2)
        assert result == 8

    def test_perishable_str_expired(self):
        yesterday = date.today() - timedelta(days=1)
        p = PerishableProduct("Old Milk", 3.49, 5, "dairy", yesterday)
        assert "EXPIRED" in str(p)

    def test_perishable_is_product(self):
        p = PerishableProduct("Milk", 3.49, 10)
        assert isinstance(p, Product)


# ── Inventory Tests ────────────────────────

class TestInventory:
    def _make_inventory(self):
        inv = Inventory("Test Store")
        inv.add_product(Product("Widget", 9.99, 50, "hardware"))
        inv.add_product(Product("Gadget", 24.99, 30, "electronics"))
        inv.add_product(Product("Tool", 14.99, 10, "hardware"))
        return inv

    def test_add_product(self):
        inv = Inventory("Test")
        inv.add_product(Product("Widget", 9.99))
        assert "widget" in inv

    def test_add_duplicate(self):
        inv = Inventory("Test")
        inv.add_product(Product("Widget", 9.99))
        with pytest.raises(ValueError):
            inv.add_product(Product("Widget", 19.99))

    def test_len(self):
        inv = self._make_inventory()
        assert len(inv) == 3

    def test_contains(self):
        inv = self._make_inventory()
        assert "widget" in inv
        assert "Widget" in inv  # case-insensitive
        assert "nonexistent" not in inv

    def test_getitem(self):
        inv = self._make_inventory()
        p = inv["Widget"]
        assert p.name == "Widget"

    def test_iter(self):
        inv = self._make_inventory()
        products = list(inv)
        assert len(products) == 3

    def test_sell_product(self):
        inv = self._make_inventory()
        result = inv.sell_product("Widget", 5)
        assert result == 45

    def test_restock_product(self):
        inv = self._make_inventory()
        result = inv.restock_product("Widget", 10)
        assert result == 60

    def test_remove_product(self):
        inv = self._make_inventory()
        inv.remove_product("Widget")
        assert "Widget" not in inv
        assert len(inv) == 2

    def test_get_by_category(self):
        inv = self._make_inventory()
        hardware = inv.get_products_by_category("hardware")
        assert len(hardware) == 2

    def test_total_value(self):
        inv = Inventory("Test")
        inv.add_product(Product("A", 10.0, 5))
        inv.add_product(Product("B", 20.0, 3))
        assert inv.total_inventory_value == pytest.approx(110.0)


# ── InventoryTransaction Tests ─────────────

class TestInventoryTransaction:
    def test_commit_on_success(self):
        inv = Inventory("Test")
        inv.add_product(Product("Widget", 9.99, 50))

        with InventoryTransaction(inv):
            inv.sell_product("Widget", 10)

        assert inv["Widget"].quantity == 40

    def test_rollback_on_failure(self):
        inv = Inventory("Test")
        inv.add_product(Product("Widget", 9.99, 50))
        inv.add_product(Product("Gadget", 24.99, 5))

        with pytest.raises(OutOfStockError):
            with InventoryTransaction(inv):
                inv.sell_product("Widget", 10)   # succeeds (50 -> 40)
                inv.sell_product("Gadget", 100)  # fails — trigger rollback

        assert inv["Widget"].quantity == 50, (
            "Widget quantity should be rolled back to 50"
        )
        assert inv["Gadget"].quantity == 5, (
            "Gadget quantity should be rolled back to 5"
        )


# ── Utils Tests ────────────────────────────

class TestUtils:
    def _make_inventory(self):
        inv = Inventory("Test Store")
        inv.add_product(Product("Widget", 9.99, 50, "hardware"))
        inv.add_product(Product("Gadget", 24.99, 30, "electronics"))
        inv.add_product(Product("Tool", 14.99, 0, "hardware"))
        return inv

    def test_stock_report(self):
        inv = self._make_inventory()
        report = generate_stock_report(inv)
        assert len(report) == 3
        assert report[0]["total_value"] >= report[-1]["total_value"], (
            "Report should be sorted by total_value descending"
        )

    def test_stock_report_status(self):
        inv = self._make_inventory()
        report = generate_stock_report(inv)
        statuses = {r["name"]: r["status"] for r in report}
        assert statuses["Tool"] == "out_of_stock"

    def test_category_summary(self):
        inv = self._make_inventory()
        summary = generate_category_summary(inv)
        assert "hardware" in summary
        assert summary["hardware"]["count"] == 2

    def test_find_products_by_price(self):
        inv = self._make_inventory()
        results = find_products(inv, max_price=10.0)
        assert len(results) == 1
        assert results[0].name == "Widget"

    def test_find_products_in_stock(self):
        inv = self._make_inventory()
        results = find_products(inv, in_stock=True)
        names = [p.name for p in results]
        assert "Tool" not in names

    def test_format_price_list(self):
        inv = self._make_inventory()
        result = format_price_list(inv)
        assert "1." in result
        assert "$" in result
