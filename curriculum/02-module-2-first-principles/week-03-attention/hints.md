# Hints: Market Context Attention Lab

## Hint 1: Dot Product

Check vector lengths before calculating. A dot product only makes sense when both vectors use the same dimensions.

## Hint 2: Scaling

Use:

```python
math.sqrt(dimension)
```

Reject `dimension <= 0` so the function fails loudly instead of hiding bad data.

## Hint 3: Stable Softmax

Subtract the largest score before exponentiating:

```python
largest = max(scores)
exps = [math.exp(score - largest) for score in scores]
```

Then divide each exponent by the total.

## Hint 4: Weighted Sum

If values are:

```python
[[4.0, 0.0], [0.0, 8.0]]
```

and weights are:

```python
[0.25, 0.75]
```

the output is:

```python
[1.0, 6.0]
```

## Hint 5: Attention Input Alignment

`keys`, `values`, and `sources` should have the same number of rows. The query length should match every key length.

## Hint 6: Most Attended Source

Find the index of the largest weight, then return the source at the same index.

## Hint 7: Explanation

The explanation should be short and diagnostic. It is not an investment recommendation.

Include:

- source ID
- ticker
- attention weight rounded to two decimals
