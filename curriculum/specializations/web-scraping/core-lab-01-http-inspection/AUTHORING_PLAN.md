# Authoring Plan: Web Data Core Lab 1

## Lesson Identity

- Module: Web Data Acquisition for AI Systems
- Week or project: Core Lab 1
- Stable folder: `curriculum/specializations/web-scraping/core-lab-01-http-inspection`
- Learner-facing goal: inspect a candidate source before writing extraction code
- FinAgent or practical AI engineering callback: decide whether a market-context source is allowed and useful enough for downstream RAG evidence
- Primary concept: HTTP/source inspection
- Secondary operational concern: responsible collection boundaries

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, reflection, and optional reference.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers inspection, responsible collection, provenance, and transfer.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame gives the learner a realistic source-review mission.
- [x] Cafe-style explanation uses a small source-review flow before extraction.
- [x] Action-before-lecture starts with tests and an inspection note.
- [x] Concept explanation is tied to deciding whether collection is allowed.
- [x] Mermaid flow clarifies the inspection-to-target-table path.
- [x] Whole-part-whole is visible: candidate source, allowed-source decision, extraction target.
- [x] Prediction prompt is implicit in the inspection/decision tests and should be expanded in a later prose polish pass.
- [x] Evidence First prompt asks the learner to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection asks what evidence allows or blocks collection.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks learning behavior and transfer, not only correctness.

## Optional References

- [x] AI author searched for a current reference on robots.txt/source review.
- [x] Google Search Central robots.txt introduction is linked as an optional reference.
- [x] Resource link is optional and does not replace the hands-on task.
- [x] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports.
- [x] Test names describe learner-visible behavior.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases include allowed vs blocked source decisions.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] Network access is not required for first success.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/specializations-web-scraping-core-lab-01-http-inspection-reference.md`
## Learner Logic Enhancement

- Current capability the learner brings into this lesson:
- New capability added by this lesson:
- Failure mode the learner must reproduce, inspect, or prevent:
- FinAgent or practical AI-system improvement:
- Explanation artifact the learner should leave with:

## Scope Boundary Enhancement

- Minimum required path:
- Optional enrichment only after the minimum path works:
- Advanced doorway, named briefly but not required:

## Evidence Portfolio Enhancement

- Technical evidence:
- Failure evidence:
- Explanation evidence:
- Transfer evidence:

