# Reference Behavior: Module 4 Phase 5 Framework State Machine

Scaffold: `curriculum/main-track/extended-concepts/02-agentic-systems/week-01-framework-state-machine/workbench.py`

## Intent

This lesson should rebuild an explicit workflow as state-machine behavior before learners reach for framework-managed orchestration.

## Intended Behavior

- Classify graph state and route advice requests to refusal.
- Retrieve evidence only for retrieval routes.
- Abstain in answer nodes when evidence is missing.
- Run state transitions without mutating the original state.
- Summarize state with debug metadata.

## Reviewer Edge Cases

- Advice-like requests should refuse even if other fields look valid.
- Missing evidence should produce abstention, not a fabricated answer.
- Original state objects should remain unchanged after running.

## Do Not Accept

- Framework dependency in the required path.
- Hidden mutation of state.
- Answers without route/debug metadata.
