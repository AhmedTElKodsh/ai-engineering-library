# Phase 1: First FinAgent Stock Summary

## How To Use This File

Read this file first. It defines the lesson objective, the minimum path, the expected evidence, and the verification command. Treat the local tests as the exact contract when implementation details feel unclear.

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | run pytest and read a scaffolded Python workbench. |
| What new capability am I adding? | execute the first deterministic FinAgent stock-summary slice. |
| What failure does this help me catch? | missing validation, incorrect movement math, and unsafe advice language. |
| How does this improve FinAgent or a practical AI system? | creates the first whole-game product loop learners can inspect. |
| What should I be able to explain afterward? | how input data becomes a safe educational market summary. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Milestone 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-01-execute`  
Expected time to finish: 3-4 hours  
File to edit: `workbench.py`  
Test folder: `tests/`

Learning path: read the behavior, run the test, trace the failure, make one
small change, verify, then write evidence.

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

Safety boundary: use `../../../../FINANCE_SAFETY.md` as the shared rulebook.
This project summarizes financial data for education; it must not provide
personalized investment advice or recommend trades.

## Function Contracts

Use the tests as the contract for this first slice. Keep the scope intentionally
small so the lesson stays focused on validation, calculation, and safety.

| Function | Accepts | Rejects or protects against | Required result |
| --- | --- | --- | --- |
| `parse_price` | plain numeric strings and strings with surrounding whitespace or one leading `$` | empty, non-numeric, zero, negative, or non-string values | positive `float` |
| `percentage_change` | positive previous close and current price numbers | zero or negative `previous_close`; negative `current_price` | percentage move from previous close |
| `classify_movement` | a percentage movement | boundary mistakes around `1.0` and `-1.0` | `up`, `down`, or `flat` |
| `validate_ticker` | 1-5 alphabetic characters, with optional surrounding whitespace or lowercase input | empty values, numbers, dotted symbols, and longer symbols | uppercase ticker |
| `build_stock_summary` | a `StockSnapshot` with valid ticker, prices, and source | unsafe advice wording, missing source, missing disclaimer, invalid prices | factual educational summary |

Ticker scope note: this lesson uses a simplified ticker rule, letters only and
1-5 characters. Real market symbols can be more complex; support for those is
outside Phase 1.

## Quick Win

Before editing code, run the test suite and identify the first failure:

```powershell
python -m pytest tests -v
```

Your first win is not making everything pass. Your first win is reading one failure and explaining what behavior it is asking for.

Expected first run: tests should collect cleanly and some behavior tests should
fail because `workbench.py` still contains TODO logic. Collection errors,
import errors, or missing dependency errors are setup problems. Assertion
failures from TODO behavior are the expected learner starting state.

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
5. What should happen if `snapshot.source` is empty?

Now inspect `tests/test_finagent_stock_summary.py`. This file defines the
behavior your implementation must satisfy. Answer:

1. Which test checks normal happy-path behavior?
2. Which test checks invalid input?
3. Which test protects the user from a misleading financial answer?
4. Which test should you make pass first?

## Modify

Use the baseline ritual for each behavior:

1. Run the focused test.
2. Read the failure.
3. Predict the cause before editing.
4. Name the failing test.
5. Restate the expected behavior in your own words.
6. Edit the smallest function involved.
7. Run that test again.
8. Move to the next failure.

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

Safe break example: temporarily allow an invalid ticker such as `123`, confirm
the ticker validation test catches it, then restore the correct rule.

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

Your trace note is the raw material for the weekly PR-style summary. Good
evidence includes:

- Test run before change:
- Failing test and what it taught:
- File/function inspected:
- Change made:
- Test run after change:
- Safety boundary cited:
- Remaining risk:

## Extension

Add a new test for a ticker with lowercase letters, then update the implementation so the final summary uses the uppercase ticker.

Next week, you will reuse this calculation and summary spine to add a risk
signal. Keep this week small and reliable so later changes have a clear base.

