# Hints

Use these one at a time. Try the code before reading the next hint.

Before each hint, write down:

1. the test that is failing
2. the function it points to
3. what you expect the function to return or raise

## Hint 1: Validate Rows First

`StockPrice.from_row` is the gatekeeper. If bad rows pass through, every later calculation becomes harder to trust.

## Hint 2: Ticker and Date

Normalize ticker with `strip().upper()`. For the date, this project only requires a simple `YYYY-MM-DD` shape check: length 10 and dashes at positions 4 and 7.

## Hint 3: CSV Loading

Use:

```python
with open(csv_path, newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
```

Then convert each row with `StockPrice.from_row`.

## Hint 4: Grouping

Start with an empty dictionary. For each price:

```python
grouped.setdefault(price.ticker, []).append(price)
```

## Hint 5: Moving Average

For each valid window, slice the values and divide by `window`.

## Hint 6: Metrics

For each ticker, collect closes with a list comprehension. Reuse `percentage_change` and `moving_average` instead of duplicating calculations.

## Hint 7: Rendering

The final report should join text lines with `"\n"`. Include the disclaimer in plain language.
