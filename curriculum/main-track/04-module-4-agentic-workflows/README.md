# Module 4: AI-Ready Data, RAG, and Agentic Workflows

## Controlled Workflows Before Autonomous Agents

**Duration:** required web-data bridge plus 4 core phases  
**Expected time to finish:** 20-30 hours for the required bridge plus Phases 1-4  
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

For authors extending memory or state-related lessons, use
`MEMORY_SAFETY_EVIDENCE_CHECKLIST.md` to connect source evidence to retention
rules, privacy boundaries, summarization tests, state traces, and rubric hooks
before editing learner files.
For authors extending RAG lessons, use `RAG_CITATION_ABSTENTION_CHECKLIST.md`
to connect source evidence to citation metadata, unsupported-claim tests,
abstention rules, retrieval traces, and rubric hooks before editing learner
files.
For authors extending workflow or agent-related lessons, use
`WORKFLOW_VS_AGENT_DECISION_TREE.md` to justify deterministic code, prompt calls,
RAG, explicit workflows, critique loops, bounded agents, or multi-role patterns
before adding autonomy.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 4's Course 1
core path is AI-ready data, cited retrieval, abstention, explicit workflows,
critique, retry, and human-review gates. The learner should prove that each
answer or action is supported by evidence.

The advanced doorway is GraphRAG, framework state machines, complex
orchestration, autonomous agents, and multi-agent systems at scale. Those labs
now live in `../../extended-concepts/02-agentic-systems/` so the main path keeps
retrieval and workflows inspectable, testable, and stoppable.

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

The retrieval progression is explicit:

1. keyword baseline
2. tiny embedding similarity using Module 2 vector habits
3. hybrid score that combines lexical and vector evidence
4. short comparison of failure cases

**Workflow Automation Agent**

Learners then add a bounded multi-step workflow that plans, calls tools, checks intermediate outputs, and stops safely.

FinAgent reuses these skills for cited market context, uncertainty labels, source comparison, and controlled research-note generation. Its finance safety boundary is defined in `../../FINANCE_SAFETY.md`.

## Folder Map

The folder names stay stable for tests and links. The learner-facing titles below are the names to use in docs, plans, and conversations.

| Phase | Folder | Learner-facing title | Learner deliverable | Verification from repo root |
| --- | --- | --- | --- | --- |
| Required bridge | `../../specializations/web-scraping/core-lab-01-http-inspection` | HTTP And Page Inspection Lab | Build an allowed-source checklist and extraction target table before collection | `python -m pytest curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests -v` |
| Required bridge | `../../specializations/web-scraping/core-lab-02-fixture-static-extraction` | Fixture-First Static Extraction Lab | Extract citation-ready records from local HTML fixtures with failed-row evidence | `python -m pytest curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests -v` |
| Required bridge | `../../specializations/web-scraping/core-lab-03-api-first-collection` | API-First Collection Lab | Prefer stable JSON payloads, validate records, and preserve raw/clean/failed layers | `python -m pytest curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests -v` |
| Phase 1 | `week-01-basic-rag` | AI-Ready Ingestion And Chunking Lab | Build raw, clean, failed, and chunked source layers with provenance metadata | `python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/tests -v` |
| Phase 2 | `week-02-advanced-rag` | Citation And Abstention RAG Lab | Add retrieval, citation checks, and abstention behavior over bridge/Phase 1 chunks | `python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/tests -v` |
| Phase 3 | `week-03-core-patterns` | Explicit Workflow Pattern Lab | Build prompt chaining, routing, and tool-use workflows with gates | `python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/tests -v` |
| Phase 4 | `week-04-advanced-patterns` | Critique And Review Loop Lab | Add reflection, critique, retry, and human-review checkpoints | `python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-04-advanced-patterns/tests -v` |

Phases 1-4 and the required web-data bridge labs are the Course 1 core. Tests
are expected to fail before learners complete the TODOs in `workbench.py`.

## Extended Concepts

Move to these only after Phase 4's explicit critique/retry loop works:

| Extended order | Folder | When to use it |
| ---: | --- | --- |
| 1 | `../../extended-concepts/02-agentic-systems/week-01-framework-state-machine` | When the learner needs to compare plain Python workflow state to framework-style state. |
| 2 | `../../extended-concepts/02-agentic-systems/week-02-resumable-orchestration` | When retry/resume behavior is a real project requirement. |
| 3 | `../../extended-concepts/02-agentic-systems/week-03-multi-role-collaboration` | When review roles and handoffs are more valuable than a single reviewer gate. |
| 4 | `../../extended-concepts/02-agentic-systems/week-04-production-multi-agent-boundaries` | When the learner is ready to reason about production multi-agent stop conditions and tool permissions. |

## Learner Readiness Boundary

Assign the required web-data bridge plus Phases 1-4 in order. Offer the
extended concepts only after the learner can already explain and test the
explicit workflow path. Each listed folder has a README, learner-editable
`workbench.py`, tests that collect cleanly, hints, and a rubric.

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
- implement a bounded explicit workflow with critique/review gates
- inspect trace state after a failed run
- justify when not to use an agent
