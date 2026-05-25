# Authoring Plan: Web Data Core Lab 2

## Lesson Identity

- Module: Web Data Acquisition for AI Systems
- Week or project: Core Lab 2
- Stable folder: `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction`
- Learner-facing goal: extract clean records from local HTML fixtures before live collection
- FinAgent or practical AI engineering callback: produce provenance-preserving records for Module 4 RAG
- Primary concept: fixture-first static extraction
- Secondary operational concern: failed extraction evidence

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, handoff, verification, and optional reference.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers extraction, provenance, testing, and RAG readiness.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame uses a fixture-first collection mission.
- [x] Cafe-style explanation keeps parsing tied to visible HTML cards.
- [x] Action-before-lecture starts with fixture tests.
- [x] Concept explanation is tied to required fields and failed rows.
- [x] Mermaid flow clarifies valid vs failed extraction paths.
- [x] Whole-part-whole is visible: fixture, extracted records, Module 4 handoff.
- [x] Evidence First prompt asks the learner to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection is covered through Module 4 handoff and rubric transfer.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks reliability and provenance, not only parser output.

## Optional References

- [x] AI author searched for a current parsing reference.
- [x] Beautiful Soup documentation is linked as an optional reference.
- [x] Resource link is optional and does not replace the hands-on task.
- [x] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports.
- [x] Test names describe learner-visible behavior.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases include missing summary and JSONL-ready provenance.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] Live network access is not required for first success.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/web-data-core-labs-1-2-reference.md`
