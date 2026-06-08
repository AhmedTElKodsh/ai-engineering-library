# Validation: Module 1 Week 2 FinAgent Risk Signal Extension

Scaffold: `curriculum/01-module-1-whole-game/week-02-modify/workbench.py`

## Commands

```powershell
python -m pytest curriculum/01-module-1-whole-game/week-02-modify --collect-only -q
python -m pytest curriculum/01-module-1-whole-game/week-02-modify -q
```

## Expected Starter State

Collection should succeed. Tests should fail only where TODO risk behavior is missing.

## Reviewer Checks

- Confirm tests cover positive and negative movement.
- Confirm summary output stays grounded in deterministic inputs.
- Confirm finance-safety boundary remains visible.
