# Hints: FinAgent Risk Signal Extension

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

## Layer 3

### Reading The Tests

If a threshold test fails, inspect the boundary value first.

If the risk label is right but the summary fails, compare the summary requirements one by one instead of changing the risk helper.

If an old movement test breaks, the extension may have changed behavior that should have stayed stable.

### Final Check

Run the risk-label tests before the summary tests. Then run the whole week to prove the extension did not regress the original FinAgent path.
