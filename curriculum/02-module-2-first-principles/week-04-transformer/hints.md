# Hints: Tiny Transformer Block Lab

## Hint 1: Vector Addition

Check lengths first. Residual connections only work when both vectors use the same dimensions.

## Hint 2: Layer Normalization

Compute the mean, then the variance:

```python
mean = sum(vector) / len(vector)
variance = sum((value - mean) ** 2 for value in vector) / len(vector)
```

If the variance is zero, returning zeros is a stable and easy-to-inspect behavior.

## Hint 3: Embeddings

Preserve token order. If the input IDs are `[30, 10, 20]`, the output vectors should follow that same order.

Return copies of vectors so later code does not accidentally mutate the embedding table.

## Hint 4: Projection

Treat each matrix row as one output dimension:

```text
output[0] = input dot matrix[0]
output[1] = input dot matrix[1]
```

Every row must have the same length as the input vector.

## Hint 5: Self-Attention

Use the same shape from Phase 3:

```text
score = query dot key
scaled_score = score / sqrt(vector_size)
weights = softmax(scaled_scores)
context = weighted_sum(weights, values)
```

Run that once for each query vector in the sequence.

## Hint 6: Feed-Forward

Start by projecting the vector. Then add the bias with `add_vectors`.

## Hint 7: Transformer Trace

The trace should help you debug without guessing. Useful fields include:

- `token_ids`
- `embedding_shape`
- `attention_weights`
- `attention_shape`
- `residual_vectors`
- `normalized_vectors`
- `output_shape`

## Hint 8: Empty Input

An empty token sequence should not crash. Return empty outputs and trace shapes that clearly say there were zero rows.
