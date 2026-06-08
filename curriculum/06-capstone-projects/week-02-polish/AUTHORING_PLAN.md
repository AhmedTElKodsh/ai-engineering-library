# Authoring Plan: Module 6 Week 2

## Lesson Identity

- Module: Module 6 - Capstone Projects
- Week or project: Week 2
- Stable folder: `curriculum/06-capstone-projects/week-02-polish`
- Learner-facing goal: package the FinAgent capstone for demo, release evidence, limitation disclosure, and interview defense
- FinAgent or practical AI engineering callback: prove the capstone can be reviewed, rerun, and discussed responsibly
- Primary concept: portfolio polish
- Secondary operational concern: release readiness evidence

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, minimum polish gate, reflection, and optional reference.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers demo, release evidence, limitation note, and interview defense.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame centers on a reviewer trusting the capstone.
- [x] Cafe-style explanation uses reviewer, teammate, and interviewer examples.
- [x] Action-before-lecture starts with tests and evidence packaging.
- [x] Concept explanation is tied to portfolio readiness, not decorative polish.
- [x] Mermaid flow clarifies demo to interview defense.
- [x] Whole-part-whole is visible: Week 1 scope, demo, evidence, limitations, defense.
- [x] Evidence First prompt asks learners to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection asks about demo proof, disclosed limitation, and defended tradeoff.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks reviewer-facing artifacts and explanation.

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
- [x] Edge cases include blocked release evidence and clean release evidence.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] No frontend, cloud, live model, or deployment dependency is required.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/06-capstone-projects/week-02-polish/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/06-capstone-projects/week-02-polish/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/06-capstone-projects-week-02-polish-reference.md`
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

