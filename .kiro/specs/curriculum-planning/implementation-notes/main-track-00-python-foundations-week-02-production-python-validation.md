# Validation: Module 0 Week 2 Production Python

Scaffold: `curriculum/main-track/00-python-foundations/week-02-production-python/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-02-production-python --collect-only -q
python -m pytest curriculum/main-track/00-python-foundations/week-02-production-python -q
```

## Expected Starter State

Collection should succeed. TODO behavior failures are expected until learners complete the workbench.

## Reviewer Checks

- Confirm the tests exercise error paths, not only happy paths.
- Confirm context-manager tests cover exception cleanup.
- Confirm generator tests check iterable behavior instead of only final values.
