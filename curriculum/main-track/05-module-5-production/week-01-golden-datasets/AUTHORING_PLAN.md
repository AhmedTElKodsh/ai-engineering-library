# Authoring Plan: Module 5 Week 1

## Lesson Identity

- Module: Module 5 - Production AI Engineering
- Week or project: Week 1
- Stable folder: `curriculum/main-track/05-module-5-production/week-01-golden-datasets`
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
python -m pytest --collect-only curriculum/main-track/05-module-5-production/week-01-golden-datasets/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/main-track/05-module-5-production/week-01-golden-datasets/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/05-module-5-production-week-01-golden-datasets-reference.md`
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: Module 4 RAG, citation, abstention, workflow, and safety behavior.
- New capability added by this lesson: convert expected AI behavior into golden examples, failure categories, and a repeatable eval summary.
- Failure mode the learner must reproduce, inspect, or prevent: a regression that looks fluent but loses citations, misses abstention, or violates the finance-safety boundary.
- FinAgent or practical AI-system improvement: FinAgent gains a small release gate before capstone integration.
- Explanation artifact the learner should leave with: a short eval summary explaining pass/fail counts, failure categories, and release recommendation.

## Scope Boundary Enhancement

- Minimum required path: deterministic golden examples, category-based evaluator behavior, summary report, and release recommendation.
- Optional enrichment only after the minimum path works: add one extra ambiguous or high-risk case and explain whether it should fail, pass, or need review.
- Advanced doorway, named briefly but not required: model-judge evals, production monitoring dashboards, drift/retraining systems, and enterprise LLMOps belong to Course 3.

## Evidence Portfolio Enhancement

- Technical evidence: implemented golden example loading, evaluator behavior, category counts, and summary report in `workbench.py`.
- Failure evidence: first failing golden case or category mismatch showing the release gate catching a regression.
- Explanation evidence: learner note explaining the release recommendation and which failure category matters most.
- Transfer evidence: FinAgent callback showing how the eval gate protects cited market summaries before capstone release.

## Source Evidence Enhancement

- Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before revising this lesson.
- Indexed source baseline:
  - B01 `Generative AI in Action`, p.403, `B01_B01_P0403_C001` for LLM output behavior as testable eval evidence.
  - B10 `LLM Engineer's Handbook`, p.291 and p.300-303, `B10_B10_P0291_C001`, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` for fit-for-task evaluation and caution around judge-based signals.
  - B12 `Designing Machine Learning Systems`, p.229, `B12_B12_P0229_C001` for measurable offline evaluation before production claims.
  - B01 `Generative AI in Action`, p.363 and p.381-382, `B01_B01_P0363_C001`, `B01_B01_P0381_C001`, `B01_B01_P0382_C001` for logs, traces, cost, human review, and production observability.
  - Local PDF `Hands-On RAG for Production`, p.61, p.63, and p.68-70 for POC-to-production requirements, latency/response-quality KPIs, monitoring, post-deployment issue response, and upgrade evaluation.
- Assessment conversion rule: each source insight must become a golden case, failure category, eval-summary field, release-gate rule, log/trace check, or learner decision note.

