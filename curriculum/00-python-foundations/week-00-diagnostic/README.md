# Week 00: Python Confidence Inventory

Before the journey begins, find your current Python footing.

**Time:** ~15-20 min  
**Purpose:** diagnostic placement, not a test you need to pass.

## Learning Goal

You will run a small diagnostic suite, read pytest output, and decide whether to move quickly or spend more time in Week 01.

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

## Reflection

After the run, write down:

- which failures looked familiar
- which failures looked surprising
- one Python concept you want tests to help you practice first
