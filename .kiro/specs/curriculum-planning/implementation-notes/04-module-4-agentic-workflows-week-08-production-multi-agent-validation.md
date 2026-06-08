# Validation: Module 4 Phase 8 Production Multi-Agent Boundaries

Scaffold: `curriculum/04-module-4-agentic-workflows/week-08-production-multi-agent/workbench.py`

## Commands

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-08-production-multi-agent --collect-only -q
python -m pytest curriculum/04-module-4-agentic-workflows/week-08-production-multi-agent -q
```

## Expected Starter State

Collection should succeed. TODO failures should point at policy, authorization, stop, append, or report behavior.

## Reviewer Checks

- Confirm authorization rejects missing reasons.
- Confirm max-step behavior is tested.
- Confirm reports include tools, agents, and stop reason.
