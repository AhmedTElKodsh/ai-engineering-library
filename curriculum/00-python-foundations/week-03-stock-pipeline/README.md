# Week 03: Post-Module-1 Stock Research Pipeline

**Goal:** apply Python foundations after the student has completed Module 1's whole-game FinAgent workflow.

Complete this project after:

1. `week-00-diagnostic`
2. `week-01-python-essentials`, if the diagnostic showed Python gaps
3. `../01-module-1-whole-game`

## Mission

Build a local stock research pipeline from messy CSV data. This is the first larger bridge project after the student has seen the whole FinAgent workflow in Module 1.

The project is not about predicting the market. It is about writing reliable Python around financial data:

- validate inputs
- transform rows into domain objects
- calculate simple metrics
- summarize results safely
- test normal and failure paths

This is intentionally local and deterministic. No API keys, paid services, or live network calls are required.

## Teaching Method

This project uses a cognitive apprenticeship plus project-based learning style:

- Model the workflow: first read the pipeline from input to output.
- Make thinking visible: predict data shapes before implementing functions.
- Scaffold the hard parts: TODOs, hints, and tests narrow the next step.
- Fade support gradually: later tasks ask you to combine earlier functions.
- Reflect on transfer: every concept maps to later AI engineering work.

When a Python concept blocks you, use `../concept-review-map.md` to review the concept and return to the project. The reference material is for understanding and best practices, not for copying final answers.

## Files

- `workbench.py`: learner implementation
- `data/sample_prices.csv`: small fixture dataset
- `tests/test_stock_pipeline.py`: behavior tests
- `hints.md`: layered hints
- `rubric.md`: completion gate

## Concepts Practiced

| Concept | Where You Use It |
| --- | --- |
| type hints | function signatures and `StockPrice` fields |
| exceptions | invalid ticker, date, and price handling |
| classes | `StockPrice` and `PipelineReport` |
| class methods | `StockPrice.from_row` |
| properties | `PipelineReport.ticker_count` |
| context managers | `load_price_rows` opens CSV files safely |
| comprehensions | grouping and filtering rows |
| generators | `stream_summary_lines` yields report lines |
| dictionaries | CSV rows, grouped tickers, metrics |
| tests | each TODO has behavior checks |

## How To Work

1. Open `data/sample_prices.csv` and describe each column.
2. Open `workbench.py` and trace the full flow: load, validate, group, calculate, stream, render.
3. Open the tests and predict which function each test exercises.
4. Run the tests once before editing.
5. Implement the smallest failing behavior.
6. Re-run only the relevant test.
7. Repeat until green.
8. Use `hints.md` only after you can name the exact blocker.

Run from `curriculum/00-python-foundations`:

```powershell
python -m pytest week-03-stock-pipeline/tests -v
```

## Optional Extension

After this project, the optional AI-client simulator lives at `extensions/ai-client-simulator`. It prepares you for later API and streaming lessons, but the stock pipeline is the required post-Module-1 bridge.

```powershell
python -m pytest extensions/ai-client-simulator/ai_client -v
```

## Reflection

After the tests pass, answer:

1. Why should bad prices raise an error instead of becoming zero?
2. Why is local deterministic data useful before connecting to a live API?
3. Which functions would become tools in FinAgent later?
4. Which tests protect users from misleading summaries?

## Optional Review References

- Python CSV module: https://docs.python.org/3/library/csv.html
- Python dataclasses: https://docs.python.org/3/library/dataclasses.html
- Python contextlib: https://docs.python.org/3/library/contextlib.html
- Pytest assertions: https://docs.pytest.org/en/stable/how-to/assert.html
