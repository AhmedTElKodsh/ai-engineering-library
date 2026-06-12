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

- Current capability the learner brings into this lesson: tested slices from data, provider/tool contracts, RAG, workflows, evals, and production gates.
- New capability added by this lesson: scope a smallest credible capstone and map each portfolio claim to a concrete artifact.
- Failure mode the learner must reproduce, inspect, or prevent: an oversized capstone claims broad AI ability without evals, evidence, limitations, or refusal behavior.
- FinAgent or practical AI-system improvement: FinAgent becomes an educational, cited, safety-bounded project a reviewer can understand and question.
- Explanation artifact the learner should leave with: a portfolio evidence ledger plus a short scope note naming included behavior, non-goals, eval cases, and reviewer checks.

## Scope Boundary Enhancement

- Minimum required path: define capstone scope, kickoff eval cases, refusal/non-advice behavior, and portfolio evidence ledger entries.
- Optional enrichment only after the minimum path works: add one extra artifact row for an architecture diagram, trace sample, or release note.
- Advanced doorway, named briefly but not required: public website, hosted deployment, richer finance integrations, GraphRAG, fine-tuning, and autonomous trading agents are outside Course 1.

## Evidence Portfolio Enhancement

- Technical evidence: scope object, kickoff eval cases, deterministic scoring behavior, and portfolio evidence ledger.
- Failure evidence: an unsafe, unsupported, stale, or advice-seeking case is refused or marked not ready.
- Explanation evidence: learner note explains why the capstone is smaller than a product but stronger as a proof artifact.
- Transfer evidence: FinAgent callback showing how prior module artifacts become a reviewer-ready portfolio story.

## Source Evidence Enhancement

Use `../CAPSTONE_PORTFOLIO_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, p.403, `B01_B01_P0403_C001` for behavior-specific evals before release claims.
- Local PDF `Principles of Building AI Agents`, p.80-83 and p.118-124 for traceable agent runs and eval summaries as project evidence.
- Local PDF `Your AI Roadmap`, p.123-130 for translating projects into tangible proof, STAR-style project stories, measurable results, and portfolio evidence.
- Local PDF `Your AI Roadmap`, p.131-135 for keeping career prototyping small, feedback-oriented, and connected to a professional story.
- Assessment conversion rule: each source insight must become a scope boundary, evidence-led artifact row, eval/refusal case, measurable result, or explanation prompt.

