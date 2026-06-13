# Validation: Module 5 Week 3 Local Service Boundary

Scaffold: `curriculum/main-track/05-module-5-production/week-03-fastapi/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/05-module-5-production/week-03-fastapi --collect-only -q
python -m pytest curriculum/main-track/05-module-5-production/week-03-fastapi -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to health, validation, refusal, error, or handler behavior.

## Reviewer Checks

- Confirm advice refusal is tested.
- Confirm health output is deterministic.
- Confirm service boundary remains local.
