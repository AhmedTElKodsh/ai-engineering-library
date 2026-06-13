# Validation: Module 4 Phase 6 Resumable Orchestration

Scaffold: `curriculum/main-track/extended-concepts/02-agentic-systems/week-02-resumable-orchestration/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-02-resumable-orchestration --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-02-resumable-orchestration -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to checkpoint, retry, error, resume, or orchestration trace behavior.

## Reviewer Checks

- Confirm retry budget logic is tested.
- Confirm checkpoint idempotency is tested.
- Confirm trace reports retry behavior.
