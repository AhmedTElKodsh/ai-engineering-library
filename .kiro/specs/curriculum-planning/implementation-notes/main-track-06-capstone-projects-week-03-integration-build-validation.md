# Validation: Module 6 Week 3 Runnable FinAgent Integration Build

Scaffold: `curriculum/main-track/06-capstone-projects/week-03-integration-build/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build --collect-only -q
python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to fixture loading, request
validation, retrieval, brief composition, provider validation, evaluation,
tool authority, refusal behavior, HTTP serialization, metrics, or workflow
trace. The learner should run one checkpoint filter at a time.

## Reviewer Checks

- Confirm request validation refuses malformed tickers and advice prompts.
- Confirm Block 1 produces a useful deterministic summary without retrieval.
- Confirm retrieved evidence is cited and ticker-matched.
- Confirm the educational brief names uncertainty and non-advice boundaries.
- Confirm workflow traces exist for success and refusal paths.
- Confirm invalid provider citations fail closed and retry stops after two attempts.
- Confirm the ten-case eval reports status, citation, and abstention failures.
- Confirm only the approved quote tool can return typed data.
- Confirm the real loopback HTTP test covers health, success, and malformed input.
- Confirm metrics label fixture and live-provider evidence separately.
- Confirm completion evidence includes an independent transfer change.
