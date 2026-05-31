# Hints: Market Context Attention Lab

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
