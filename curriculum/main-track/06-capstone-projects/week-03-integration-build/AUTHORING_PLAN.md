# Authoring Plan: Week 3 Integration Build

## Scope

Use this existing scaffold as the cumulative Milestone 1 FinAgent application.
It starts with deterministic validation and grounded retrieval, then adds the
fixture-provider, evaluation, tool/workflow, real HTTP, operational evidence,
and transfer contracts from the canonical route.

## Acceptance Checks

- [x] `README.md` frames the milestone as the first runnable capstone integration, not a full fintech product.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define fixture loading, request validation, retrieval, brief composition, refusal, and workflow trace behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates integration, citations, safety, traceability, and explanation.
- [x] Reviewer-only reference behavior lives outside the learner folder.
- [x] Checkpoint tests map route blocks 1-9 to the same learner-owned application.
- [x] Block 1 produces useful deterministic output without depending on later retrieval.
- [x] Block 4 proves deterministic ranking and a bounded context slice before Block 5 composition.
- [x] Block 5 proves unsupported-question abstention before tool authority is introduced.
- [x] Block 6 proves missing approval stops before provider execution.
- [x] Block 7 rejects malformed service payloads and separately proves real loopback HTTP.
- [x] Block 8 distinguishes measured latency, estimated tokens/live cost, and zero fixture cost.
- [x] Block 9 proves diagnostic failure categories and keeps transfer/defense as learner evidence.
- [x] Supporting labs use exact time-capped selectors; full lab completion is post-milestone depth.
- [x] The eval seed contains ten supported, abstained, refused, and tool cases.
- [x] The HTTP checkpoint uses a real loopback request without adding a framework dependency.
- [x] Fixture, live-provider, learner-completion, and production evidence stay distinct.

## Verification

```powershell
python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs. Learners run one checkpoint filter at a
time rather than diagnosing the entire incomplete suite.

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
