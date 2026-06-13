# Validation: Module 4 Phase 5 Framework State Machine

Scaffold: `curriculum/main-track/extended-concepts/02-agentic-systems/week-01-framework-state-machine/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-01-framework-state-machine --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-01-framework-state-machine -q
```

## Expected Starter State

Collection should succeed. Starter failures should map to state classification, retrieval, answering, mutation, or summary behavior.

## Reviewer Checks

- Confirm refusal route is tested.
- Confirm state immutability is tested.
- Confirm summary metadata is enough for debugging.
