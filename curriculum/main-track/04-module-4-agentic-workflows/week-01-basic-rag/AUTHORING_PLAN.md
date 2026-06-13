# Authoring Plan: Module 4 Phase 1

## Scope

Create the Course 1 ingestion and chunking foundation for RAG before retrieval,
answer generation, workflow routing, or agent autonomy.

This phase teaches learners that RAG quality starts with source records,
metadata, validation, failed-record handling, and chunk provenance. The lesson
must stay plain-Python and fixture-first.

## Acceptance Checks

- [x] `README.md` frames ingestion, cleaning, failed records, chunking, and run
  reports as the required pre-retrieval layer.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define text normalization, metadata normalization, validation,
  failed-record reporting, chunk provenance, report counts, and end-to-end
  pipeline behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates provenance, failure handling, chunk metadata,
  report quality, and learner explanation.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: tested provider,
  prompt, structured-output, and tool boundaries from Module 3.
- New capability added by this lesson: convert raw records into clean records,
  failed-record evidence, citation-ready chunks, and an inspectable run report.
- Failure mode the learner must reproduce, inspect, or prevent: missing body
  text, missing provenance, silent record drops, or chunks that cannot be traced
  back to their source.
- FinAgent or practical AI-system improvement: FinAgent gets trustworthy market
  context records before any retrieval answer, workflow, or agent can use them.
- Explanation artifact the learner should leave with: a short note explaining
  how ingestion quality affects later RAG citation, abstention, and debugging.

## Scope Boundary Enhancement

- Minimum required path: load deterministic fixture records, normalize text and
  metadata, validate required fields, report failed records, chunk clean records,
  preserve citation metadata, and summarize the run.
- Optional enrichment only after the minimum path works: add one extra invalid
  record, metadata field, or chunk-size edge case and explain the expected
  failure or report change.
- Advanced doorway, named briefly but not required: embeddings, vector stores,
  hybrid retrieval, reranking, GraphRAG, permission filtering, and production RAG
  monitoring belong to later phases or Course 3 depth unless a bounded lesson
  explicitly introduces them.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for normalization, validation, failed-record
  handling, chunk provenance, report counts, and end-to-end pipeline output.
- Failure evidence: at least one bad record is rejected with a useful reason
  instead of disappearing or crashing the pipeline.
- Explanation evidence: learner note names which citation fields survive from
  raw record to chunk and why that matters for later answer support.
- Transfer evidence: FinAgent callback showing how raw, clean, failed, and
  chunked market-context layers protect source-grounded summaries.

## Source Evidence Enhancement

Use `../RAG_CITATION_ABSTENTION_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, Chapter 7, p.209 and p.238,
  `B01_B01_P0209_C001`, `B01_B01_P0238_C001` for the idea that RAG connects LLM
  behavior to external retrieved knowledge and depends on retriever quality.
- B09 `Hands-On Large Language Models`, Chapter 8, p.358,
  `B09_B09_P0358_C001` for citation recall and citation precision as later RAG
  quality checks that require preserved source metadata.
- B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`,
  p.147 and p.149, `B05_B05_P0147_C001`, `B05_B05_P0149_C001` for tracing
  generated statements back to supporting context and separating retrieval
  quality from generation quality.
- Local PDF `Principles of Building AI Agents`, p.88 and p.92-93 for chunking,
  metadata, indexing, querying, and reranking decisions as a pipeline sequence.
- Local PDF `Hands-On RAG for Production`, p.8-15 for separating ingest,
  retrieval, generation, and post-generation guardrails.
- Local PDF `Hands-On RAG for Production`, p.20 and p.41-43 for missing data,
  weak retrieval, and hallucination risks that the Course 1 pipeline should make
  visible before answer generation.
- Assessment conversion rule: each source insight must become a required field,
  validation rule, failed-record reason, chunk metadata assertion, run-report
  field, or learner explanation prompt.
