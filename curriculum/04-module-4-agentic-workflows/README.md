# Module 4: AI-Ready Data, RAG, and Agentic Workflows

## Controlled Workflows Before Autonomous Agents

**Duration:** 8 weeks  
**Expected time to finish:** 12-18 hours core, plus 3-5 hours optional enrichment  
**Prerequisites:** Module 3 or equivalent comfort with tool contracts and testable boundaries  
**Pedagogy:** simple composable workflows first, agent autonomy only when justified

## Module Overview

Module 4 combines retrieval, tools, state, and controlled agent loops. The learner first builds predictable workflows with explicit code paths, then studies when an agent should be allowed to choose its own next step.

| Question | Answer |
| --- | --- |
| What will I build? | A path from AI-ready records to cited retrieval and bounded workflow decisions. |
| What skill will I practice? | Preserve evidence, inspect failures, build explicit workflows, and justify when autonomy is not needed. |
| How does this prepare me for the next module? | It gives Module 5 concrete RAG and workflow behavior to evaluate, log, harden, and explain. |

**Previous:** you wrapped model, prompt, and tool behavior behind testable contracts.  
**Current:** you turn source records into trustworthy chunks, retrieval evidence, and bounded workflow state.  
**Next:** you harden these systems with evals, logs, release checks, and failure analysis.

The goal is not to worship agent frameworks. The goal is to make the learner able to decide when a single LLM call, a retrieval pipeline, a workflow, or an agent is the simplest reliable solution.

The book synthesis reinforces that many RAG failures happen before retrieval: bad loading, weak cleaning, missing metadata, arbitrary chunks, and no record of failed inputs. Module 4 therefore starts with AI-ready data pipelines before vector search or agent workflows.

The required Web Data Acquisition bridge now feeds this module directly. Learners first inspect allowed sources and extract fixture-backed records with provenance, then Module 4 consumes those records as clean chunks for citation and abstention RAG.

## Layer-Proof Project

**AI-Ready Data Pipeline**

Learners build a small raw/clean/curated pipeline that can:

- load local documents or rows from fixtures
- normalize text and metadata
- preserve source IDs and timestamps
- validate required fields
- report failed records without crashing
- emit chunks that are ready for retrieval

**Document QA / RAG Support Desk**

Learners build a source-grounded assistant over a small document set. It must retrieve relevant context, cite sources, abstain when evidence is weak, and expose enough trace data to debug bad answers.

**Workflow Automation Agent**

Learners then add a bounded multi-step workflow that plans, calls tools, checks intermediate outputs, and stops safely.

FinAgent reuses these skills for cited market context, uncertainty labels, source comparison, and controlled research-note generation.

## Folder Map

The folder names stay stable for tests and links. The learner-facing titles below are the names to use in docs, plans, and conversations.

| Phase | Folder | Learner-facing title | Learner deliverable | Verification from repo root |
| --- | --- | --- | --- | --- |
| Required bridge | `../specializations/web-scraping/core-lab-01-http-inspection` | HTTP And Page Inspection Lab | Build an allowed-source checklist and extraction target table before collection | `python -m pytest curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests -v` |
| Required bridge | `../specializations/web-scraping/core-lab-02-fixture-static-extraction` | Fixture-First Static Extraction Lab | Extract citation-ready records from local HTML fixtures with failed-row evidence | `python -m pytest curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests -v` |
| Required bridge | `../specializations/web-scraping/core-lab-03-api-first-collection` | API-First Collection Lab | Prefer stable JSON payloads, validate records, and preserve raw/clean/failed layers | `python -m pytest curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests -v` |
| Phase 1 | `week-01-basic-rag` | AI-Ready Ingestion And Chunking Lab | Build raw, clean, failed, and chunked source layers with provenance metadata | `python -m pytest curriculum/04-module-4-agentic-workflows/week-01-basic-rag/tests -v` |
| Phase 2 | `week-02-advanced-rag` | Citation And Abstention RAG Lab | Add retrieval, citation checks, and abstention behavior over bridge/Phase 1 chunks | `python -m pytest curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests -v` |
| Phase 3 | `week-03-core-patterns` | Explicit Workflow Pattern Lab | Build prompt chaining, routing, and tool-use workflows with gates | planned scaffold |
| Phase 4 | `week-04-advanced-patterns` | Critique And Review Loop Lab | Add reflection, critique, retry, and human-review checkpoints | planned scaffold |
| Phase 5 | `week-05-langgraph-state` | Framework State Machine Lab | Rebuild one explicit loop with framework-managed state after the plain-Python version works | planned scaffold |
| Phase 6 | `week-06-advanced-orchestration` | Resumable Orchestration Lab | Add error recovery, bounded loops, and resumable workflow state | planned scaffold |
| Phase 7 | `week-07-collaboration` | Multi-Role Review Workflow Lab | Build a multi-role review or collaboration workflow with clear ownership | planned scaffold |
| Phase 8 | `week-08-production-multi-agent` | Production Multi-Agent Boundaries Lab | Build a small multi-agent system with traceable decisions and stop conditions | planned scaffold |

Phase 1, Phase 2, and the first three required web-data bridge labs now include learner scaffolds. Tests are expected to fail before learners complete the TODOs in `workbench.py`.

## Teaching Contract

Every week should ask:

1. Is an agent needed, or is a simpler workflow enough?
2. What state does the system carry?
3. What tools can it call?
4. What evidence supports the answer?
5. How does the loop stop?
6. How will a developer debug a bad run?

## Style Rubric

A strong Module 4 learner:

- treats ingestion, metadata, and chunking as first-class engineering work
- preserves raw source identity and cleaning decisions
- starts with retrieval and explicit workflows before agent autonomy
- includes source metadata and abstention paths in RAG output
- compares retrieval strategies with a small eval set instead of guessing
- writes tests for unsupported claims and missing citations
- keeps loop counts, retries, and tool access bounded
- can explain the cost, latency, and reliability tradeoffs of each pattern
- uses frameworks only after understanding the underlying prompts, state, and tool calls

## FinAgent Connection

FinAgent should become a careful research assistant, not a free-running market oracle. Module 4 teaches it to:

- keep raw, clean, and curated market context separate
- retrieve cited public context
- compare multiple sources
- flag stale or uncertain evidence
- generate educational briefs with limitations
- stop when tool evidence is missing or contradictory

## Checkpoint Gate

Learners are ready for Module 5 when they can:

- build a reproducible data pipeline with metadata and failed-record handling
- build a RAG pipeline with citations and abstention
- compare vector, keyword, or hybrid retrieval on a small benchmark
- explain why a retrieval result was or was not relevant
- implement a bounded agentic workflow
- inspect trace state after a failed run
- justify when not to use an agent
