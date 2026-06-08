# Authoring Plan: Web Data Core Lab 3

## Lesson Identity

- Module: Web Data Acquisition for AI Systems
- Week or project: Core Lab 3
- Stable folder: `curriculum/specializations/web-scraping/core-lab-03-api-first-collection`
- Learner-facing goal: collect and validate records from a stable JSON fixture before scraping HTML
- FinAgent or practical AI engineering callback: prefer approved structured source data when available
- Primary concept: API-first collection
- Secondary operational concern: raw/clean/failed layers for API payloads

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, Module 4 handoff, and optional references.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers API-first judgment, validation, provenance, and handoff.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame uses API-first source selection.
- [x] Cafe-style explanation keeps JSON fixtures tied to cleaner downstream evidence.
- [x] Action-before-lecture starts with fixture tests.
- [x] Concept explanation is tied to validation and malformed items.
- [x] Mermaid flow clarifies parse, validate, clean, fail, and report.
- [x] Whole-part-whole is visible: approved payload, records, Module 4 handoff.
- [x] Evidence First prompt asks learners to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks judgment and reliability, not only parsing.

## Optional References

- [x] AI author searched for current JSON/API references.
- [x] Requests and Python `json` documentation are linked as optional references.
- [x] Resource links are optional and do not replace the hands-on task.
- [x] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports.
- [x] Test names describe learner-visible behavior.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases include missing fields and failed-record reporting.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] Live network access is not required for first success.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/specializations-web-scraping-core-lab-03-api-first-collection-reference.md`
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

