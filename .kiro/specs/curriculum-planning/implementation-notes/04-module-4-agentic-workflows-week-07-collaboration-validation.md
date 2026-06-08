# Validation: Module 4 Phase 7 Multi-Role Review Workflow

Scaffold: `curriculum/04-module-4-agentic-workflows/week-07-collaboration/workbench.py`

## Commands

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-07-collaboration --collect-only -q
python -m pytest curriculum/04-module-4-agentic-workflows/week-07-collaboration -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to role assignment, handoff, review collection, outcome decision, or trace behavior.

## Reviewer Checks

- Confirm safety role is required for high-risk work.
- Confirm one-review-per-role behavior.
- Confirm escalation rules are deterministic.
