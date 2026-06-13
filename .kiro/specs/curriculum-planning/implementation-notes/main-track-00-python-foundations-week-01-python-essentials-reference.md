# Reference Behavior: Module 0 Week 1 Python Essentials

Scaffold: `curriculum/main-track/00-python-foundations/week-01-python-essentials/workbench.py`

## Intent

This lesson should refresh the Python primitives learners need before FinAgent: types, conversions, dictionaries, prompt strings, collections, branching, higher-order functions, decorators, and closures.

## Intended Behavior

- Classify Python values with `bool` handled before `int`.
- Convert numeric strings safely and reject invalid or negative values where required.
- Build dictionaries and prompt strings with stable keys and predictable formatting.
- Truncate, chunk, merge, group, and deduplicate collections without losing order.
- Implement small routing, validation, discount, memoization, retry, and counter patterns.

## Reviewer Edge Cases

- `unique_sources` should preserve first-seen order.
- Retry should stop after the configured attempt budget.
- Memoization should avoid recomputing identical calls.
- Unknown provider routes should be explicit rather than silently defaulting.

## Do Not Accept

- Broad `except Exception` blocks that hide the learning target.
- Reordered output where tests depend on stable order.
- Hidden global state that makes tests pass only in one order.
