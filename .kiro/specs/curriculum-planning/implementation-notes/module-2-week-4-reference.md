# Module 2 Week 4 Reference Brief

This reviewer-only brief defines the intended behavior for `curriculum/02-module-2-first-principles/week-04-transformer/`.

Do not copy a full implementation into the learner-facing folder. Use this brief to validate that the future tests and workbench scaffold are solvable and aligned with the lesson goal.

## Lesson Goal

Learners assemble a tiny transformer-style forward pass with plain Python:

1. map token IDs to small embedding vectors
2. project embeddings into query, key, and value vectors
3. reuse scaled dot-product self-attention from Week 3 ideas
4. add a residual connection
5. normalize vectors with a small deterministic layer-normalization helper
6. run a tiny feed-forward step
7. return contextual vectors plus trace metadata

## Intended Public Functions

The future `workbench.py` should expose small functions such as:

- `add_vectors(left, right)`
- `layer_norm(vector, epsilon=1e-6)`
- `lookup_embeddings(token_ids, embedding_table)`
- `project_vector(vector, matrix)`
- `project_sequence(vectors, matrix)`
- `self_attention(vectors, projection_matrices)`
- `feed_forward(vector, weights, bias)`
- `transformer_block(token_ids, embedding_table, projection_matrices, feed_forward_weights, feed_forward_bias)`

Names can change if the learner-facing README and tests stay clear, but the behavior should remain this small.

## Expected Behavior

- Vector helpers reject mismatched dimensions with clear `ValueError` messages.
- Empty token input returns an empty output plus trace metadata, or raises a clear `ValueError`; choose one behavior and test it consistently.
- Embedding lookup preserves token order.
- Projection output shapes are deterministic.
- Self-attention returns one contextual vector for each input token.
- Attention weights are inspectable and grouped by target token.
- Residual addition preserves original signal before normalization.
- Layer normalization is numerically stable for tiny vectors.
- The feed-forward step is deterministic and uses plain list operations.
- The final trace includes enough information for a learner to debug shape, attention, and output issues.

## What To Avoid

- No NumPy, PyTorch, transformer libraries, GPUs, or model downloads.
- No LLM API calls.
- No optimized matrix abstractions that hide the shape reasoning.
- No full GPT training.
- No financial prediction or advice language.

## Suggested Edge Cases

- mismatched vector lengths
- missing token ID in embedding table
- empty token sequence
- projection matrix with the wrong width
- all-equal vectors for layer normalization
- attention weights that are close enough to discourage overconfident explanation
