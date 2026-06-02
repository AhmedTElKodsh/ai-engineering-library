# Phase 2: FinAgent Risk Signal Extension

Folder: `week-02-modify`  
Expected time to finish: 2-3 hours  
File to edit: `workbench.py`  
Test folder: `tests/`

## Learning Goal

Extend the first FinAgent slice by adding a simple risk label and a richer summary without losing testability.

## Real-World Context

Financial analysis is not just "price went up" or "price went down." A useful assistant should also communicate uncertainty and risk. This lesson keeps the system deterministic so you can practice changing behavior safely before later modules add LLM calls, retrieval, and agents.

## Read

You will add one new idea to the Phase 1 stock summary:

- small movements should be treated as low risk
- moderate movements should be treated as watchlist risk
- large movements should be treated as high volatility

The goal is not to build a trading model. The goal is to practice a constrained product extension while tests protect behavior.

## Trace

Before editing, inspect:

- `workbench.py`
- `tests/test_finagent_risk_signal.py`

Answer before coding:

1. Which function should classify risk?
2. Which function should format the final report?
3. Which test checks the boundary between low and watchlist risk?
4. Which test protects the educational disclaimer?

## Modify

Run the tests:

```powershell
python -m pytest tests -v
```

Expected first run: tests should collect cleanly and fail on TODO behavior.
Read the first failure. Fix one TODO at a time.

## Create

Complete the TODOs in this order:

1. `risk_label`
2. `format_percent`
3. `build_risk_aware_summary`

## Section Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Risk thresholds | `python -m pytest tests -k risk_label -v` | explain why absolute movement handles up and down moves together |
| Percent formatting | `python -m pytest tests -k format_percent -v` | explain why consistent formatting matters in user-facing reports |
| Safe richer summary | `python -m pytest tests -k build_risk_aware_summary -v` | explain how richer wording still stays educational and source-grounded |

## Verify

Run:

```powershell
python -m pytest tests -v
```

The initial workbench is expected to fail. The lesson is complete when all tests pass because of your implementation.

## Reflect

- Why is risk labeling separate from movement labeling?
- What is dangerous about presenting a risk label too confidently?
- Which boundary test was easiest to misunderstand?
- How will this risk signal help the final FinAgent capstone?

## Evidence Artifact

Write a PR-style summary:

```text
Change:
Why it matters:
Tests run:
Boundary decision:
Safety limitation:
Remaining risk:
```

## Extension

Add a test for an exactly `5.0%` move and decide whether it belongs in watchlist or high-volatility risk. Explain your choice in one sentence.
