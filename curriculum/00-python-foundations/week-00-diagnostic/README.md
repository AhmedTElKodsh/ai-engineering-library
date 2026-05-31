# Week 00: Python Confidence Inventory

Before the journey begins, find your current Python footing.

**Time:** ~15-20 min  
**Purpose:** diagnostic placement, not a test you need to pass.

## Learning Goal

You will run a small diagnostic suite, read pytest output, and decide whether to move quickly or spend more time in Week 01.

## Where This Fits

This week answers one question: "What Python practice do I need before I can work confidently on FinAgent?"

Use the result like a map, not a grade:

1. If setup fails, fix your environment before touching learner code.
2. If only a few behavior tests fail and you understand why, move into Module 1 and keep `../concept-review-map.md` nearby.
3. If several tests fail or the assertions feel unfamiliar, use Week 01 as targeted remediation before Module 1.
4. After Module 1, return to Week 03 for the stock-pipeline bridge project.

## Step 1: Verify Your Setup

From `curriculum/00-python-foundations`:

```powershell
python -m pytest week-00-diagnostic/test_setup.py -v
```

Both tests should pass. If not, install Python 3.10+ and run `pip install pytest`.

## Step 2: Take the Inventory

```powershell
python -m pytest week-00-diagnostic/test_assessment.py -v
```

The tests import `diagnostic_workbench.py`, the learner-facing file for this inventory. Your results show strengths and gaps across six areas. Do not worry about failures. The failures are the starting point.

Some early diagnostic functions may already pass or feel familiar. Treat those as calibration examples: they show what a clean assertion looks like before the inventory reaches areas you may need to repair.

## Step 3: Read The First Failure

Before editing anything, inspect one failing test and write down:

- the function or class named by the test
- whether the failure is about setup, import, assertion, or missing behavior
- the Python concept it points to in `../concept-review-map.md`

Use `hints.md` only after you can name the failure category. The goal is to learn how to read feedback from tests, not to finish every diagnostic TODO immediately.

## After Your Results

| Result pattern | What it means | Best next step |
| --- | --- | --- |
| setup or import failure | the environment or file shape needs repair first | fix setup, then rerun Week 00 |
| mostly strings, lists, dictionaries, functions | everyday Python needs practice | complete Week 01 before Module 1 |
| mostly classes, exceptions, context managers, generators | production Python needs reinforcement | keep Week 02 nearby as an optional repair lane |
| only a few familiar assertion failures | you can read the tests and know the gap | start Module 1 and return as needed |

## Optional Visual Reference

If pytest output feels noisy, skim the assertion and failure-reporting sections in the current pytest docs: https://docs.pytest.org/en/stable/how-to/assert.html

## Reflection

After the run, write down:

- which failures looked familiar
- which failures looked surprising
- one Python concept you want tests to help you practice first
- whether your next step is Week 01 remediation, Module 1, or concept review
