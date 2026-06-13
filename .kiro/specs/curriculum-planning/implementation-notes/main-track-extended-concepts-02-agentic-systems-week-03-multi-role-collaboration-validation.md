# Validation: Module 4 Phase 7 Multi-Role Review Workflow

Scaffold: `curriculum/main-track/extended-concepts/02-agentic-systems/week-03-multi-role-collaboration/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-03-multi-role-collaboration --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/02-agentic-systems/week-03-multi-role-collaboration -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to role assignment, handoff, review collection, outcome decision, or trace behavior.

## Reviewer Checks

- Confirm safety role is required for high-risk work.
- Confirm one-review-per-role behavior.
- Confirm escalation rules are deterministic.
