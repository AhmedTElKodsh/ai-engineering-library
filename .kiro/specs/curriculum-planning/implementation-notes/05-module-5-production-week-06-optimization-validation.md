# Validation: Module 5 Week 6 Optimization Tradeoffs

Scaffold: `curriculum/05-module-5-production/week-06-optimization/workbench.py`

## Commands

```powershell
python -m pytest curriculum/05-module-5-production/week-06-optimization --collect-only -q
python -m pytest curriculum/05-module-5-production/week-06-optimization -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to cost, latency, caching, retry, or report behavior.

## Reviewer Checks

- Confirm retry policy distinguishes transient from permanent failures.
- Confirm cache decisions have deterministic criteria.
- Confirm report names budget actions.
