# Reference Behavior: Module 5 Week 5 Monitoring Review

Scaffold: `curriculum/05-module-5-production/week-05-monitoring/workbench.py`

## Intent

This lesson should teach structured operational evidence: log events, failure categories, monitoring summaries, and review loops.

## Intended Behavior

- Build log events with warning defaults for failures.
- Categorize failures such as citation and safety issues.
- Summarize monitoring events by category.
- Build review loops that name actions and owners.

## Reviewer Edge Cases

- Failure events should not default to success severity.
- Citation and safety failures should be distinguishable.
- Review-loop output should lead to concrete next actions.

## Do Not Accept

- Logs without structured fields.
- Generic `unknown` categories for known failure types.
- Monitoring summaries that cannot guide a review.
