# Reference Behavior: Module 4 Phase 6 Resumable Orchestration

Scaffold: `curriculum/main-track/extended-concepts/02-agentic-systems/week-02-resumable-orchestration/workbench.py`

## Intent

This lesson should teach checkpointing, retry budgets, error handling, resumption, and traceable orchestration.

## Intended Behavior

- Record checkpoints once per completed step.
- Retry only when an error exists and attempt budget remains.
- Handle step errors by recording attempts and messages.
- Resume from the next uncompleted step.
- Run orchestration with trace data that names retries and stop conditions.

## Reviewer Edge Cases

- Duplicate checkpoint calls should not duplicate completed steps.
- Attempt limits should stop retries.
- Resumption should be deterministic after partial progress.

## Do Not Accept

- Retrying forever.
- Losing error messages.
- Resuming from the wrong step after checkpoint state exists.
