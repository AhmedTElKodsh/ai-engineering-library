# Validation: Module 5 Week 4 Reproducible Package

Scaffold: `curriculum/main-track/extended-concepts/03-production-depth/week-01-reproducible-package/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/03-production-depth/week-01-reproducible-package --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/03-production-depth/week-01-reproducible-package -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to manifest, validation, container plan, or runbook behavior.

## Reviewer Checks

- Confirm non-root container plan is tested.
- Confirm missing manifest fields are named.
- Confirm runbook includes test and run commands.
