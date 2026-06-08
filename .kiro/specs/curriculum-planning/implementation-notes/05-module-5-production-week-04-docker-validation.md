# Validation: Module 5 Week 4 Reproducible Package

Scaffold: `curriculum/05-module-5-production/week-04-docker/workbench.py`

## Commands

```powershell
python -m pytest curriculum/05-module-5-production/week-04-docker --collect-only -q
python -m pytest curriculum/05-module-5-production/week-04-docker -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to manifest, validation, container plan, or runbook behavior.

## Reviewer Checks

- Confirm non-root container plan is tested.
- Confirm missing manifest fields are named.
- Confirm runbook includes test and run commands.
