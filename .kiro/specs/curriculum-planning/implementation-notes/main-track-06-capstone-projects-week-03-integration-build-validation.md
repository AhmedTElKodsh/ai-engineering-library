# Validation: Module 6 Week 3 Runnable FinAgent Integration Build

Scaffold: `curriculum/main-track/06-capstone-projects/week-03-integration-build/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build --collect-only -q
python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to fixture loading, request
validation, retrieval, brief composition, refusal behavior, or workflow trace.

## Reviewer Checks

- Confirm request validation refuses malformed tickers and advice prompts.
- Confirm retrieved evidence is cited and ticker-matched.
- Confirm the educational brief names uncertainty and non-advice boundaries.
- Confirm workflow traces exist for success and refusal paths.
