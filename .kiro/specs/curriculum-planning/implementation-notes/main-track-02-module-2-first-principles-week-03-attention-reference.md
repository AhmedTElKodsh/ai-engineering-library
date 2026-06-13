# Reference Behavior: Module 2 Phase 3 Attention

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-03-attention/workbench.py`

## Intent

This lesson should make scaled dot-product attention inspectable through tiny vectors, weights, source attribution, and explanation text.

## Intended Behavior

- Compute dot products with dimension validation.
- Scale scores by square root of dimension.
- Convert scores to softmax weights that sum to one.
- Blend value vectors with weighted sums.
- Score one query against multiple keys and values.
- Identify the most-attended source and explain it with ticker/source/weight.

## Reviewer Edge Cases

- Empty softmax input should return an empty list.
- Mismatched vector dimensions should raise helpful errors.
- Empty attention results should produce no most-attended source.

## Do Not Accept

- Matrix libraries that hide the mechanism.
- Attention weights that do not sum to one.
- Explanations that omit the evidence source.
