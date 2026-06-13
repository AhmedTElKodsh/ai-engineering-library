# Authoring Plan: Module 6 Week 2

## Lesson Identity

- Module: Module 6 - Capstone Projects
- Week or project: Week 2
- Stable folder: `curriculum/main-track/06-capstone-projects/week-02-polish`
- Learner-facing goal: package the FinAgent capstone for demo, release evidence, limitation disclosure, and interview defense
- FinAgent or practical AI engineering callback: prove the capstone can be reviewed, rerun, and discussed responsibly
- Primary concept: portfolio polish
- Secondary operational concern: release readiness evidence

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, portfolio packaging gate, minimum polish gate, reflection, and optional reference.
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
- [x] The rubric checks reviewer-facing artifacts, portfolio packaging, final assessment readiness, and explanation.

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
python -m pytest --collect-only curriculum/main-track/06-capstone-projects/week-02-polish/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/main-track/06-capstone-projects/week-02-polish/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/06-capstone-projects-week-02-polish-reference.md`
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: scoped capstone behavior, eval cases, integration evidence, release checks, and known limitations.
- New capability added by this lesson: package the capstone into a demo, release summary, limitation note, and interview defense backed by artifacts.
- Failure mode the learner must reproduce, inspect, or prevent: a polished demo hides blockers, lacks proof, or cannot explain architecture/eval/safety tradeoffs under review.
- FinAgent or practical AI-system improvement: FinAgent becomes portfolio-ready without overstating what it knows or what it is safe to do.
- Explanation artifact the learner should leave with: a concise defense that maps Situation, Task, Action, and Result to demo steps, evals, traces, limitations, and tradeoffs.

## Scope Boundary Enhancement

- Minimum required path: demo sequence, release evidence summary, limitation note, portfolio README package, final assessment checklist, and interview-defense answers for architecture, evals, safety, and tradeoffs.
- Optional enrichment only after the minimum path works: add one extra reviewer artifact such as a diagram, trace excerpt, release checklist, or small STAR story.
- Advanced doorway, named briefly but not required: portfolio website, hosted demo, live finance feeds, public launch materials, and advanced agent specialization belong after Course 1.

## Evidence Portfolio Enhancement

- Technical evidence: demo steps, release-check summary, limitation note, portfolio README evidence rows, final assessment checklist status, and interview-defense objects are produced from deterministic inputs.
- Failure evidence: blocked release evidence stays visible instead of being smoothed over by a demo script.
- Explanation evidence: learner answer names the artifact that proves each major claim.
- Transfer evidence: FinAgent callback showing how the same evidence package can support future interviews, project reviews, or specialization work.

## Source Evidence Enhancement

Use `../CAPSTONE_PORTFOLIO_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Source row IDs: B01, B10, B21, B22, B23, B25.
- Concept IDs: capstone portfolio evidence and interview defense; agent evaluation and observability; production guardrails and safety.
- Gap ID: Module 6 polish evidence packaging gap - learner README did not explicitly require `PORTFOLIO_README_TEMPLATE.md` or `FINAL_ASSESSMENT_CHECKLIST.md` before presentation.
- Existing repo artifacts inspected: `README.md`, `rubric.md`, `hints.md`, `workbench.py`, `tests/test_capstone_polish.py`, `../CAPSTONE_PORTFOLIO_EVIDENCE_CHECKLIST.md`, `../PORTFOLIO_README_TEMPLATE.md`, and `../FINAL_ASSESSMENT_CHECKLIST.md`.
- Positive assessment: portfolio README claims map to concrete artifacts and final assessment rows are checked before presentation.
- Negative/adversarial assessment: release blockers, missing citations, vague README claims, or unchecked final assessment rows remain visible instead of being hidden by demo polish.
- Verification command: `python -m pytest curriculum/main-track/06-capstone-projects/week-02-polish/tests -v`.
- B10 `LLM Engineer's Handbook`, p.291 and p.300-303, `B10_B10_P0291_C001`, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` for task-fit evaluation and caution around weak eval signals.
- Local PDF `Hands-On RAG for Production`, p.61, p.63, and p.68-70 for requirements, KPIs, monitoring/review notes, and release or upgrade decisions.
- Local PDF `LLMOps`, p.52, p.54, p.56-58, p.183, and p.205-206 for KPIs, risk notes, knowledge-limit behavior, traceability, and version context.
- Local PDF `Your AI Roadmap`, p.126-130 for STAR storytelling, tangible proof, measured results, and external validation.
- Local PDF `Your AI Roadmap`, p.131-135 for small prototypes and professional-story framing.
- Assessment conversion rule: each source insight must become a demo step, release-evidence field, limitation disclosure, portfolio README evidence row, final assessment checklist row, artifact-backed interview answer, or STAR-style explanation prompt.

