# Reference Behavior: Module 2 Phase 4 Transformer Block

Scaffold: `curriculum/main-track/extended-concepts/01-model-internals/week-01-tiny-transformer/workbench.py`

## Intent

This lesson should assemble embeddings, projections, self-attention, residuals, normalization, feed-forward steps, and trace metadata into a tiny transformer-style block.

## Intended Behavior

- Add vectors and project vectors/sequences with dimension validation.
- Lookup copied embeddings in token order.
- Implement direct dot product, stable softmax, and weighted sum primitives.
- Run scaled dot-product self-attention over the input sequence.
- Apply residual, layer norm, and feed-forward behavior.
- Return `TransformerResult` with outputs and trace shapes/weights.

## Reviewer Edge Cases

- Empty token sequences should return empty outputs with trace shapes.
- Softmax should handle large logits stably.
- Weighted sum should reject unaligned weights and values.
- Embedding lookup should not expose mutable table references.

## Do Not Accept

- Numpy, PyTorch, or transformer libraries.
- Passing only final-output tests while bypassing the primitive functions.
- Trace metadata that hides attention weights or shapes.
