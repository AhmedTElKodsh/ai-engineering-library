# Reference Behavior: Module 0 Week 0 Diagnostic

Scaffold: `curriculum/main-track/00-python-foundations/week-00-diagnostic/diagnostic_workbench.py`

## Intent

This diagnostic should expose Python readiness gaps without requiring any AI-specific setup. It is a measurement tool, not a teaching shortcut.

## Intended Behavior

- Return correct values for basic control-flow, data-structure, function, OOP, comprehension, generator, and exception tasks.
- Preserve input order where the tests make order meaningful.
- Raise the requested exception types for invalid age input.
- Keep implementations plain and readable enough for a beginner to inspect after the diagnostic.

## Reviewer Edge Cases

- `bool` values should not be accidentally treated as ordinary integers when classification matters.
- Empty collections should return empty outputs rather than errors unless the prompt says otherwise.
- Closure functions should remember the `factor` passed to `make_multiplier`.
- `Counter.decrement()` should not move below zero.

## Do Not Accept

- Hardcoded outputs that only satisfy the visible examples.
- Syntax-invalid TODO stubs.
- Solutions that hide beginner concepts behind advanced libraries.
