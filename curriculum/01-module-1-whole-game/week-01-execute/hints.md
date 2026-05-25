# Hints: First FinAgent Stock Summary

Use one hint at a time.

## Hint 1: Prices

`parse_price` should clean the string before converting it. Think about whitespace and a leading `$`.

## Hint 2: Invalid Prices

A price of `0` is numeric, but it is not valid for this lesson. Raise `ValueError` when the final number is less than or equal to zero.

## Hint 3: Percentage Change

The formula is:

```python
((current_price - previous_close) / previous_close) * 100
```

## Hint 4: Movement Labels

Use the thresholds from the docstring:

- `>= 1.0`: up
- `<= -1.0`: down
- otherwise: flat

## Hint 5: Ticker Validation

Normalize first with `strip().upper()`. Then check length and whether every character is alphabetic.

## Hint 6: Summary

The tests look for the ticker, the movement word, a percentage rounded to two decimals, the source, and the phrase `not financial advice`.
