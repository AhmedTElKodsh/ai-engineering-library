# RAG Citation and Abstention Evidence Checklist

Use this checklist before creating or revising a Module 4 lesson that retrieves context, generates cited answers, evaluates retrieval quality, or teaches abstention when evidence is weak.

This file is an authoring aid. It keeps Course 1 RAG work focused on source grounding, inspectable retrieval, and refusal of unsupported claims before advanced GraphRAG or production-scale retrieval.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 4 |
|---|---|---|---|
| B09 `Hands-On Large Language Models` | Chapter 8, p.358, `B09_B09_P0358_C001` | RAG answer quality can be evaluated with citation recall and citation precision. | Require tests or rubric checks for whether claims have supporting citations and whether citations actually support the claims. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.108-109, `B05_B05_P0108_C001`, `B05_B05_P0109_C001` | RAG reduces hallucination risk by grounding answers in retrieved evidence, but fabricated citations remain a failure mode. | Require unsupported-claim and invented-citation negative cases. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.147, `B05_B05_P0147_C001` | Critical systems benefit from tracing generated statements back to supporting context. | Require retrieval traces that expose selected chunks and citation coverage. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.149, `B05_B05_P0149_C001` | Retrieval quality and generation quality should be debugged separately. | Require authors to test retrieval first, then answer generation. |
| B10 `LLM Engineer's Handbook` | Chapter 7, p.300-303, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` | RAG evaluation should use test datasets and monitor retrieval/generation quality over time; model-judge outputs need caution. | Keep Course 1 evals small and deterministic before optional judge-based evaluation. |
| B19 `Essential GraphRAG` | Chapter 8, p.142, `B19_B19_P0142_C001` | Answer correctness can be checked by testing whether answer statements are attributable to the provided context. | Require sentence/claim support checks in rubrics or tests when answers make factual claims. |
| B01 `Generative AI in Action` | Chapter 7, p.209 and p.238, `B01_B01_P0209_C001`, `B01_B01_P0238_C001` | RAG connects LLM behavior to external retrieved knowledge and depends on retriever quality. | Require source records and retrieval quality to be visible before answer text. |
| Local PDF `Principles of Building AI Agents` | p.88 and p.92-93 | RAG pipelines require chunking, embeddings, vector storage, metadata upsert, indexing, querying, and optional reranking decisions. | Require chunks and metadata to be inspectable before answer generation. |
| Local PDF `Hands-On RAG for Production` | p.8-15 | RAG grounds answers in external evidence and separates ingest, retrieval, generation, and post-generation guardrails. | Require authors to test ingest/provenance and retrieval separately from answer construction. |
| Local PDF `Hands-On RAG for Production` | p.20 and p.41-43 | RAG can reduce hallucinations, but missing relevant data, weak retrieval, and LLM gap-filling still cause bad answers. | Require no-data, weak-evidence, and hallucination/unsupported-output negative cases. |
| Local PDF `Hands-On RAG for Production` | p.22 and p.47-49 | Permission metadata and query filtering are part of preventing data leakage in RAG. | Require source metadata and authorization assumptions when retrieved evidence has access boundaries. |

Do not copy book text into learner-facing files. Use these locators to justify testable citation, abstention, and retrieval-trace behavior.

## Authoring Gate

A Module 4 RAG lesson is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What source records are allowed? | Name fixture files, source IDs, metadata fields, and provenance assumptions. |
| What retrieval method is used first? | Name keyword, vector, hybrid, or deterministic lookup and why it fits the lesson. |
| What counts as enough evidence? | Define score threshold, citation count, source match, or reviewer rule. |
| What causes abstention? | Define missing evidence, weak score, unsupported claim, stale source, or unsafe request. |
| What citation shape is required? | Define chunk ID, source URL, title/heading, timestamp, or metadata fields. |
| What answer claims need support? | Identify the facts, numbers, comparisons, or recommendations that require citations. |
| What failure is practiced first? | Name the expected learner TODO failure before implementation. |
| What trace is recorded? | Include query, normalized terms, selected chunks, rejected chunks, scores, and abstention reason. |
| What does the learner explain? | Require a short note on why the answer was supported or why abstention was safer. |

## Minimum Test Set

Every citation/abstention RAG exercise should include at least five of these tests.

| Test type | Required learner evidence |
|---|---|
| Provenance load test | Chunks preserve source ID, source URL, heading, timestamp, or other citation metadata. |
| Retrieval ranking test | Supported queries return relevant chunks ahead of weaker matches. |
| Citation support test | Answers include citations that map to selected chunks. |
| Citation precision test | Returned citations support the answer claim rather than appearing decorative. |
| Unsupported-claim test | Questions without evidence abstain instead of guessing. |
| Missing-data test | A query whose needed source is absent produces an abstention or review reason. |
| Invented-citation test | The answer cannot cite source IDs that were not retrieved or do not exist. |
| Weak-evidence threshold test | Low-scoring retrieval results trigger abstention or review. |
| Permission-filter test | Restricted chunks are excluded from retrieval or trigger refusal for unauthorized requests. |
| Retrieval trace test | Developers can inspect query terms, scores, selected chunks, and rejected chunks. |
| Separate retrieval/generation test | Retrieval behavior can be tested before answer wording is evaluated. |

## Rubric Hooks

Add these rubric checks when a lesson touches RAG answers:

- Source metadata survives ingestion, chunking, retrieval, and answer construction.
- Citations are required for factual claims and map to real retrieved chunks.
- Unsupported or weakly supported questions produce abstention with a clear reason.
- Retrieval traces make bad answers debuggable.
- The learner compares retrieval failure separately from prompt or answer-generation failure.
- The learner can explain why abstention is a reliability feature, not a failure to be hidden.

## Scope Boundaries

Keep Course 1 RAG practical and inspectable.

- Do not introduce GraphRAG implementation depth in the required path.
- Do not require hosted vector databases for the first green path.
- Do not use judge-based evaluation as the only correctness signal.
- Do not let answer fluency override citation support.
- Defer reranking, large retrieval benchmarks, adaptive RAG, production monitoring dashboards, and knowledge graph construction to Course 3 or specializations.
