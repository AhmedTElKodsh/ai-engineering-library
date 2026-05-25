# Module 2 Week 3 Reference Behavior

This note records intended behavior for reviewers without placing complete answers in the learner-facing workbench.

## Intended Scope

Module 2 Week 3 introduces scaled dot-product attention for FinAgent market context. It should remain first-principles:

- plain Python only
- no NumPy
- no transformer library
- no LLM calls

## Expected Learner Behaviors

- `dot_product(left, right)` validates equal length and sums position-wise products.
- `scale_scores(scores, dimension)` divides each score by `sqrt(dimension)` and rejects non-positive dimensions.
- `softmax(scores)` returns stable softmax weights, with empty input returning an empty list.
- `weighted_sum(weights, values)` blends value vectors and validates alignment.
- `attention(query, keys, values, sources)` validates aligned keys, values, and sources; scores query against keys; scales scores; applies softmax; blends values; and returns `AttentionResult`.
- `most_attended_source(result)` returns the source with the largest weight, or `None` when no source exists.
- `explain_attention(result)` names the top source ID, ticker, and rounded attention weight.

## Pedagogical Intent

The tests are expected to fail in the learner workbench state. The first failures should guide learners through dot product, scaling, softmax, weighted sum, and only then the full attention operation.

The FinAgent callback is debugging which retrieved market note receives the most model-like focus before generation.
