# Authoring Plan: Module 4 Phase 2

## Lesson Identity

- Module: Module 4 - AI-Ready Data, RAG, and Agentic Workflows
- Week or project: Phase 2
- Stable folder: `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag`
- Learner-facing goal: build retrieval with citations and abstention over provenance-preserving chunks
- FinAgent or practical AI engineering callback: answer market-context questions only when source evidence supports the answer
- Primary concept: cited retrieval
- Secondary operational concern: abstention on weak evidence

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, visual map, verification, learner outputs, FinAgent callback, and optional references.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers retrieval, citations, abstention, and transfer.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Pedagogy

- [x] Engaging problem frame centers on weak evidence and bad answers.
- [x] Cafe-style explanation keeps retrieval visible through scores and traces.
- [x] Action-before-lecture starts with failing tests and deterministic chunks.
- [x] Concept explanation is tied to answer/support/abstain behavior.
- [x] Mermaid flow clarifies query-to-answer-or-abstain flow.
- [x] Whole-part-whole is visible: bridge data, chunks, retrieval, cited answer.
- [x] Evidence First prompt asks learners to inspect retrieval tests before editing.
- [x] Smallest Change guidance appears in hints.
- [x] Reflection is covered through FinAgent unsupported-answer connection.
- [x] The lesson avoids research-report prose.
- [x] The rubric checks source grounding and refusal behavior.

## Optional References

- [x] AI author searched for current eval and abstention references.
- [x] OpenAI eval and hallucination/abstention references are linked.
- [x] Resource links are optional and do not replace the hands-on task.
- [x] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports.
- [x] Test names describe learner-visible behavior.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases include unsupported questions and retrieval traces.
- [x] Verification command uses `python -m pytest`.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] No API, network, secret, or unstable dependency is required.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/module-4-week-02-citation-abstention-rag-reference.md`
