# Phase 1: First FinAgent Stock Summary

Folder: `week-01-execute`  
Expected time to finish: 3-4 hours  
File to edit: `workbench.py`  
Test folder: `tests/`

## Learning Goal

Run the smallest useful slice of FinAgent: take a stock snapshot, compute basic movement, and produce a grounded research-style summary.

## Teaching Method

This lesson uses the curriculum's core pedagogy:

- **Whole game first:** you see the shape of a complete AI product slice before studying every internal detail.
- **Prediction before execution:** you inspect the code and tests, then predict what should happen.
- **Tests as teacher:** failing tests point to the next concept to practice.
- **Gradual release:** first trace, then modify, then create, then extend.
- **No solution filling:** the TODOs guide your thinking, but you write the implementation.

## Real-World Context

AI engineering is rarely only a model call. A useful system needs inputs, validation, calculations, evidence, and a final response that tells the user what is known and what is uncertain.

This lesson starts with a deterministic FinAgent slice before any LLM is added. That gives you a reliable baseline. Later modules will add tools, retrieval, agents, and model-generated language around this same spine.

## Read

FinAgent will eventually analyze market data, retrieve cited context, call tools, and generate an explainable brief. Today, the whole game is smaller:

1. Receive a ticker and two prices.
2. Validate that the ticker looks usable.
3. Calculate percentage change.
4. Classify the movement.
5. Return a concise summary with an educational disclaimer.

The important lesson is the system shape. Even advanced AI products are built from testable pieces like this.

## Quick Win

Before editing code, run the test suite and identify the first failure:

```powershell
python -m pytest tests -v
```

Your first win is not making everything pass. Your first win is reading one failure and explaining what behavior it is asking for.

Expected first run: tests should collect cleanly and some behavior tests should
fail because `workbench.py` still contains TODO logic.

## Trace

Open `workbench.py` and read these items before editing:

- `StockSnapshot`
- `parse_price`
- `percentage_change`
- `classify_movement`
- `build_stock_summary`

Do not write code yet. First, answer:

1. Which function validates numeric input?
2. Which function should reject a starting price of zero?
3. Which function creates the final user-facing text?
4. Where should the educational disclaimer appear?

Now inspect `tests/test_finagent_stock_summary.py` and answer:

1. Which test checks normal happy-path behavior?
2. Which test checks invalid input?
3. Which test protects the user from a misleading financial answer?
4. Which test should you make pass first?

## Modify

Run the tests once before editing:

```powershell
python -m pytest tests -v
```

Some tests should fail because the TODO behavior is missing. Read the first failing assertion and fix only that behavior.

Use this debugging loop:

1. Name the failing test.
2. Restate the expected behavior in your own words.
3. Edit the smallest function involved.
4. Run that test again.
5. Move to the next failure.

## Create

Complete the TODOs in `workbench.py`.

Suggested order:

1. `parse_price`
2. `percentage_change`
3. `classify_movement`
4. `validate_ticker`
5. `build_stock_summary`

## Section Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Price parsing | `python -m pytest tests -k parse_price -v` | explain how strings become trusted numeric values |
| Movement math | `python -m pytest tests -k percentage_change -v` | explain why zero previous close must fail |
| Ticker validation | `python -m pytest tests -k validate_ticker -v` | explain why FinAgent normalizes symbols before reporting |
| Safe summary | `python -m pytest tests -k build_stock_summary -v` | explain how source and disclaimer text protect users |

## Verify

Run:

```powershell
python -m pytest tests -v
```

All tests should pass when your implementation is complete.

When the suite passes, intentionally break one validation rule, run the tests, and observe which test catches it. Then restore the correct behavior. This builds trust in the tests instead of treating them as a mystery grader.

## Reflect

- Why is this lesson deterministic before adding an LLM?
- What would go wrong if `previous_close` were zero?
- Why should a stock summary include uncertainty and a disclaimer?
- Which test gave you the most useful feedback?

## Evidence Artifact

Write a short trace note:

```text
Input:
Validation:
Calculation:
Output:
Safety language:
Tests run:
Remaining risk:
```

## Extension

Add a new test for a ticker with lowercase letters, then update the implementation so the final summary uses the uppercase ticker.
