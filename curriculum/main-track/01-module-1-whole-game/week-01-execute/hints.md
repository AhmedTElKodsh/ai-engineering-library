# Hints: First FinAgent Stock Summary

Use these only after you have read the failing test and found the function it names.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the behavior is clear but the final summary still fails.

## Layer 1

Treat this lab as a tiny FinAgent pipeline: parse prices, calculate movement, validate ticker, then assemble a safe educational summary.

Before editing, answer:

- Is the failure about input cleanup, numeric calculation, label selection, or summary wording?
- Should bad input raise an exception or become part of a safe response?
- Which helper should own this behavior so it is not duplicated later?

## Layer 2

### Price Parsing

Clean the price text before converting it. Think about whitespace and a leading currency marker.

A numeric value can still be invalid for this lesson. Prices at or below zero should not continue into movement calculations.

### Movement Calculation

Percentage change compares the difference between current and previous prices against the previous price. The sign matters because it drives the movement label.

Use the threshold rules from the docstring. Values near the boundary are the cases most likely to reveal an off-by-one style mistake.

### Ticker And Summary

Normalize the ticker before validating it. The lesson uses a small uppercase alphabetic ticker, not arbitrary symbols.

The final summary should include the core facts a reader needs and the educational disclaimer. Keep it factual, not advisory.

## Layer 3

### Reading The Tests

If a test checks rounded text, first confirm the raw number is correct, then inspect formatting.

If a test expects `ValueError`, do not return a fallback price or ticker.

If the summary test fails, list the required words and facts from the assertion before rewriting the whole sentence.

### Final Check

After each helper passes, run the full Week 01 module test so the summary uses the same behavior as the lower-level functions.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
