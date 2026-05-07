# Day 06: Functions and Scope

> You've been calling functions all week — today you'll master building your own.

**Concepts:** functions, default arguments, *args, **kwargs, closures, lambda, scope | **Difficulty:** ★★☆☆☆ | **Time:** ~35 min
**Builds On:** Day 01 — variables and types, Day 05 — control flow
**Prepares For:** Day 07 — weekly project, Week 02 — intermediate concepts

## Learning Objectives

By the end of this lesson, you will be able to:
- Define functions with mandatory and optional (default) arguments
- Use `*args` and `**kwargs` to handle flexible numbers of arguments
- Understand LEGB scope (Local, Enclosing, Global, Built-in)
- Create closures to maintain state between function calls
- Implement basic decorators to wrap and modify function behavior

## Your Task

Build several functions that demonstrate mastery of Python's functional features: apply discounts with defaults, create flexible greetings using keyword arguments, compose functions, implement a memoization cache, and build a stateful counter using closures.

## How to Work

This daily practice uses a two-step workflow to balance exploration with professional standards:

1. **Draft & Explore** in `exercises.ipynb`: Use the Jupyter Notebook as your interactive scratchpad. It's designed for visual feedback and rapid iteration.
2. **Formalize** in `solution_template.py`: Once your logic is solid, copy your functions into the Python script. This file is your "production" code.
3. **Verify** with the test suite:
   ```bash
   pytest test_solution.py -v
   ```
   **Goal:** Turn all failing tests green. Success reveals the expert model answers!
