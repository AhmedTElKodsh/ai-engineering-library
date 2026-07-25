# Hints: Market Context Attention Lab

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and found the attention helper it names.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the math is close but the expected values differ.

## Layer 1

Think of attention as four steps: compare the query with each key, scale the scores, convert scores into weights, then mix the value vectors using those weights.

Before editing, answer:

- Which step is the test isolating?
- Do the input vectors have compatible shapes?
- Is the expected output a scalar, a list of weights, a vector, or a short explanation?

## Layer 2

### Dot Product And Scaling

A dot product only makes sense when both vectors use the same number of dimensions. Reject mismatched shapes before calculating.

Scaling uses the vector dimension to keep scores from growing too large. Invalid dimensions should fail loudly.

### Stable Softmax

Softmax should turn any list of scores into weights that add up to one. For numerical stability, reason about scores relative to the largest score rather than their raw size.

### Weighted Sum

Weighted sum combines each value vector according to its attention weight. Each output dimension is built from the same dimension across all value vectors.

### Attention Result

The query must align with every key. Keys, values, and sources should all have the same number of rows so scores, context, and source labels stay connected.

The most-attended source is the source at the same position as the largest attention weight.

## Layer 3

### Reading The Tests

If weights do not add up to one, inspect softmax before weighted sum.

If the context vector has the wrong length, inspect value-vector shape.

If the explanation fails, include diagnostic facts only: source ID, ticker, and attention weight. Do not turn it into advice.

### Final Check

Run shape-validation tests before numeric tests. Then run the full attention lab so the explanation is grounded in the same weights as the calculation.
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

### dot_product

Use this hint entry for `dot_product`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### scale_scores

Use this hint entry for `scale_scores`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### softmax

Use this hint entry for `softmax`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### weighted_sum

Use this hint entry for `weighted_sum`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### attention

Use this hint entry for `attention`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### most_attended_source

Use this hint entry for `most_attended_source`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### explain_attention

Use this hint entry for `explain_attention`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
