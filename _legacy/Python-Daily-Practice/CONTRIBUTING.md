# Contributing to Python Daily Practice

This document defines the conventions for creating curriculum content. It serves as the quality gate for all AI agents and human contributors generating templates, tests, and READMEs.

## Template File Convention (`solution_template.py`)

### Module Docstring (MANDATORY)

```python
"""
Day XX: [Title — Title Case, 3-6 Words]
[narrative connector — conversational, concrete, links yesterday to today]

Learning Objectives:
- [verb phrase: "Use", "Implement", "Apply", "Build"]
- [2-4 objectives per day]

Concepts: [comma-separated, lowercase]
Builds On: Day [NN] — [concept phrase]
Prepares For: Day [NN] — [concept phrase]
"""
```

### Section Headers (exact format)

```python
# ── Difficulty ──────────────────────────────
# Level: ★★☆☆☆ (2/5)
# Estimated Time: 30 min

# ── Data Flow ──────────────────────────────
# Input:  [description]
# Process: [description]
# Output: [description]

# ── Refresher ──────────────────────────────  (only when prerequisite needed)
# [concept]: [1-3 line reminder]
```

### Function Scaffolding

```python
def function_name(param: type) -> return_type:
    """
    [One sentence: what this function does — present tense]

    Args:
        param: [description — no type repeated]

    Returns:
        [description of return value]

    Pseudocode:
        1. [imperative verb phrase]
        2. [imperative verb phrase]
        3. [imperative verb phrase]
    """
    pass  # YOUR CODE HERE
```

### Class Scaffolding (OOP days)

```python
class ClassName:
    """
    [What this class represents — one sentence]

    Attributes:
        attr_name (type): [description]

    Pseudocode:
        - __init__: [what to initialize]
        - method_name: [what it does]
    """

    def __init__(self, param: type) -> None:
        """Initialize [ClassName] with [description]."""
        pass  # YOUR CODE HERE

    def method_name(self, param: type) -> return_type:
        """[One sentence description]."""
        pass  # YOUR CODE HERE
```

### Rules

- All imports pre-written at top of file
- Only `pass  # YOUR CODE HERE` as function/method body
- Never use `...` or `NotImplementedError`
- Never include `if __name__ == "__main__"` blocks
- Never include example output or solution hints in function bodies
- Type hints in signatures only, not repeated in docstrings

## Test File Convention (`test_solution.py`)

### Structure

```python
"""Tests for Day XX: [Title]."""
import pytest
from solution_template import function_1, function_2


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(function_1), "function_1 should be a callable function"


# ── Tests for function_1 ──────────────────
# Order: happy path → edge cases → error cases

def test_function1_basic_case():
    ...

def test_function1_edge_case():
    ...
```

### Assertion Message Format (3-part, MANDATORY)

```python
assert result == expected, (
    f"[What was tested]. "
    f"Expected {expected}, got {result}. "
    f"Hint: [conceptual nudge, never code]"
)
```

### Rules

- First test always passes on unmodified template (setup verification)
- Order: happy path → edge cases → error cases
- 5-8 test functions per daily exercise
- 10-15 test functions per weekly project
- Naming: `test_<function_name>_<what_it_tests>`
- Use `pytest.raises` for exception tests, never try/except
- Use `@pytest.mark.parametrize` only for same-behavior, different-inputs
- Test data inline for <5 items, module-level `TEST_` constants for shared data
- Handle ImportError gracefully with `pytest.skip()`

## README Convention

### Day README (10-15 lines max)

```markdown
# Day XX: [Title]

> [narrative connector]

**Concepts:** [tags] | **Difficulty:** ★★☆☆☆ | **Time:** ~30 min
**Builds On:** Day [N] ([concept])

## Your Task

[2-3 sentences, second person]

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, N failed — start implementing to turn them green!
```

### Week README

```markdown
# Week XX: [Theme Name]

[3-4 sentence overview]

## This Week's Journey

| Day | Topic | Difficulty |
|-----|-------|-----------|
| ... | ...   | ...       |

## Cheatsheet: [Theme] Patterns

**[Pattern label]:**
\```python
[code example]
\```
```

## Per-Directory `conftest.py` (MANDATORY for every day folder)

Every day directory **must** contain a `conftest.py` with this exact content:

```python
"""Ensure local imports resolve correctly under importlib mode."""
import sys
from pathlib import Path

_dir = str(Path(__file__).parent)

for _mod in ("solution_template", "core", "utils", "main"):
    sys.modules.pop(_mod, None)

if _dir in sys.path:
    sys.path.remove(_dir)
sys.path.insert(0, _dir)
```

This allows `pytest` to run tests across all days from the repository root without module naming collisions (every day uses `test_solution.py`). The `importlib` import mode is set in `pyproject.toml`.

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Week folders | `week-NN-kebab-theme` | `week-01-the-foundation` |
| Day folders | `day-NN-kebab-topic` | `day-05-error-handling` |
| Template files | `solution_template.py` | — |
| Notebook files | `exercises.ipynb` | — |
| Test files (daily) | `test_solution.py` | — |
| Test files (weekly) | `test_<module>.py` | `test_core.py` |
| Functions | `snake_case` | `merge_sorted_lists` |
| Classes | `PascalCase` | `BankAccount` |
| Constants | `UPPER_SNAKE` | `MAX_RETRIES` |

## Difficulty Scale

- ★☆☆☆☆ = One concept, ~20 min
- ★★☆☆☆ = Two concepts, ~30 min
- ★★★☆☆ = Multi-step, 3+ concepts, ~40 min
- ★★★★☆ = Design thinking, multiple functions, ~50 min
- ★★★★★ = Multi-file project, ~60-90 min

## Narrative Voice

Conversational and concrete — "Senior Engineer at Coffee Shop" tone.

- Good: *"yesterday you stored data in lists — today you'll give it names with dictionaries"*
- Bad: *"the journey deepens as we explore dictionaries"* (too poetic)
- Bad: *"dictionaries are hash maps"* (too textbook)

## Template Authoring Checklist

Before submitting any day's content, verify:

1. [ ] Module docstring has Title, narrative connector, Learning Objectives, Concepts, Builds On, Prepares For
2. [ ] Difficulty and Data Flow section headers use exact `# ── Name ──` format
3. [ ] All function/method bodies are `pass  # YOUR CODE HERE` only
4. [ ] No implementation code, example output, or `if __name__` blocks
5. [ ] All imports pre-written at top
6. [ ] Type hints in signatures, not docstrings
7. [ ] Pseudocode in every function docstring
8. [ ] Test file has setup verification as first test
9. [ ] Tests ordered: happy path → edge cases → error cases
10. [ ] Every assertion has 3-part message (context, expected/actual, hint)
11. [ ] Test count: 5-8 daily, 10-15 weekly
12. [ ] Day README is ≤15 lines
13. [ ] "Builds On" references earlier days only
14. [ ] "Prepares For" references later days only
15. [ ] Cross-platform: `pathlib.Path` only, no `os.path` with hardcoded separators
16. [ ] `conftest.py` present in day folder (copy from any existing day)
