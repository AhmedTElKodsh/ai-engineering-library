# Hints: FinAgent Risk Signal Extension

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and identified whether it is testing risk labeling or summary composition.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the behavior works alone but fails inside the summary.

## Layer 1

This week extends the existing FinAgent instead of replacing it. Keep the old movement behavior working while adding the new risk signal.

Before editing, answer:

- Which helper should own the risk threshold decision?
- Does the risk rule care about direction, size, or both?
- Which summary facts are old requirements, and which are new?

## Layer 2

### Risk Signal

Keep the risk thresholds in one function. The summary builder should ask for the label instead of duplicating threshold branches.

Risk size should work for both upward and downward moves. Think about the magnitude of the change before choosing a label.

### Summary Output

The summary should combine ticker, movement, risk label, source, and educational disclaimer. Missing one fact usually means the summary is assembling from the wrong helper or skipping a required field.

Percentage formatting should be consistent with the earlier week. Confirm whether the test is checking the number or the displayed text.

For the summary test, list each required fragment before editing: ticker,
movement, formatted percent, risk label, source, and not-financial-advice text.

## Layer 3

### Reading The Tests

If a threshold test fails, inspect the boundary value first.

If the risk label is right but the summary fails, compare the summary requirements one by one instead of changing the risk helper.

If an old movement test breaks, the extension may have changed behavior that should have stayed stable.

### Final Check

Run the risk-label tests before the summary tests. Then run the whole week to prove the extension did not regress the original FinAgent path.
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

### risk_label

Use this hint entry for `risk_label`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### format_percent

Use this hint entry for `format_percent`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### movement_label

Use this hint entry for `movement_label`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_risk_aware_summary

Use this hint entry for `build_risk_aware_summary`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
