# Day 07: Weekly Project — Student Grade Analyzer

> six days of fundamentals, and now you put it all together into something real

**Concepts:** all Week 1 | **Difficulty:** ★★★☆☆ | **Time:** ~60-90 min
**Integrates:** Day 01 (types), Day 02 (strings), Day 03 (lists/tuples), Day 04 (dicts/sets), Day 05 (control flow), Day 06 (functions)

## The Project

Build a student grade analyzer that reads student records, computes statistics, assigns letter grades, and generates a formatted report. This is a multi-file project — `main.py` orchestrates, `core.py` holds the logic, `utils.py` provides helpers.

## Your Task

1. Implement helper functions in `utils.py` (formatting and validation)
2. Implement core logic in `core.py` (grade calculation, statistics, ranking)
3. Implement the orchestrator in `main.py` (ties everything together)

## Run Tests

    pytest test_core.py test_project.py -v

Expected on first run: 2 passed, ~20 failed — start with utils.py, then core.py, then main.py.
