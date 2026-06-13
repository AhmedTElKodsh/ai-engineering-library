# Week 03: Post-Module-1 Stock Research Pipeline

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | trace Module 1 FinAgent behavior and Module 0 Python utilities. |
| What new capability am I adding? | build a CSV-backed stock data pipeline with validation and summaries. |
| What failure does this help me catch? | bad rows, missing prices, invalid windows, and unsafe summaries. |
| How does this improve FinAgent or a practical AI system? | gives FinAgent a deterministic data-loading spine before LLMs. |
| What should I be able to explain afterward? | how clean data flows from file to metrics to educational report. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

**Goal:** apply Python foundations after the student has completed Module 1's whole-game FinAgent workflow.

Complete this project after:

1. `week-00-diagnostic`
2. `week-01-python-essentials`, if the diagnostic showed Python gaps
3. `../01-module-1-whole-game`

Week 02 remains optional reinforcement. Use it before this project only when you are stuck on errors, context managers, classes, generators, or state updates.

## Mission

Build a local stock research pipeline from messy CSV data. This is the first larger bridge project after the student has seen the whole FinAgent workflow in Module 1.

The project is not about predicting the market. It is about writing reliable Python around financial data:

- validate inputs
- transform rows into domain objects
- calculate simple metrics
- summarize results safely
- test normal and failure paths

This is intentionally local and deterministic. No API keys, paid services, or live network calls are required.

## Progression From Module 1

Module 1 showed the whole FinAgent shape. This project rebuilds the data spine underneath it:

1. Read raw rows before trusting them.
2. Validate rows into typed objects.
3. Group objects by ticker so later tools can reason over one symbol at a time.
4. Calculate metrics from validated prices only.
5. Stream summary lines so report generation resembles later model streaming.
6. Render a bounded educational report with a clear limitation.

Every step protects the next one. If validation is loose, metrics become misleading. If metrics are unclear, the report becomes overconfident.

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

Suggested order:

1. `StockPrice.from_row`
2. `load_price_rows`
3. `group_by_ticker`
4. `percentage_change` and `moving_average`
5. `calculate_metrics`
6. `stream_summary_lines`
7. `build_report` and `render_report`

Run from `curriculum/main-track/00-python-foundations`:

```powershell
python -m pytest week-03-stock-pipeline/tests -v
```

Expected first run: the tests should fail because the stock pipeline starts as a
TODO project. Work from the first failing stage forward: validate one row, load
the CSV, group prices, calculate metrics, stream summaries, then render the
source-aware educational report.

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

## FinAgent Handoff Artifact

Before leaving this bridge project, write a short handoff note with:

- two functions that could become FinAgent tools or tool helpers
- one validation rule that protects users from misleading data
- one source or disclaimer behavior you should carry into the capstone

This note becomes evidence that the Python work is not isolated practice; it is preparing the safer AI engineering workflow that follows.

## Optional Review References

- Python CSV module: https://docs.python.org/3/library/csv.html
- Python dataclasses: https://docs.python.org/3/library/dataclasses.html
- Python contextlib: https://docs.python.org/3/library/contextlib.html
- Pytest assertions: https://docs.pytest.org/en/stable/how-to/assert.html
- Current pytest guide: https://realpython.com/pytest-python-testing/

