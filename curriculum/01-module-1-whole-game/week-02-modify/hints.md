# Hints: FinAgent Risk Signal Extension

## Hint 1

Keep the risk thresholds in one function. Do not duplicate the same `if` statements inside the summary builder.

## Hint 2

Use `abs(change_percent)` so the same thresholds work for upward and downward moves.

## Hint 3

Format percentages with two decimal places:

```python
f"{value:.2f}%"
```

## Hint 4

The final summary should include the ticker, movement, risk label, source, and educational disclaimer.
