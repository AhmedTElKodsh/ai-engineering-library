"""
Day 14 Weekly Project: Inventory Management System — Demo

Run this file to see the system in action:
    python main.py
"""

from datetime import date, timedelta
from core import (
    Product,
    PerishableProduct,
    Inventory,
    InventoryTransaction,
    OutOfStockError,
)
from utils import (
    generate_stock_report,
    generate_category_summary,
    find_products,
    format_price_list,
)


def main():
    # ── Set up inventory ───────────────────
    store = Inventory("Python Corner Store")

    # Add products
    store.add_product(Product("Widget", 9.99, 50, "hardware"))
    store.add_product(Product("Gadget", 24.99, 30, "electronics"))
    store.add_product(Product("Thingamajig", 4.99, 100, "hardware"))
    store.add_product(Product("Doohickey", 14.99, 0, "electronics"))

    # Add a perishable product
    tomorrow = date.today() + timedelta(days=1)
    yesterday = date.today() - timedelta(days=1)
    store.add_product(PerishableProduct("Fresh Milk", 3.49, 20, "dairy", tomorrow))
    store.add_product(PerishableProduct("Old Yogurt", 2.99, 5, "dairy", yesterday))

    # ── Display inventory ──────────────────
    print(f"=== {store.name} ===")
    print(f"Products: {len(store)}")
    print(f"Total Value: ${store.total_inventory_value:.2f}")
    print()

    # ── Price list ─────────────────────────
    print("--- Price List ---")
    print(format_price_list(store))
    print()

    # ── Process some sales ─────────────────
    print("--- Sales ---")
    try:
        with InventoryTransaction(store):
            store.sell_product("Widget", 5)
            print("Sold 5 Widgets")
            store.sell_product("Gadget", 2)
            print("Sold 2 Gadgets")
        print("Transaction committed!")
    except OutOfStockError as e:
        print(f"Transaction rolled back: {e}")
    print()

    # ── Try selling expired product ────────
    print("--- Expired Product Test ---")
    try:
        store.sell_product("Old Yogurt", 1)
    except OutOfStockError as e:
        print(f"Cannot sell: {e}")
    print()

    # ── Reports ────────────────────────────
    print("--- Stock Report ---")
    for item in generate_stock_report(store):
        print(f"  {item['name']:20s} qty={item['quantity']:3d}  "
              f"value=${item['total_value']:8.2f}  [{item['status']}]")
    print()

    print("--- Category Summary ---")
    for cat, info in generate_category_summary(store).items():
        print(f"  {cat}: {info['count']} products, ${info['total_value']:.2f}")
    print()

    # ── Search ─────────────────────────────
    print("--- Products under $10 in stock ---")
    cheap_available = find_products(store, max_price=10.0, in_stock=True)
    for p in cheap_available:
        print(f"  {p}")


if __name__ == "__main__":
    main()
