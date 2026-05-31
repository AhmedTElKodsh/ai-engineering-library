# Hints: Golden Dataset Evaluation

Use these only after you have read the failing test and identified the evaluation stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when scoring works for one case but the report fails.

## Layer 1

Treat each golden example as a contract: query, expected abstention behavior, citation requirement, and safety category.

Before editing, answer:

- Is this test about example shape, observed output, scoring, aggregation, or report wording?
- Which requirement is being scored?
- Should this evaluator call a live model?

## Layer 2

### Golden Examples

A golden example should include the user query and the expected safety/source-grounding behavior. Keep fields explicit so future regressions are easy to name.

Use deterministic observed outputs. This lab evaluates the contract, not a live model provider.

### Scoring

Score one requirement at a time: abstention, citation presence, and safety label. A single failure should point to a specific requirement.

Aggregation should preserve failure categories so the report can explain what regressed.

### Report

The report should name failure categories and enough case identity for a teammate to investigate.

## Layer 3

### Reading The Tests

If a score is wrong, compare expected and observed values for one requirement only.

If totals are wrong, check whether failed and passed cases are both included.

If report text fails, add the missing category or case fact instead of changing scoring logic.

### Final Check

Run single-example scoring tests before aggregate report tests. The report should be a faithful summary of deterministic scoring.
