# Module 1 Week 2 Reference Implementation Note

This note records intended behavior for the Week 2 FinAgent risk-signal lesson without placing complete answers in the learner-facing `workbench.py`.

## Intended Behaviors

- `risk_label` uses absolute movement so positive and negative moves share the same risk thresholds.
- Absolute movement below `1.0%` returns `low`.
- Absolute movement from `1.0%` up to but not including `5.0%` returns `watchlist`.
- Absolute movement `5.0%` or greater returns `high volatility`.
- `format_percent` formats values with exactly two decimal places and a trailing `%`.
- `build_risk_aware_summary` includes ticker, movement label, formatted percentage, risk label, source, and an educational "not financial advice" disclaimer.

## Verification

The learner should run:

```powershell
python -m pytest tests -v
```

The workbench is expected to fail before the learner completes the TODOs. A passing suite represents successful learner implementation, not the initial curriculum state.
