# Module 4 AI Authoring Guide

Use this guide when creating or modifying RAG, web data, and workflow lessons.

## Module Role

Module 4 combines AI-ready data, retrieval, source grounding, and controlled workflows before adding agent autonomy.

## Authoring Priorities

1. Teach data loading, cleaning, metadata, and failed-record handling before RAG answers.
2. Teach cited retrieval and abstention before agent workflows.
3. Teach explicit workflows before framework-managed state.
4. Add bounded loops and stop conditions before multi-agent behavior.
5. Make debugging traces visible.

## Lesson Requirements

Each week needs:

- fixture data or deterministic local inputs
- an expected time to finish near the top of the README and learner-editable workbench file
- `workbench.py`
- tests for missing fields, bad records, weak evidence, and unsupported claims where relevant
- progressive hints
- a rubric covering source grounding and traceability
- reviewer-only reference notes

## Guardrails

- Do not start with autonomous agents.
- Do not let RAG skip raw/clean/curated data boundaries.
- Do not treat retrieved text as automatically true.
- Do not add network scraping unless fixture tests pass first and ethics rules are documented.

## Pedagogy Enforcement

Every Module 4 lesson must make the teaching style visible:

- explain retrieval or workflow behavior like a knowledgeable friend at a cafe, using concrete records, arrows, and failure examples
- include a useful diagram, mind map, retrieval table, or workflow sequence when it clarifies state, evidence, or control flow
- search the web before publishing for one current, high-quality visual or video resource for the exact RAG, retrieval, workflow, or agent topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- frame the lesson around a bad answer, weak evidence, messy data, or runaway workflow
- ask learners to inspect source records, chunks, retrieval scores, state, or traces before editing
- require a prediction about citation, abstention, or stop-condition behavior
- make Evidence First debugging start from an observed retrieval or workflow failure
- guide the learner from explicit workflow to more autonomy only when justified
- end by explaining when not to use RAG or an agent

If the lesson treats retrieval or agents as magic, revise the trace and refusal paths before adding features.

## Good Module 4 Slice

A good slice teaches one retrieval or workflow concept with inspectable state and clear refusal behavior when evidence is weak.

## Instructor Guidance

Use learner-facing phase titles even when stable folder names remain week-based:

- `week-01-basic-rag`: Phase 1 - AI-Ready Ingestion And Chunking Lab
- `week-02-advanced-rag`: Phase 2 - Citation And Abstention RAG Lab
- `week-03-core-patterns`: Phase 3 - Explicit Workflow Pattern Lab
- `week-04-advanced-patterns`: Phase 4 - Critique And Review Loop Lab
- `week-05-langgraph-state`: Phase 5 - Framework State Machine Lab
- `week-06-advanced-orchestration`: Phase 6 - Resumable Orchestration Lab
- `week-07-collaboration`: Phase 7 - Multi-Role Review Workflow Lab
- `week-08-production-multi-agent`: Phase 8 - Production Multi-Agent Boundaries Lab

Keep Phase 1 narrower than the folder name suggests: AI-ready data and chunk output only. Retrieval, cited answers, vector search, and agent loops start after failed-record handling and provenance metadata are testable.
