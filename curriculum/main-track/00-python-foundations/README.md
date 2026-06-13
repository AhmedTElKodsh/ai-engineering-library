# Module 0: Python Foundations
## Essential Python Fluency for AI Engineering

**Duration:** diagnostic plus targeted remediation  
**Expected time to finish:** 2-4 hours if the diagnostic passes cleanly; 8-20 hours if targeted remediation is needed  
**Prerequisites:** basic Python exposure or willingness to learn from tests  
**Outcome:** you can read, write, test, and debug the Python patterns used throughout the AI engineering curriculum.

Timeline rule: start with `week-00-diagnostic`. Do not spend a full week here
unless the diagnostic proves the extra remediation is needed.

This module is not a beginner syntax tour and it is not abstract interview practice. It is a readiness gate and support track for the FinAgent curriculum.

The refresher path is shaped like a small engineering project, not a list of right answers. When a learner hits a concept gap, they should use `concept-review-map.md` to review the relevant Python idea, return to the failing test, and implement the behavior personally with best practices.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 0's minimum
path is diagnostic first, targeted remediation only when needed, and a
post-Module-1 stock pipeline bridge. Optional reinforcement is for repair, not
for slowing every learner before Module 1.

The advanced doorway is production Python for AI systems: configuration,
testing, retries, resource cleanup, and data pipelines. This module does not
teach every Python feature. It teaches the habits later modules depend on.

## How To Use This Module

Start with the diagnostic. If you pass it cleanly, move into Module 1. If the diagnostic exposes gaps, complete only the matching remediation work before Module 1. Optional reinforcement is for confidence and repair, not a hidden gate.

The student should not complete every folder here before starting Module 1. The intended path is:

1. Try `week-00-diagnostic`.
2. If the diagnostic exposes Python gaps, complete `week-01-python-essentials` as the FinAgent intake mini-project.
3. Start and complete `../01-module-1-whole-game` in all cases.
4. Return to `week-03-stock-pipeline` after Module 1 as the first larger Python integration project.

`week-02-production-python` is optional reinforcement. Use it when the student struggles with errors, context managers, classes, generators, or state updates during Module 1 or the stock pipeline.

## Mini-Project Learning Ritual

Each unit follows the same loop from the curriculum authoring spec:

1. Read the real-world context.
2. Trace the workbench file and tests before editing.
3. Predict what the tests will check.
4. Run the tests and read the first failure.
5. If the concept is unclear, review the matching row in `concept-review-map.md`.
6. Implement one TODO at a time.
7. Re-run the smallest relevant test.
8. Write a short reflection on how the pattern transfers to FinAgent.

The goal is for the student to write the code, not paste a full solution.

## Style Rubric

A strong Module 0 learner:

- runs the tests before and after each change
- explains failures in plain language before editing
- writes the implementation personally in `workbench.py` or `diagnostic_workbench.py`
- uses AI for hints, explanations, and review, not complete file replacement
- keeps functions small enough to test and debug
- connects each Python pattern to a later FinAgent use case

## Unit Map

| Unit | Focus | Real AI Engineering Use |
| --- | --- | --- |
| Week 00 | Diagnostic inventory | Find the right starting point |
| Week 01 | FinAgent intake mini-project | typed data, strings, prompts, collections, control flow, decorators |
| Week 02 | Production Python reinforcement | optional support for errors, context managers, OOP, magic methods, generators, state updates |
| Week 03 | Post-Module-1 stock pipeline | combine Module 0 Python and Module 1 FinAgent context in a deterministic data pipeline |
| Extension | AI-client simulator | optional practice for later LLM API modules |

## What You Must Be Able To Do

By the end of this module, you should be able to:

- validate messy external input without crashing
- model data with classes and typed fields
- read configuration from the environment without leaking secrets
- transform lists of dictionaries into useful structures
- write decorators for retry and caching behavior
- use context managers for resource cleanup and timing
- compose small functions into pipelines
- stream values with generators
- read pytest output and fix the actual behavior
- build a small real-life command-line style project from tests

## How To Run

From `curriculum/main-track/00-python-foundations`:

The first run is expected to show failures because learner files contain TODOs.
Treat the output as a map of what to implement next, not as a signal that the
curriculum is broken.

Required first:

```powershell
python -m pytest week-00-diagnostic -v
python -m pytest week-01-python-essentials -v
```

After Module 1:

```powershell
python -m pytest week-03-stock-pipeline/tests -v
```

Optional repair and extension:

```powershell
python -m pytest week-02-production-python -v
python -m pytest extensions/ai-client-simulator/ai_client -v
```

The workbench files are expected to fail at first because they contain TODOs. A clean import with failing behavior tests is the intended learning state.

## Expected First Test Runs

| Unit | First-run signal | What it means |
| --- | --- | --- |
| Week 00 | setup tests should pass; several assessment tests may fail | your environment works and the failures show Python practice areas |
| Week 01 | many behavior tests fail | this is the remediation workbench before implementation |
| Week 02 | many behavior tests fail if you choose this repair lane | this optional lab starts from TODOs, not finished examples |
| Week 03 | stock-pipeline behavior tests fail | this is the post-Module-1 project waiting for your implementation |
| Extension | simulator behavior tests fail | optional extra reps before later real API modules |

## Required Learning Path

### Step 1: Diagnostic

Run:

```powershell
python -m pytest week-00-diagnostic -v
```

If the diagnostic mostly passes and the failures are easy to explain, continue to Module 1.

If the diagnostic exposes real gaps, complete Week 01 before Module 1.

### Step 2: Week 01 - FinAgent Intake Mini-Project

Complete this only if the diagnostic shows that the student needs Python remediation. Practice the Python that appears immediately in AI engineering:

- types and conversion
- prompt strings
- list and dictionary operations
- grouping, chunking, and deduplication
- route decisions
- decorators and closures

When a TODO is hard, do not look for the final implementation first. Use `concept-review-map.md` to review the concept, then write the smallest test-driven change yourself.

### Step 3: Module 1 - Whole-Game AI Engineering

Then complete:

```text
../01-module-1-whole-game
```

Module 1 is required for everyone. It gives the student the product context first: a small deterministic FinAgent workflow that they can run, trace, modify, and package.

### Step 4: Week 03 - Post-Module-1 Stock Pipeline Project

After Module 1, return here and complete `week-03-stock-pipeline`.

This project makes the student combine Python foundations with the FinAgent context they just practiced:

- CSV loading and validation
- typed domain objects
- price movement calculations
- moving averages
- generator-based streaming
- summary generation
- source-aware educational disclaimers
- test-guided implementation

### Optional Reinforcement: Week 02 - Production Python

Use `week-02-production-python` if the student needs more practice with:

- custom exceptions
- validation
- context managers
- classes and inheritance
- `__call__`, `__or__`, `__len__`, `__getitem__`
- comprehensions
- generators
- immutable state updates
- safe nested dictionary access

The AI-client simulator lives in `extensions/ai-client-simulator`. Use it after the stock pipeline if you want extra practice with config validation, prompt building, retries, and streaming before later API modules.

## Gate To Module 1

The student is ready for Module 1 when they can:

- run the diagnostic and understand the result
- complete Week 01 if the diagnostic showed Python gaps
- explain basic function, string, list, dictionary, and control-flow behavior
- read pytest output without getting lost

## Gate After Module 1

After completing `../01-module-1-whole-game`, the student should complete `week-03-stock-pipeline`. They are ready to move beyond this bridge when they can:

- make the stock pipeline tests pass
- explain why each validation rule exists
- add one new edge-case test without weakening existing tests
- connect the stock pipeline functions to future FinAgent tools, data loaders, and report generation

## Connection to the Rest of the Curriculum

| Python Skill | Later Curriculum Use |
| --- | --- |
| Type hints and validation | schemas, tool inputs, structured LLM outputs |
| Dictionaries and lists | JSON payloads, metadata, retrieved chunks |
| Environment/config habits | API keys, model settings, deployment configuration |
| Decorators | retry, caching, tracing |
| Context managers | files, database sessions, tracing spans |
| OOP | agents, clients, tools, domain models |
| Magic methods | pipelines and chain composition |
| Generators | streaming LLM responses and batch processing |
| Pytest | evaluations, regression tests, capstone quality gates |
