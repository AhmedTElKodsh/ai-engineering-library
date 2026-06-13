# Reference Behavior: Module 4 Phase 4 Critique And Review Loop

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-04-advanced-patterns/workbench.py`

## Intent

This lesson should teach critique, retry, revision, and human-review checkpoints without allowing unlimited autonomous loops.

## Intended Behavior

- Critique drafts for missing citations, unsafe advice, and weak limitations.
- Require human review for high-risk drafts.
- Decide retry behavior from attempt count and review state.
- Revise drafts by adding limitations while preserving citations.
- Run a bounded review loop with traceable critique and final decision.

## Reviewer Edge Cases

- Advice language should be flagged even if the draft has citations.
- Retry should stop at the attempt limit.
- Revision should not drop existing citation evidence.

## Do Not Accept

- Infinite or unbounded retry loops.
- Critiques that only check spelling or style.
- Human-review flags that are ignored downstream.
