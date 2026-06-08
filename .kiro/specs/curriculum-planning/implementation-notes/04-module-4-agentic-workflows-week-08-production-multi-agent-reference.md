# Reference Behavior: Module 4 Phase 8 Production Multi-Agent Boundaries

Scaffold: `curriculum/04-module-4-agentic-workflows/week-08-production-multi-agent/workbench.py`

## Intent

This lesson should keep multi-agent systems bounded with explicit policies, authorized actions, step limits, stop reasons, and run reports.

## Intended Behavior

- Authorize actions only when the tool is allowed and a reason is present.
- Stop at step limits or explicit stopped reasons.
- Refuse unauthorized tool use.
- Append authorized actions until max steps are reached.
- Build run reports listing agents, tools, actions, and stop reason.

## Reviewer Edge Cases

- Missing action reasons should fail authorization.
- Step-limit stop should be deterministic.
- Unauthorized attempts should be represented in trace/report evidence.

## Do Not Accept

- Free-running agent loops.
- Allowing tools outside policy.
- Reports that omit stop conditions.
