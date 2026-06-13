# Authoring Plan: Module 4 Phase 2

## Lesson Identity

- Module: Module 4 - AI-Ready Data, RAG, and Agentic Workflows
- Week or project: Phase 2
- Stable folder: `curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag`
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
python -m pytest --collect-only curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/tests -q
```

Learner-start command:

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/tests -v
```

Expected starting result: tests collect and then fail on TODO behavior.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/04-module-4-agentic-workflows-week-02-advanced-rag-reference.md`
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: provenance-preserving chunks from the web-data bridge and Phase 1 AI-ready ingestion.
- New capability added by this lesson: retrieve relevant chunks, attach citations, and abstain when evidence is too weak.
- Failure mode the learner must reproduce, inspect, or prevent: a fluent answer that has no retrieved support, weak citation coverage, or an unclear retrieval trace.
- FinAgent or practical AI-system improvement: FinAgent can answer market-context questions only when retrieved source evidence supports the response.
- Explanation artifact the learner should leave with: a short note explaining why one answer was supported and why one unsupported question abstained.

## Scope Boundary Enhancement

- Minimum required path: deterministic keyword retrieval, citation-bearing answer objects, abstention on unsupported questions, and a debuggable retrieval trace.
- Optional enrichment only after the minimum path works: compare one tiny vector or hybrid retrieval case against the keyword baseline.
- Advanced doorway, named briefly but not required: reranking, GraphRAG, adaptive RAG, large retrieval benchmarks, and production monitoring dashboards belong to Course 3 or specializations.

## Evidence Portfolio Enhancement

- Technical evidence: implemented retrieval, citation, abstention, and trace functions in `workbench.py`.
- Failure evidence: first failing assertion or unsupported-question case showing why the system must abstain.
- Explanation evidence: learner note on citation coverage, weak evidence, and retrieval-vs-generation failure.
- Transfer evidence: FinAgent callback showing how cited market context prevents unsupported financial claims.

## Source Evidence Enhancement

- Use `../RAG_CITATION_ABSTENTION_CHECKLIST.md` before revising this lesson.
- Indexed source baseline:
  - B09 `Hands-On Large Language Models`, p.358, `B09_B09_P0358_C001` for citation recall and citation precision as RAG quality signals.
  - B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`, p.108-109 and p.147, `B05_B05_P0108_C001`, `B05_B05_P0109_C001`, `B05_B05_P0147_C001` for hallucination risk, fabricated citations, and trace audits.
  - B10 `LLM Engineer's Handbook`, p.300-303, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` for small RAG evaluation sets and caution around model-judge signals.
  - Local PDF `Hands-On RAG for Production`, p.8-15 and p.41-43 for external grounding, ingest/query separation, post-generation guardrails, missing-data failures, weak retrieval, and hallucination risks.
- Assessment conversion rule: each source insight must become a citation-support test, unsupported-claim test, retrieval-trace test, rubric hook, or learner explanation.

