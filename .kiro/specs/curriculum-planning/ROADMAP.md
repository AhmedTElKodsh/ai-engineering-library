# AI Engineering Curriculum Roadmap

## Purpose

This is the single roadmap for the text-based AI engineering curriculum. It merges the useful planning material preserved under `.kiro/specs/curriculum-planning/source-material/`, the current `curriculum/` structure, and the strongest legacy teaching patterns from the repository-level `_legacy/hands-on-ai` and `_legacy/Python-Daily-Practice` folders.

The curriculum goal is not to build a learning SaaS first. The immediate product is a clear, engaging, test-guided written curriculum that takes a learner from Python foundations to a portfolio-ready FinAgent stock-market analysis capstone.

Layer 1 targets learners who have intermediate Python and only early exposure to AI engineering. Later layers can raise the complexity toward senior-level architecture, scaling, research depth, and platform work. Layer 1 must first build the junior engineer's daily loop: read code, reason from tests, implement personally, debug with evidence, and explain tradeoffs.

The book-derived all-phases synthesis in `source-material/AI_Engineering_Curriculum_All_Phases.md` is now treated as a broad concept source. Its 27-module track structure is too large for Layer 1, but its deduplicated concept map is useful for strengthening missing coverage in the current path.

## North Star

Learners become AI engineers by writing, testing, explaining, and improving code themselves.

They should not graduate as prompt-only operators. They should be able to:

- read unfamiliar AI engineering code and explain it in plain English
- implement missing behavior from scaffolded TODOs
- use tests as feedback instead of as an afterthought
- build reliable data, scraping, tool, RAG, agent, and production workflows
- defend design tradeoffs in writing or interview-style explanations
- ship a stock-market analysis capstone with source grounding, uncertainty labels, and clear limitations

## Layer 1 Product Contract

Layer 1's concrete promise is:

> Build reliable AI features, agents, and apps with Python through tested mini-projects and one portfolio capstone.

Layer 1's final exit standard is:

> By the end of Layer 1, learners can design, build, test, evaluate, and explain a small production-shaped AI assistant using LLM APIs, structured prompts, tools, retrieval, basic agent workflows, safety boundaries, and reliability practices.

Layer 1 is conclusive for junior AI engineering. It is not a compressed version of every book in the source library. A learner should graduate with practical system-building judgment, not with the expectation that they can train foundation models, operate enterprise ML platforms, or design advanced research systems.

The curriculum uses a spine-and-ribs structure:

- **Spine:** FinAgent, an educational stock-market analysis assistant, appears in small slices across the curriculum.
- **Ribs:** smaller layer-proof projects prove transfer in RAG, tools, workflows, and production.
- **Final:** the FinAgent capstone synthesizes the layers into one portfolio artifact.

This avoids two failure modes: one enormous capstone that hides weak transfer, and many disconnected projects that dilute the learner's story.

## Course Ladder

The uploaded books and private RAG corpus support more than one course. Keep the levels separate:

| Course | Target learner | Main promise | Relationship to Layer 1 |
| --- | --- | --- | --- |
| Course 1: Junior AI Engineering With Python | Intermediate Python, limited AI background | Build, test, evaluate, and explain practical LLM/RAG/tool/agent systems through FinAgent | Active course |
| Mini-course: Web Data Acquisition for AI Systems | Course 1 learners after Python, software, API, and HTTP basics | Responsibly collect, clean, validate, test, and package web/API data for AI workflows | Mandatory bounded bridge; deeper scraping remains an extension |
| Course 2: Machine Learning, Deep Learning, and Neural Network Foundations | Graduates of Course 1 or learners who need deeper model intuition | Understand datasets, tensors, training loops, losses, optimization, backprop intuition, neural networks, embeddings, and small model experiments | Best bridge before the advanced course; preview only in Layer 1 |
| Course 3: Advanced Production AI Engineering | Intermediate AI engineers who passed Course 1 and ideally Course 2 | Fine-tuning, GraphRAG, multimodal systems, advanced agents, LLMOps at scale, production ML systems, governance, and optimization | Later course |

Layer 1 may explain the shape of Course 2 and Course 3 topics in one or two practical paragraphs when needed. It should not teach their implementation depth unless a lesson explicitly marks the work as optional enrichment. Web data acquisition is the exception to "optional only": every Course 1 learner needs a bounded version because RAG, datasets, tools, monitoring, and FinAgent all depend on reliable source data.

## Source-Level Routing Matrix

Use `AI_Engineering_Books.md`, `books_encyclopedia_outline_source_map.md`, and `master_ai_engineering_rag_corpus/` as source material, then route every concept by learner level before adding it to a lesson.

| Source cluster | Layer 1 core | Layer 1 preview or optional enrichment | Later course |
| --- | --- | --- | --- |
| Git and engineering workflow | Git basics, branches, pull requests, review habits, reproducible commands | GitHub Actions overview, artifact/versioning awareness | Advanced release engineering and monorepo/platform workflows |
| Python and software engineering | workbench code, tests, fixtures, configuration, retries, data models, error handling | packaging polish, lightweight CLIs | large framework architecture and internal platforms |
| ML systems and MLOps | when to use AI, train vs inference, leakage, drift intuition, metrics, model-selection decisions | artifact tracking and deployment vocabulary | full retraining platforms, feature stores, registry-heavy MLOps |
| LLM foundations | tokenization, embeddings, attention, context windows, decoding, transformer intuition | tiny transformer trace, training vocabulary | from-scratch GPT training, GPU training loops, deep math |
| LLM APIs and PromptOps | chat roles, wrappers, retries, streaming, token/cost logs, structured outputs, prompt tests, injection tests | provider comparison, prompt/version tracking patterns | enterprise prompt management and large-scale traffic optimization |
| Web data acquisition | HTTP, API-first collection, fixture-first extraction, pagination, dynamic-page awareness, robots/ToS review, rate limits, retries, provenance, raw/clean/processed data, broken-selector tests, RAG-ready chunks | browser automation, sessions/forms on demo targets, crawl queues, scheduled refresh | distributed crawling, large-scale monitoring, anti-fragile production recovery, legal review workflows |
| Data engineering for RAG | loading, cleaning, metadata, lineage, chunking, failed-record handling, reproducible fixtures | batch/streaming vocabulary, vector-store choices | lakehouse depth, orchestration platforms, schema governance at scale |
| RAG and retrieval | semantic search, chunking, citations, abstention, retrieval logs, citation precision/recall, simple hybrid search | reranking, query transformations, feedback loops | GraphRAG, knowledge graph construction, advanced context engines |
| Tools, MCP, and agents | typed tool schemas, local adapters, MCP-style boundaries, bounded workflows, state, stop conditions | LangGraph overview, memory boundaries, simple reflection | large autonomous multi-agent systems, complex agent organizations |
| Fine-tuning and adaptation | decision framework: deterministic code vs prompt vs RAG vs tool vs fine-tune | LoRA/QLoRA concepts and dataset-format awareness | hands-on fine-tuning, PEFT experiments, model adaptation projects |
| Multimodal and real-time AI | recognize when multimodal or voice changes requirements | optional demo analysis or architecture sketch | diffusion, audio/video generation, real-time multimodal agents |
| LLMOps, safety, and production | eval sets, regression checks, logs, traces, cost, latency, rate limits, safety boundaries, governance basics | lightweight dashboards and incident notes | full observability stacks, compliance programs, model risk governance |

If a candidate topic does not fit the Layer 1 time budget and exit standard, route it to preview, Course 2, Course 3, a specialization, or `future/platform-notes.md`.

## FinAgent Product Arc

FinAgent should be visible as one staged product story, not only a final project.

| Module | FinAgent increment | Learner evidence |
| --- | --- | --- |
| Module 0 | clean Python utilities for loading, validating, and summarizing stock data | diagnostic result, tested utility, one edge-case test |
| Module 1 | first deterministic educational analysis workflow | trace note, modified signal/report behavior, boundary note |
| Module 2 | model-intuition lens for tokens, embeddings, retrieval, and context limits | tiny mechanism implementation, plain-English limitation explanation |
| Module 3 | LLM API wrapper, prompt contract, structured output, tool boundary, MCP-style interface | prompt regression test, typed tool schema, secret-safe trace |
| Module 4 | cited market/company context with RAG, web data, and a bounded workflow | source metadata, retrieval log, abstention/citation check |
| Module 5 | production hardening for evals, logs, cost, latency, safety, and failure analysis | golden eval run, structured logs, release/readiness note |
| Module 6 | capstone kickoff, deterministic integration build, and polish | scope note, eval cases, runnable local workflow, portfolio ledger, demo evidence, limitation and ethics note |

## Pacing Guardrails

Use time budgets to prevent the junior course from becoming an encyclopedia.

| Module | Core time budget | Optional enrichment cap | Scope pressure to watch |
| --- | ---: | ---: | --- |
| Module 0 | 6-10 hours, diagnostic-driven | 2-4 hours | do not reteach all Python |
| Module 1 | 8-12 hours | 2-3 hours | do not hide the whole-game workflow behind theory |
| Module 2 | 12-16 hours | 3-4 hours | do not become a full deep-learning course |
| Module 3 | 10-14 hours | 2-4 hours | do not become all agent frameworks |
| Module 4 core | 12-18 hours for Phases 1-4 after the web-data bridge | 16-24 hours for Phases 5-8 advanced workflow doorway | do not make state frameworks, collaboration, or production multi-agent work required for Course 1 |
| Web Data Acquisition mini-course | 8-12 hours | 10-20 hours in specialization | keep it mandatory but bounded; do not become a production scraping engineer track |
| Module 5 | 10-14 hours | 2-4 hours | keep production practical, not enterprise platform-heavy |
| Module 6 | 12-18 hours | 4-6 hours | keep FinAgent educational, not fintech SaaS |

Each module README or `AI_AUTHORING_GUIDE.md` should state new concepts introduced, concepts intentionally deferred, maximum new tools/APIs, required visuals, and the checkpoint evidence.

## External Benchmark Findings

The 2026 benchmark pass found consistent patterns across strong courses and public repositories:

- Full Stack LLM Bootcamp emphasizes app-first building, prompt engineering, augmented language models, UX, LLMOps, testing, CI, deployment, and monitoring.
- Hugging Face's Agents Course sequences onboarding, agent fundamentals, frameworks, use cases, and a final benchmarked project.
- Made With ML keeps production learning organized around design, data, model work, testing, reproducibility, CI/CD, and monitoring.
- Modern GitHub courses such as DataTalksClub LLM Zoomcamp, Microsoft Generative AI for Beginners, Microsoft AI Agents for Beginners, and LangChain/LangGraph course repos consistently use practical projects around RAG, tools, agents, evals, deployment, and portfolio artifacts.
- Current agent guidance favors simple composable workflows before autonomous agents, with complexity added only when it improves the task enough to justify cost, latency, and debugging burden.

Planning implication: keep the existing module folders, finish Modules 3-6 to the same learner-ready standard as Modules 0-2, add smaller layer-proof projects, and keep platform infrastructure out of Layer 1 unless it directly teaches a production concept.

## Book Synthesis Findings

The all-phases book synthesis adds three important corrections to the current roadmap:

- **LLM application engineering needs its own visible layer.** API wrappers, chat roles, streaming, token/cost logs, prompt templates, structured outputs, prompt injection tests, and prompt/version tracking should appear before learners build tools, RAG, or agents.
- **RAG starts with data engineering.** Loading, cleaning, metadata, chunking, lineage, quality checks, schema drift, and failed-record handling must come before vector search and answer generation.
- **Production is more than deployment.** Model/system design, golden evals, artifact/version tracking, rollout/rollback notes, observability, cost, latency, safety, governance, and model-selection decisions belong in the core path.

The synthesis also contains material that should be parked outside Layer 1:

- full from-scratch GPT training
- deep LoRA/QLoRA fine-tuning projects
- GraphRAG, Spatial-RAG, video RAG, and advanced multimodal systems
- production ML drift/retraining platforms
- enterprise AI engineering platform infrastructure
- large multi-agent organizations

Those topics become Layer 2 or specialization candidates after the junior path is complete.

## Critical Titles

Layer 1 should cover these titles conclusively for a junior AI engineer:

1. Python engineering for AI systems
2. Test-guided development and debugging
3. AI use-case framing and "when not to use AI" decisions
4. Minimal ML foundations: metrics, leakage, drift, training vs inference
5. LLM API wrappers, chat roles, streaming, token/cost tracking, retries, and rate limits
6. Prompt engineering, PromptOps, structured outputs, schema validation, and injection testing
7. Tokenization, embeddings, attention, context windows, and transformer intuition
8. Data loading, validation, metadata, lineage, quality checks, and fixture-based pipelines
9. Retrieval, chunking, citation, abstention, hybrid search basics, and RAG evaluation
10. Tool calling, typed schemas, APIs, and MCP-style boundaries
11. Agentic workflows, state, routing, reflection, memory boundaries, and bounded loops
12. Evaluation, golden datasets, regression checks, human review, and failure analysis
13. Deployment boundaries, configuration, secrets, logging, monitoring, cost, and latency
14. Safety, privacy, source grounding, governance basics, and domain limitations
15. Model selection and adaptation decisions: prompting vs RAG vs fine-tuning vs deterministic software
16. Portfolio presentation, architecture explanation, and interview defense
17. Web data acquisition for AI systems: allowed-source review, API-first collection, ethical scraping when justified, fixture-first extraction, provenance, validation, broken-selector recovery, and RAG-ready dataset packaging

## Merged Source Map

The old `.kiro/specs` planning files are now treated as source material for this roadmap, not as competing plans. Their root-level folders were consolidated into `source-material/legacy-specs/` so `.kiro/specs` has one active planning folder.

| Source | What is kept | What is parked |
| --- | --- | --- |
| `source-material/legacy-specs/ai-engineering-curriculum-implementation` | module requirements, diagnostic entry points, FinAgent continuity, content quality standards, daily content, milestone, portfolio, and review ideas | React, Node microservices, Kubernetes, S3, ElasticSearch, hosted platform implementation |
| `source-material/legacy-specs/ai-engineering-curriculum-implementation/capstone-financial` | FinAgent requirements, module-to-capstone mapping, financial data/tool/RAG/agent/production capabilities, portfolio assessment | oversized requirements that force unrealistic full fintech platform scope |
| `source-material/legacy-specs/teaching-methodology-evaluation` | cognitive apprenticeship, whole-part-whole, Socratic discovery, progress visibility, chapter template rules, interview-prep integration | standalone methodology evaluator tooling |
| `source-material/legacy-specs/capstone-pedagogical-enhancement` | read/explain/modify/create progression, technical interview practice, professional workflow, code-comprehension-first exercises, capstone rubrics | separate capstone enhancement project plan |
| `source-material/legacy-specs/web-scraping-curriculum` | ethical scraping, progressive projects, fixture-first tests, Socratic hints, data pipeline framing, responsible target selection | web scraping as detached curriculum; the active plan is now a mandatory bounded mini-course plus optional extension |
| repository `_legacy/hands-on-ai` | action-first teaching, story-first tone, mechanic workflow, production habits, checkpoint gates, spiral callbacks | domain-specific assumptions that no longer fit the stock-market capstone |
| `_legacy/Python-Daily-Practice` | day-00 diagnostic, daily sequencing, failing tests, cheatsheets, weekly projects | isolated Python-only framing |
| `source-material/AI_Engineering_Curriculum_All_Phases.md` | deduplicated book concept map, LLM API/prompt layer, data engineering before RAG, MLOps/LLMOps progression, project portfolio ladder | direct 27-module copy, full advanced tracks inside Layer 1, enterprise platform and deep fine-tuning scope |
| `docs/pedagogy-methodologies-research.md` | evidence-informed pedagogy map, GitHub teaching infrastructure examples, SE topic-to-method mapping, project-spine assessment model | citation-heavy research report prose inside learner-facing lessons |
| `docs/pedagogy-research-research-report.md` | broader comparative research notes and methodology taxonomy for future review | broken inline citation markers and unfiltered report copy |

Platform ideas live in `future/platform-notes.md` until the curriculum content itself is complete.

## Pedagogical Contract

Every learner-facing unit follows the same loop:

1. Read: understand the real problem and why it matters.
2. Trace: inspect a working or partially working example.
3. Explain: answer short prompts before changing code.
4. Modify: make a constrained change.
5. Create: write the missing code from scaffolded TODOs.
6. Verify: run tests and interpret failures.
7. Reflect: name what changed in your mental model.

The curriculum may use AI assistants for explanation, hints, review, and debugging prompts. It must not ask learners to paste complete generated solutions as the main learning path.

AI help follows a hint ladder:

1. Restate the goal and ask one focusing question.
2. Point to the relevant test, variable, line, or edge case.
3. Give pseudocode or a step-by-step plan.
4. Explain the likely bug and how to verify the fix.
5. Show a clearly labeled reference solution only after the learner has attempted the task or explicitly asks for reference mode.

Reference code is for review after effort, not the default path.

## Evidence-Informed Teaching Stack

The updated pedagogy research adds one rule to the roadmap: choose teaching methods by the software engineering skill being taught, not by habit.

The default stack is:

1. Backward design: define the learner evidence first.
2. Whole-part-whole: show the full workflow, practice one part, reconnect to the workflow.
3. Cognitive apprenticeship: model expert reasoning, coach early attempts, then fade support.
4. Worked trace before TODOs: read code, logs, data, tests, or examples before independent implementation.
5. Test-driven learning: tests act as specification, feedback, and professional habit.
6. Project-based learning: every concept eventually lands in a realistic artifact.
7. Review-based learning: learners explain, critique, and revise work when the project scope supports it.
8. Retrieval, spacing, and reflection: concepts return later through checkpoints and capstone callbacks.
9. Universal Design for Learning: important concepts may use text, tables, diagrams, traces, or optional external media.

Topic-to-method routing:

| Topic | Teaching emphasis | Portfolio evidence |
| --- | --- | --- |
| Requirements | case/problem-based discussion, stakeholder framing, Socratic checks | user stories, assumptions, acceptance criteria |
| Design and architecture | studio critique, examples, ADRs, tradeoff defense | diagram, ADR, risk note |
| Testing and quality | TDD, automated feedback, pair/debug labs | tests, CI command, failure interpretation |
| Maintenance and refactoring | code review, regression tests, OSS-style workflow | bug-fix summary, review response, refactor rationale |
| DevOps and operations | CI/CD labs, incident-style reflection, release boundaries | workflow, release note, logs, postmortem |
| Teamwork | pair work, peer assessment, lightweight agile rituals | issue breakdown, PR review, retrospective |
| Ethics, privacy, security, accessibility | case learning, threat/risk review, reflection | risk memo, mitigation, limitation note |
| AI reliability and evals | evidence-first debugging, golden evals, model decision framing | eval set, scored run, failure taxonomy |

## Repeating Lesson Ritual

Each lesson should include:

- story hook tied to FinAgent or a realistic AI engineering failure
- concise concept brief with no textbook sprawl
- worked trace before independent implementation
- workbench code with explicit TODOs
- progressive hints that stop short of the full answer
- failing tests that teach the intended behavior
- one intentional debug lab or edge case
- reflection prompts
- rubric or gate
- "How this strengthens FinAgent" callback

This repetition lowers learner friction while the technical difficulty rises.

The scaffolding should fade over time. Early lessons can ask learners exactly what to inspect before they edit. Later lessons should ask them to diagnose the failure, choose the smallest useful change, and defend the tradeoff with less prompting.

Assessment should be a portfolio, not only a final answer. For larger projects and the capstone, collect direct technical evidence, process evidence, explanation evidence, and reflection evidence. This keeps the curriculum aligned with professional software engineering outcomes: analysis, design, implementation, testing, communication, ethics, teamwork, and continuous improvement.

## Core Roadmap

### Module 0: Python Foundations

Folder: `00-python-foundations`

Goal: diagnose Python readiness, teach the course workbench ritual, remediate essentials when needed, and provide a post-Module-1 stock pipeline bridge.

Learner outputs:

- diagnostic results from `week-00-diagnostic`
- a first workbench experience where the learner reads tests, predicts failure, edits a small function, and explains the change
- tested functions for types, strings, collections, control flow, file handling, decorators, retries, and configuration when remediation is needed
- optional reinforcement for errors, context managers, OOP, generators, and Pythonic patterns
- a small stock research data pipeline after Module 1
- at least one learner-added edge-case test

FinAgent contribution:

- financial data models
- CSV loading and validation
- price movement calculations
- moving averages
- source-aware educational disclaimers

Gate:

- learner runs the diagnostic first
- learner can explain a pytest failure as expected vs actual behavior
- learner can keep secrets/config out of source code and logs
- learner completes Week 01 if the diagnostic shows Python gaps
- learner completes Module 1 before the stock pipeline
- learner completes the stock pipeline bridge before moving deeper into later modules

### Module 1: Whole-Game AI Engineering

Folder: `01-module-1-whole-game`

Goal: run, trace, modify, and test a small complete AI engineering workflow before studying all internals.

Learner outputs:

- first working FinAgent slice
- AI use-case decision note: deterministic code vs LLM vs RAG vs agent
- prompt or report modification
- tool or data-source modification
- execution trace
- tests around expected behavior and failure modes

FinAgent contribution:

- ingest a stock symbol or local fixture
- fetch or load small market data
- calculate one simple signal
- produce a plain-text educational analysis report
- log the workflow steps

Gate:

- learner can run the workflow locally
- learner can trace input, state, tool/data access, and output
- learner can modify one behavior without breaking existing tests
- learner can explain why the first FinAgent slice is deterministic before adding LLMs
- learner can describe what the system does not yet understand

### Module 2: First Principles and Model Intuition

Folder: `02-module-2-first-principles`

Goal: deconstruct the internals behind LLM and retrieval behavior without turning Layer 1 into a full model-training course.

Learner outputs:

- BPE tokenizer from scratch
- round-trip tokenization tests
- cosine similarity and simple retrieval implementation
- attention and mini-transformer exercises
- context-window, decoding, and model-selection intuition
- plain-English explanations of model limitations

FinAgent contribution:

- tokenize financial headlines or filings
- retrieve relevant market notes from a small corpus
- explain why tokenization, embeddings, and context limits affect financial analysis

Gate:

- learner can explain bytes-to-tokens-to-vectors-to-attention
- learner can implement a small component without high-level ML wrappers
- learner can write or pass property-style tests for parser/serializer behavior
- learner can explain training vs inference and why Layer 1 does not require full GPT training
- learner can identify where first-principles limitations show up in FinAgent

### Module 3: LLM APIs, PromptOps, Tools, and MCP

Folder: `03-module-3-mcp-integration`

Goal: teach AI systems to use model APIs, prompts, structured outputs, external tools, and MCP-style boundaries through explicit contracts.

Layer-proof projects:

- **LLM API Playground:** API wrapper, chat roles, model parameters, streaming, retries, token/cost logs, and safe configuration.
- **Prompt Engineering Test Suite:** prompt templates, structured JSON output, schema validation, regression examples, and injection tests.
- **Tool-Using Research Assistant:** validated request, one or two local tools, structured evidence, failure handling, and trace metadata.

Learner outputs:

- LLM API wrapper with retries, timeouts, and token/cost logging
- prompt templates with version notes and regression tests
- structured-output schema validation
- typed tool schemas
- local tool adapters
- simple MCP-style server or interface
- fixtures and mocks for tool calls
- validation and error handling tests
- secret-safe configuration and trace metadata

FinAgent contribution:

- market quote tool
- indicator calculation tool
- company/news context resource
- prompt/report template with schema validation
- structured report prompt
- audit log for tool invocations

Gate:

- model/API calls are wrapped behind testable interfaces
- prompts and structured outputs are versioned and tested
- all tool inputs and outputs are validated
- malformed data and missing data paths are tested
- secrets and configuration are not hardcoded
- learner can explain tool permissions and failure boundaries

### Web Data Acquisition for AI Systems Mini-Course

Folder: `specializations/web-scraping`

Goal: teach every Course 1 learner how to responsibly acquire, clean, validate, test, and package web/API data for downstream AI systems without turning Layer 1 into a production scraping engineer track.

Placement:

- starts after Module 2 has taught Python, software-engineering discipline, and HTTP/API literacy
- must be completed before the learner treats scraped or collected data as a source for Module 4 RAG, tools, agents, or FinAgent capstone evidence
- deeper browser automation, sessions, scheduled crawling, and larger spidering remain optional extension work in the same folder

Required core labs:

1. inspect HTTP responses, URLs, headers, status codes, and HTML structure
2. extract fields from stable local HTML fixtures before touching a live site
3. identify an API-first or hidden JSON collection path when available
4. handle pagination, retries, timeouts, rate limiting, and deduplication
5. validate rows with a schema and store raw, clean, and processed outputs
6. convert collected pages into RAG-ready chunks with source URL, timestamp, heading, and provenance metadata

Core mini-project:

- build a small documentation or market-context collector from approved public sources
- include fixture tests, a data-quality report, provenance table, cleaned dataset sample, RAG-ready chunk output, and a short legal/ethical checklist

Extension path:

- dynamic rendering with Playwright
- infinite scroll on safe demo targets
- sessions/forms with fake credentials and local fixtures
- crawl queues, canonical URL handling, scheduled refresh, monitoring, and broken-selector alerting
- market intelligence or agentic web research projects with explicit guardrails

Gate:

- fixture tests pass before any network path is enabled
- robots.txt, site terms, copyright, privacy, and PII assumptions are documented
- rate limits, retries, timeouts, and source attribution are implemented
- missing fields, malformed HTML, changed selectors, duplicate URLs, and stale data are tested
- raw, cleaned, processed, and RAG-ready layers are separated
- learner can explain when to use an API, when scraping is appropriate, and when to refuse collection

FinAgent contribution:

- collect supporting public context only from approved sources
- preserve source URLs, timestamps, headings, and extraction assumptions
- feed cited, uncertainty-aware context into later RAG and report-generation work

### Module 4: RAG, Web Data, and Agentic Workflows

Folder: `04-module-4-agentic-workflows`

Goal: combine AI-ready data pipelines, retrieval, web data, tool use, and controlled workflows before increasing autonomy.

Layer-proof projects:

- **AI-Ready Data Pipeline:** raw/clean/curated data flow, metadata schema, quality checks, failed-record handling, and run report.
- **Document QA / RAG Support Desk:** citations, abstention, retrieval logs, and grounded answers.
- **Workflow Automation Agent:** bounded steps, state, tool calls, reflection/critique, and stop conditions.

Learner outputs:

- document loader and chunker
- metadata and data-quality checks
- retrieval pipeline with citation checks
- vector and hybrid search benchmark basics
- planner/executor or ReAct-style workflow
- reflection or critic step
- testable agent behavior with bounded loops
- traceable decisions and "when not to use an agent" notes

FinAgent contribution:

- retrieve cited company and market context
- compare multiple sources
- flag stale or uncertain evidence
- preserve raw source metadata and cleaning decisions
- generate a research note with citations and limitations

Course 1 required core:

- Phase 1: AI-ready data pipeline
- Phase 2: citation and abstention RAG
- Phase 3: explicit workflow patterns
- Phase 4: critique, retry, and human-review loop

Advanced doorway, optional unless explicitly assigned:

- framework state-machine practice
- resumable orchestration
- multi-role collaboration
- production multi-agent boundaries

Gate:

- retrieval output includes source metadata
- ingestion output is reproducible and validates bad records
- agent loops have stop conditions and observable state
- hallucinated or unsupported claims are caught by tests or review prompts
- learner can explain when not to use an agent

### Module 5: Production Evaluation and Reliability

Folder: `05-module-5-production`

Goal: make AI systems testable, observable, configurable, maintainable, and honest about model-selection tradeoffs.

Layer-proof projects:

- **Production Hardening Sprint:** golden evals, CI-style commands, structured logs, latency/cost notes, and release checklist for a prior project.
- **Model Selection and Adaptation Decision:** compare deterministic code, prompt-only, RAG, tool use, and fine-tuning for one narrow requirement; fine-tuning implementation remains optional in Layer 1.

Learner outputs:

- golden dataset
- regression tests
- CI workflow
- configuration and secrets hygiene checklist
- logging and tracing
- caching or retry strategy
- deployment notes
- failure-analysis report
- model/prompt/index version notes
- model selection and adaptation decision matrix

FinAgent contribution:

- quality gates for bad tickers, missing data, stale cache, malformed tool responses, unsupported claims, rate limits, and citation failures
- reproducible local run
- maintainable project docs

Gate:

- tests cover normal, edge, and failure paths
- learner can run the same workflow from a clean checkout
- logs make failures diagnosable
- report output includes uncertainty, limitations, and "not financial advice" language
- learner can justify when not to fine-tune

### Module 6: FinAgent Stock-Market Capstone

Folder: `06-capstone-projects`

Goal: build a portfolio-ready educational stock-market analysis assistant from the pieces learned across the course.

Capstone decision: keep FinAgent as the canonical capstone because it naturally combines structured data, tools, retrieval, citations, uncertainty, evals, production gates, and domain safety. The scope is educational research and explanation, not trading or investment advice.

Required capabilities:

- validate ticker symbols and user inputs
- fetch, scrape, or load market and company context responsibly
- preserve raw, clean, and curated data boundaries for evidence
- compute basic technical indicators
- retrieve cited supporting evidence
- compare sources and flag uncertainty
- produce an explainable educational research brief
- run automated tests for bad tickers, missing data, malformed tool responses, stale cache, hallucinated citations, and rate limits
- include prompt/model/index version notes if an LLM path is used

Pedagogical milestones:

1. Read and explain the target architecture.
2. Modify a worked FinAgent slice.
3. Define capstone scope, eval cases, and portfolio evidence.
4. Compose prior FinAgent slices into a runnable deterministic workflow.
5. Add retrieval and citation checks.
6. Add bounded workflow behavior and failure recovery where justified.
7. Add production gates and documentation.
8. Present the final system with a written defense.

Final deliverables:

- source code
- tests
- fixture data or documented data sources
- architecture diagram
- capstone report
- golden eval set and repeatable eval command
- structured logs or trace samples
- failure-analysis note
- model-selection note explaining why the final design uses deterministic code, prompt calls, RAG, tools, or agents
- limitations and ethics note
- interview-style explanation of major tradeoffs

Non-goals:

- no investment advice
- no unsupported price predictions
- no hidden full-solution AI code filling
- no requirement to build a full fintech SaaS platform

## Implementation Phases

### Release 1: Canonical Planning

- This roadmap is the source of truth.
- `SPEC.md` defines authoring rules.
- `templates/` define lesson, exercise, hints, rubric, and project patterns.
- `curriculum/AI_AUTHORING_GUIDE.md`, module `AI_AUTHORING_GUIDE.md` files, and `lesson-quality-checklist.md` define the AI authoring workflow.
- `future/platform-notes.md` parks hosted platform ideas.

### Release 2: Representative Vertical Slice

- Module 0 diagnostic and conditional Week 01 remediation are clear.
- Module 1 includes one tiny FinAgent whole-game workflow.
- The stock pipeline is positioned as the post-Module-1 bridge.
- Modules 3-6 READMEs use the same Layer 1 product contract, layer-proof projects, and learner-ready expectations as Modules 0-2.
- Each later module has at least one lesson skeleton showing the expected teaching style.
- Each core module has a local `AI_AUTHORING_GUIDE.md` so future AI work follows module-specific guardrails.
- The next concrete lesson slice has an `AUTHORING_PLAN.md` filled from the quality checklist before code implementation.
- Web scraping has fixture-first workbench project.

### Release 3: Core Module Completion

- Modules 1-5 include lesson READMEs, workbench code, tests, hints, and rubrics.
- Each module has a checkpoint gate.
- FinAgent appears as small progressive slices rather than only at the end.
- Layer-proof projects exist for LLM API playground, prompt test suite, AI-ready data pipeline, RAG support desk, tool-using research assistant, workflow automation agent, and production hardening sprint.
- Model-selection and adaptation decisions are taught before any optional fine-tuning implementation.

### Release 4: Capstone and Portfolio

- Module 6 contains the full FinAgent capstone path.
- Capstone includes grading rubrics, test contracts, professional workflow guidance, and portfolio presentation prompts.
- Capstone includes golden evals, trace/log samples, failure analysis, and an educational-use safety note.
- Web scraping is connected to FinAgent data acquisition and source grounding.

## Authoring Quality Gates

Before a lesson is complete:

- the lesson has an `AUTHORING_PLAN.md` or equivalent checklist filled with concrete decisions
- the authoring plan names the chosen pedagogy mix and why it fits the topic
- the authoring plan names each major source concept as Layer 1 core, Layer 1 preview, Course 2 bridge, Course 3 advanced, specialization, or parked
- the authoring plan includes the target time budget and removes or marks optional any work that does not fit the budget
- learner-facing files visibly apply the pedagogy enforcement standard from `SPEC.md`
- the README includes an engaging problem frame, cafe-style storytelling, useful visuals, optional video/resource links, action before lecture, Socratic checkpoints, worked trace, verification interpretation, and transfer reflection
- workbench code imports cleanly
- intended tests fail before the learner completes TODOs
- tests pass against a reviewer-only intended implementation or reference behavior
- hints are progressive and do not reveal the full solution too early
- reflection prompts ask for failure modes and transfer
- the lesson has a clear FinAgent or AI engineering connection
- expected learner failures are named and isolated from scaffold/import failures
- assessment evidence includes at least one technical artifact and one explanation artifact

Before a module is complete:

- its `AI_AUTHORING_GUIDE.md` translates the global pedagogy rules into module-specific authoring constraints
- its README or authoring guide includes new concepts, intentionally deferred concepts, maximum new tools/APIs, expected time, required visuals, source references, and out-of-scope notes
- every learner-facing week or project uses the same visible lesson ritual while fitting the module's subject
- the module uses the topic-to-method routing from the evidence-informed teaching stack rather than repeating one generic lesson shape
- learner can explain the key concept without copying lesson text
- learner can modify an existing example
- learner can build a new implementation from a scaffold
- learner can verify behavior with tests
- learner can identify at least one realistic failure mode and mitigation
- reviewer can run a scaffold collection/import gate without unexpected failures

Before the curriculum is considered complete:

- every core module has a complete checkpoint
- the capstone integrates skills from Modules 0-5
- web scraping has ethical and technical gates
- platform infrastructure is not required to finish the learning path
- Modules 3-6 are not README-only placeholders; they have learner workbenches, tests, hints, and rubrics

## Future Layers and Specializations

After Layer 1 is complete, the all-phases synthesis can drive future layers:

### Course 2: Machine Learning, Deep Learning, and Neural Network Foundations

- practical datasets, train/validation/test splits, leakage, metrics, and baselines
- tensors, vectorization, gradients, losses, optimizers, and backprop intuition
- small neural networks, embeddings, attention, and transformer components with more mathematical care than Layer 1
- training loops, overfitting, regularization, experiment tracking, and model comparison
- enough depth to make later fine-tuning and production ML systems understandable

This is the recommended bridge between the junior AI engineering course and the advanced production AI engineering course. Layer 1 should preview these ideas only when they explain a practical system decision.

### Course 3: Advanced Production AI Engineer

- ML systems design
- data platform and orchestration depth
- MLOps/LLMOps registries and release workflows
- production RAG with hybrid search, reranking, feedback, and dashboards
- cost/latency optimization under realistic traffic
- governance and auditability

### Senior / Specialist Tracks

- from-scratch LLM implementation beyond toy transformers
- LoRA/QLoRA fine-tuning and model adaptation projects
- advanced RAG, GraphRAG, knowledge graphs, and context engines
- multimodal and diffusion systems
- multi-agent systems and MCP ecosystems
- production ML drift monitoring and retraining loops
- internal AI engineering platforms

Layer 1 can preview these topics through decision frameworks and optional extensions, but it should not require them for the junior path.
