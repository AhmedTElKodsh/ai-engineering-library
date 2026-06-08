# Validation: Module 5 Week 2 CI Regression Gate

Scaffold: `curriculum/05-module-5-production/week-02-cicd/workbench.py`

## Commands

```powershell
python -m pytest curriculum/05-module-5-production/week-02-cicd --collect-only -q
python -m pytest curriculum/05-module-5-production/week-02-cicd -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to eval loading, version notes, pass-rate computation, gate decisions, or report building.

## Reviewer Checks

- Confirm low-score and known-failure cases fail.
- Confirm version fields are required.
- Confirm checklist commands are repo-root commands.
