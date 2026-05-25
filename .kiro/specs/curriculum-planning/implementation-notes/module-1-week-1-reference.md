# Module 1 Week 1 Reference Implementation Note

This note records the intended behavior for the first FinAgent stock-summary lesson without placing the complete answer in the learner-facing `workbench.py`.

The learner-facing file should keep TODOs so students practice the curriculum loop:

`Read -> Trace -> Explain -> Modify -> Create -> Verify -> Reflect`

## Intended Behaviors

- `parse_price` strips whitespace, accepts a leading `$`, converts to `float`, and rejects empty, non-numeric, zero, or negative values.
- `percentage_change` rejects `previous_close <= 0` and returns `((current_price - previous_close) / previous_close) * 100`.
- `classify_movement` returns `up` for `>= 1.0`, `down` for `<= -1.0`, and `flat` otherwise.
- `validate_ticker` strips whitespace, uppercases input, and accepts only 1-5 alphabetic characters.
- `build_stock_summary` validates the ticker, computes movement, includes the source, and includes an educational "not financial advice" disclaimer.

## Verification

The learner should run:

```powershell
python -m pytest tests -v
```

The workbench is expected to fail before the learner completes the TODOs. A passing suite represents successful learner implementation, not the initial curriculum state.
