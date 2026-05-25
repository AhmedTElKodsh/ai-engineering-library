# Phase 3: Market Context Attention Lab

Folder: `week-03-attention`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_tiny_attention.py`

## Learning Goal

Implement scaled dot-product attention with plain Python and explain how a model can focus on the most relevant parts of market context.

## Success Looks Like

- The tests pass because vector scoring, scaling, softmax, weighted sums, source alignment, and attention explanations work.
- Your trace note identifies the highest-weight source and explains why that weight is useful but not perfect evidence.
- Your reflection names what attention helps debug and what it cannot prove about a final answer.

## Real-World Context

FinAgent will eventually read a question, retrieved market notes, and a draft answer together. Attention is one of the mechanisms that lets a model decide which tokens or chunks should influence the next representation most strongly.

This chapter keeps the math small:

1. Compare a query vector to key vectors.
2. Scale the scores.
3. Convert scores into weights with softmax.
4. Use the weights to blend value vectors.
5. Inspect which source received the most attention.

No NumPy. No transformer library. Just lists, loops, and tests.

## Story

FinAgent retrieves three market notes:

- AAPL revenue improved.
- MSFT cloud margins expanded.
- TSLA deliveries fell.

The user asks about Apple revenue. Phase 2 retrieved notes by similarity. Phase 3 asks a deeper question:

> If the model has a query vector, how does it distribute focus across available context vectors?

You will build that attention step directly.

## Read

Scaled dot-product attention follows this pattern:

```text
scores = query dot each key
scaled_scores = scores / sqrt(vector_size)
weights = softmax(scaled_scores)
output = weighted sum of values
```

The weights are the most inspectable part. They show how much each source contributed to the output vector.

## Trace

Before editing code, inspect `workbench.py` and answer:

1. Which function compares two vectors?
2. Which function turns raw scores into probabilities?
3. Why does attention need keys and values?
4. Which result field would help debug a bad FinAgent answer?
5. What should happen if the query and key dimensions do not match?

## Explain

Write short answers before coding:

1. Why are attention weights useful for debugging?
2. Why does softmax make weights sum to 1?
3. Why is scaling by square root of dimension used?
4. What is still missing between this chapter and a real transformer?

## Modify

Start with the smallest math:

1. Implement `dot_product`.
2. Implement `softmax`.
3. Run the tests.
4. Implement `weighted_sum`.
5. Then wire the full attention result.

Keep each function simple enough to explain aloud.

## Create

Complete the TODOs in `workbench.py`:

- `dot_product`
- `scale_scores`
- `softmax`
- `weighted_sum`
- `attention`
- `most_attended_source`
- `explain_attention`

## Verify

Run from this folder:

```powershell
python -m pytest tests -v
```

The tests intentionally fail at first. Use one failure at a time as your guide.

## Reflect

- Which context source received the most attention?
- Did the highest attention source match your intuition?
- What would happen if all keys looked equally relevant?
- Why should FinAgent not treat attention weights as perfect explanations?

## Extension

Add one test where two sources receive similar scores, then explain why the model should avoid overconfident wording in that case.

## Evidence Artifact

Write a short attention trace:

```text
Query intent:
Top source ID:
Top ticker:
Top attention weight:
Why that source received focus:
Why this is not a final explanation:
```

## Connection To Phase 2

Phase 2 retrieved candidate notes. Phase 3 shows how a model-like mechanism can distribute focus across candidate context. Later modules will connect retrieval, attention, and generation into agent workflows.
