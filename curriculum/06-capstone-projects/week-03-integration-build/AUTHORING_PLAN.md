# Authoring Plan: Week 3 Integration Build

## Scope

Create a runnable, deterministic FinAgent integration milestone that composes
prior course skills: input validation, fixture market data, cited evidence
retrieval, safety gating, educational brief composition, and workflow trace.

## Acceptance Checks

- [x] `README.md` frames the milestone as the first runnable capstone integration, not a full fintech product.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define fixture loading, request validation, retrieval, brief composition, refusal, and workflow trace behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates integration, citations, safety, traceability, and explanation.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/06-capstone-projects/week-03-integration-build/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: capstone scope, eval cases, demo evidence, and prior FinAgent slices.
- New capability added by this lesson: compose a deterministic local workflow that produces or refuses an educational FinAgent brief.
- Failure mode the learner must reproduce, inspect, or prevent: malformed tickers, advice requests, missing citations, and untraceable workflow decisions.
- FinAgent or practical AI-system improvement: show the capstone can run locally with evidence and safety gates before any live model or service is added.
- Explanation artifact the learner should leave with: a workflow trace and short integration tradeoff note.

## Scope Boundary Enhancement

- Minimum required path: local fixtures, deterministic retrieval, safety gate, cited brief, refusal path, and trace.
- Optional enrichment only after the minimum path works: add one eval case or one extra evidence chunk.
- Advanced doorway, named briefly but not required: live providers, richer finance APIs, agent frameworks, and hosted deployment.

## Evidence Portfolio Enhancement

- Technical evidence: tests, fixtures, workflow trace, run command.
- Failure evidence: invalid input and investment-advice refusal cases.
- Explanation evidence: architecture note and integration tradeoff note.
- Transfer evidence: how the same gates support a future live RAG or tool workflow.
