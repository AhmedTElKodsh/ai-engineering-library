# Hints: Tiny Transformer Block Lab

Use these only after you have read the failing test and identified the transformer-block stage it exercises.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the shape is right but the trace or values still fail.

## Layer 1

Follow the transformer block as a sequence: embeddings, self-attention, residual addition, normalization, feed-forward projection, and trace reporting.

Before editing, answer:

- Is the failure about vector shape, value calculation, ordering, or trace metadata?
- Which stage receives the output of the previous stage?
- Should empty input return an empty result or raise?

## Layer 2

### Vectors And Embeddings

Residual addition requires equal-length vectors. Check shape before combining values.

Layer normalization should center and scale a vector in a stable way. If every value is identical, choose a deterministic safe output rather than dividing by zero.

Embedding lookup should preserve token order. Return independent vector values so later stages cannot accidentally mutate the embedding table.

### Projection And Attention

Projection treats each matrix row as one output dimension. Each row must be compatible with the input vector length.

Self-attention reuses the same pattern from the attention lab: score each key for a query, scale, normalize into weights, then mix values. Run that process once per token position.

Feed-forward work should compose smaller helpers rather than duplicating vector math.

### Trace And Empty Input

The trace should make debugging possible without guessing. Include enough shape and stage information to see where a value changed.

Empty input should produce empty outputs and trace fields that clearly show zero rows.

## Layer 3

### Reading The Tests

If a shape assertion fails, inspect the stage immediately before that shape is recorded.

If attention values fail, run the attention-helper tests first.

If trace output fails, add the missing diagnostic field without changing the model calculation.

### Final Check

Verify helper functions first, then the full transformer trace. Most full-block failures come from one earlier vector helper.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
