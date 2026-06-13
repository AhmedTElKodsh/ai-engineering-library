# Validation: Module 4 Phase 3 Explicit Workflow Pattern Lab

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns --collect-only -q
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns -q
```

## Expected Starter State

Collection should succeed. Starter failures should map to case loading, routing, planning, tool use, gate checks, or trace summaries.

## Reviewer Checks

- Confirm workflow cases are fixture-backed.
- Confirm gate behavior blocks unsupported outputs.
- Confirm trace summaries are readable.
