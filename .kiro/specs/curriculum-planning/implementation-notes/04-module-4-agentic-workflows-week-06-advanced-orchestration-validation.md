# Validation: Module 4 Phase 6 Resumable Orchestration

Scaffold: `curriculum/04-module-4-agentic-workflows/week-06-advanced-orchestration/workbench.py`

## Commands

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-06-advanced-orchestration --collect-only -q
python -m pytest curriculum/04-module-4-agentic-workflows/week-06-advanced-orchestration -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to checkpoint, retry, error, resume, or orchestration trace behavior.

## Reviewer Checks

- Confirm retry budget logic is tested.
- Confirm checkpoint idempotency is tested.
- Confirm trace reports retry behavior.
