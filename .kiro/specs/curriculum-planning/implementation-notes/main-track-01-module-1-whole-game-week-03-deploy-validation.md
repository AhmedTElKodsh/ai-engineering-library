# Validation: Module 1 Week 3 Local FinAgent Request Boundary

Scaffold: `curriculum/main-track/01-module-1-whole-game/week-03-deploy/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/01-module-1-whole-game/week-03-deploy --collect-only -q
python -m pytest curriculum/main-track/01-module-1-whole-game/week-03-deploy -q
```

## Expected Starter State

Collection should succeed. TODO failures should point at request validation, analysis, response building, or composition.

## Reviewer Checks

- Confirm boundary tests cover malformed payloads.
- Confirm no hosted platform tooling is required.
- Confirm trace fields are deterministic and inspectable.
