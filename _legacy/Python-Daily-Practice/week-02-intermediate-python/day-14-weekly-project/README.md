# Day 14: Weekly Project — Inventory Management System

> pull together everything from this week: OOP, error handling, context managers, comprehensions, and Pythonic patterns

**Difficulty:** ★★★★☆ | **Time:** ~60 min
**Builds On:** Days 08-13 (all of Week 02)

## The Challenge

Build a small inventory management system for a store. You'll create a product catalog, manage stock levels, process orders, and generate reports — all using the patterns you learned this week.

## Architecture

```
core.py           → Product class, Inventory class, custom exceptions
utils.py          → Report generators, data formatting utilities
main.py           → Demo script that exercises all features
test_project.py   → Tests for the whole system
```

## Run Tests

    pytest test_project.py -v

## What You'll Practice

| Day | Concept | How It's Used |
|-----|---------|---------------|
| 08 | Error Handling | Custom exceptions for out-of-stock, invalid quantity |
| 09 | Context Managers | InventoryTransaction for atomic stock updates |
| 10 | OOP / Inheritance | Product base class, PerishableProduct subclass |
| 11 | Magic Methods | `__str__`, `__repr__`, `__eq__`, `__len__` on Inventory |
| 12 | Comprehensions | Report generation, filtering, aggregation |
| 13 | Pythonic Patterns | Unpacking, enumerate, pipeline for data processing |

## Hints

- Start with `core.py` — get the Product class working first
- Then build Inventory with add/remove/restock
- Add the context manager for transactions
- Finally, build the report utilities
