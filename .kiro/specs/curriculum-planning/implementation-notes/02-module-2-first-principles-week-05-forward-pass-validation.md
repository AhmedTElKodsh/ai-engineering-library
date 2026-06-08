# Validation: Module 2 Phase 5 Context Window And Decoding

Scaffold: `curriculum/02-module-2-first-principles/week-05-forward-pass/workbench.py`

## Commands

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-05-forward-pass --collect-only -q
python -m pytest curriculum/02-module-2-first-principles/week-05-forward-pass -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to context, decoding, or tradeoff-note behavior.

## Reviewer Checks

- Confirm token budget behavior is deterministic.
- Confirm decoding tests cover greedy and temperature paths.
- Confirm strategy notes explain tradeoffs rather than naming a model only.
