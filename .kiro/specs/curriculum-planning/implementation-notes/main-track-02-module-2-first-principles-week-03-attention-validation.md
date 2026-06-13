# Validation: Module 2 Phase 3 Attention

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-03-attention/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/02-module-2-first-principles/week-03-attention --collect-only -q
python -m pytest curriculum/main-track/02-module-2-first-principles/week-03-attention -q
```

## Expected Starter State

Collection should succeed. Starter failures should point at attention primitives.

## Reviewer Checks

- Confirm tests cover score scaling, softmax, weighted sums, and unaligned inputs.
- Confirm source explanation is tested, not just numeric output.
- Confirm the lesson remains plain Python.
