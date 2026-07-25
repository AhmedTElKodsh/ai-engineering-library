# Week 00: Python Confidence Inventory

## How To Use This File

Read this file first. It defines the lesson objective, the minimum path, the expected evidence, and the verification command. Treat the local tests as the exact contract when implementation details feel unclear.

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | basic Python reading and simple pytest commands. |
| What new capability am I adding? | inventory your actual Python gaps with diagnostic tasks. |
| What failure does this help me catch? | environment, syntax, data-shape, and control-flow misunderstandings. |
| How does this improve FinAgent or a practical AI system? | routes you to only the remediation FinAgent work you need. |
| What should I be able to explain afterward? | which Python patterns are ready and which need repair. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** run the setup tests and five-test placement sample, inspect the first 1-3 failures, map them to `../concept-review-map.md`, and write the reflection/evidence note.
- **Optional calibration:** complete TODOs in `diagnostic_workbench.py` only when fixing them helps you confirm a readiness pattern.
- **Optional enrichment:** add one edge case, comparison, or small test after the required diagnostic behavior is clear.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Milestone 1 task.

**Stop rule:** stop after you can name your weak areas and choose a path. You do not need a perfect score in Week 00.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Record the evidence in `diagnostic_notes.md`, or in the Week 00 section of your learning journal.

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

From `curriculum/main-track/00-python-foundations`:

```powershell
python -m pytest week-00-diagnostic/test_setup.py -v
```

Both tests should pass. If not, install Python 3.10+ and run `pip install pytest`.

## Step 2: Run The Placement Sample

```powershell
python -m pytest week-00-diagnostic/test_assessment.py -k "swap_without_temp or flatten_list or make_multiplier or counter_initial_count or safe_divide_zero_division" -v
```

The sample checks a calibration function, collections, functions/closures,
object initialization, and exceptions. In the untouched starter, two
calibration tests pass and three TODO samples fail. The failures are placement
signals, not work you must finish before starting the course.

Some early diagnostic functions are intentionally prefilled calibration examples. Treat them as a warm-up: they show what a clean assertion looks like before the inventory reaches TODO areas you may need to repair.

Your job is not to prove you already know every item. Your job is to notice what the assessment reveals.

Run the full inventory only when the five-test signal is unclear:

```powershell
python -m pytest week-00-diagnostic/test_assessment.py -v
```

## Expected First Test Run

On the first run, `test_setup.py` should pass. The placement sample should show
a small mix of passing calibration tests and failing TODO tests. That is the
intended diagnostic state: passing tests demonstrate the environment and test
flow, while failing samples identify the next concept to review.

## Step 3: Read The First Failure

Before editing anything, inspect one failing test and write down:

- the function or class named by the test
- whether the failure is about setup, import, assertion, or missing behavior
- the Python concept it points to in `../concept-review-map.md`

For object errors such as `AttributeError`, read the object type and missing attribute or method first. For example, a missing `count` attribute on `Counter` points to object initialization before it points to arithmetic.

Use `hints.md` only after you can name the failure category. The goal is to learn how to read feedback from tests, not to finish every diagnostic TODO immediately.

To focus on one failure at a time, use a targeted pytest command:

```powershell
python -m pytest week-00-diagnostic/test_assessment.py::test_safe_divide_zero_division -v
```

## After Your Results

Use this map to connect failing tests to the review material:

| Failing area | Typical concept row in `../concept-review-map.md` |
| --- | --- |
| fundamentals | Types and conversions |
| data structures | Lists and dictionaries |
| functions | Functions or decorators and closures |
| OOP | Classes and dataclasses |
| Pythonic patterns | Lists and dictionaries or generators |
| error handling | Exceptions |

| Result pattern | What it means | Best next step |
| --- | --- | --- |
| setup or import failure | the environment or file shape needs repair first | fix setup, then rerun Week 00 |
| mostly strings, lists, dictionaries, functions | everyday Python needs practice | complete Week 01 before Module 1 |
| mostly classes, exceptions, context managers, generators | production Python needs reinforcement | keep Week 02 nearby as an optional repair lane |
| only a few familiar assertion failures | you can read the tests and know the gap | start Module 1 and return as needed |
| unsure whether the gaps are serious | the signal is not clear yet | do Week 01 quickly, then reassess |

## Optional Visual Reference

You only need the commands shown here. If pytest output feels noisy and you want background, skim the assertion and failure-reporting sections in the current pytest docs: https://docs.pytest.org/en/stable/how-to/assert.html

## Reflection

After the run, write down:

- which failures looked familiar
- which failures looked surprising
- one Python concept you want tests to help you practice first
- whether your next step is Week 01 remediation, Module 1, or concept review

