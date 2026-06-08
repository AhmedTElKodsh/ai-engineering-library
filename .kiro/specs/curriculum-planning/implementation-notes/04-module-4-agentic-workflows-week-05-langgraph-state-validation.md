# Validation: Module 4 Phase 5 Framework State Machine

Scaffold: `curriculum/04-module-4-agentic-workflows/week-05-langgraph-state/workbench.py`

## Commands

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-05-langgraph-state --collect-only -q
python -m pytest curriculum/04-module-4-agentic-workflows/week-05-langgraph-state -q
```

## Expected Starter State

Collection should succeed. Starter failures should map to state classification, retrieval, answering, mutation, or summary behavior.

## Reviewer Checks

- Confirm refusal route is tested.
- Confirm state immutability is tested.
- Confirm summary metadata is enough for debugging.
