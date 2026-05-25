# Authoring Plan: Module 5 Week 1

## Lesson Identity

- Module: Module 5 - Production AI Engineering
- Week or project: Week 1
- Stable folder: `curriculum/05-module-5-production/week-01-golden-datasets`
- Learner-facing goal: create deterministic golden examples and an eval summary
- FinAgent or practical AI engineering callback: catch citation, abstention, and finance-safety regressions before capstone release
- Primary concept: golden evals
- Secondary operational concern: release-gate failure categories

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, FinAgent callback, and optional reference.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers golden set quality, evaluator behavior, reporting, and production transfer.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame centers on preventing AI behavior regressions.
- [x] Cafe-style explanation uses small eval rows and failure categories.
- [x] Action-before-lecture starts with deterministic tests.
- [x] Concept explanation is tied to pass/fail release evidence.
- [x] Mermaid flow clarifies golden examples to release summary.
- [x] Whole-part-whole is visible: Module 4 behavior, eval cases, production gate.
- [x] Evidence First prompt asks learners to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection is covered through failure note and FinAgent connection.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks operational evidence, not only score output.

## Optional References

- [x] AI author searched for current eval guidance.
- [x] OpenAI eval best practices are linked as an optional reference.
- [x] Resource link is optional and does not replace the hands-on task.
- [x] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports.
- [x] Test names describe learner-visible behavior.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases include missing citations and multiple failure categories.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] No live model call is required for first success.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/05-module-5-production/week-01-golden-datasets/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/05-module-5-production/week-01-golden-datasets/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/module-5-week-01-golden-eval-reference.md`
