# Authoring Plan: Module 6 Week 1

## Lesson Identity

- Module: Module 6 - Capstone Projects
- Week or project: Week 1
- Stable folder: `curriculum/06-capstone-projects/week-01-build`
- Learner-facing goal: scope FinAgent, create kickoff evals, and start a portfolio evidence ledger
- FinAgent or practical AI engineering callback: keep the capstone educational, cited, evaluated, and interview-ready
- Primary concept: capstone scoping
- Secondary operational concern: eval and portfolio evidence gates

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, minimum scope, reflection, and optional reference.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers scope, eval harness, evidence ledger, and explanation.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame centers on avoiding an oversized, unsupported capstone.
- [x] Cafe-style explanation uses portfolio/reviewer/user examples.
- [x] Action-before-lecture starts with tests and scope decisions.
- [x] Concept explanation is tied to smallest credible capstone behavior.
- [x] Mermaid flow clarifies scope to interview defense.
- [x] Whole-part-whole is visible: prior module evidence, capstone scope, reviewer ledger.
- [x] Evidence First prompt asks learners to run tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection asks which feature, source, and failure mode matter most.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks portfolio evidence and explanation.

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
- [x] Edge cases include invalid input and advice refusal eval behavior.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] No frontend, cloud, or live model dependency is required.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/06-capstone-projects/week-01-build/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/06-capstone-projects/week-01-build/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/06-capstone-projects-week-01-build-reference.md`
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

