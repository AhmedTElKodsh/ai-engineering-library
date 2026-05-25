# Module 1 Week 3 Reference Implementation Note

This note records intended behavior for the Week 3 local deployment-boundary lesson without placing complete answers in the learner-facing `workbench.py`.

## Intended Behaviors

- `validate_request` checks required fields: `ticker`, `previous_close`, `current_price`, and `source`.
- `validate_request` strips and uppercases ticker values, accepting only 1-5 alphabetic characters.
- `validate_request` converts price fields to floats and rejects zero or negative values.
- `validate_request` rejects empty sources.
- `analyze_move` returns `change_percent`, `movement`, and `risk`.
- `build_response` returns a dictionary with `ticker`, `analysis`, `summary`, `trace`, and `disclaimer`.
- `trace.operation` is `finagent.local_analysis`, `trace.source` mirrors the request source, and `trace.status` is `ok`.
- `handle_request` composes validation, analysis, and response building.

## Verification

The learner should run:

```powershell
python -m pytest tests -v
```

The workbench is expected to fail before the learner completes the TODOs. A passing suite represents successful learner implementation, not the initial curriculum state.
