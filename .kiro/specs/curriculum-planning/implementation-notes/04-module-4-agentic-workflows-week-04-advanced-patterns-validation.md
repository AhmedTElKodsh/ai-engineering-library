# Validation: Module 4 Phase 4 Critique And Review Loop

Scaffold: `curriculum/04-module-4-agentic-workflows/week-04-advanced-patterns/workbench.py`

## Commands

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-04-advanced-patterns --collect-only -q
python -m pytest curriculum/04-module-4-agentic-workflows/week-04-advanced-patterns -q
```

## Expected Starter State

Collection should succeed. TODO failures should point to critique, retry, revision, or review-loop behavior.

## Reviewer Checks

- Confirm unsafe advice and missing citations are both tested.
- Confirm retry limit behavior is explicit.
- Confirm final trace includes critique/revision evidence.
