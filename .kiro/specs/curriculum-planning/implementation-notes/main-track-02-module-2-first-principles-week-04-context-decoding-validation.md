# Validation: Module 2 Phase 4 Context Window And Decoding

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-04-context-decoding/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/02-module-2-first-principles/week-04-context-decoding --collect-only -q
python -m pytest curriculum/main-track/02-module-2-first-principles/week-04-context-decoding -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to context, decoding, or tradeoff-note behavior.

## Reviewer Checks

- Confirm token budget behavior is deterministic.
- Confirm decoding tests cover greedy and temperature paths.
- Confirm strategy notes explain tradeoffs rather than naming a model only.
