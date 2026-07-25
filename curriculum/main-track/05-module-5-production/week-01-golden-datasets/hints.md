# Hints: Golden Dataset Evaluation

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

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
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### load_golden_examples

Use this hint entry for `load_golden_examples`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### evaluate_answer

Use this hint entry for `evaluate_answer`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### summarize_eval

Use this hint entry for `summarize_eval`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
