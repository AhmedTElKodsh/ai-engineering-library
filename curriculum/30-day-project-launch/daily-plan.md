# 30-Day Project Launch Daily Plan

Timing: skim the full plan once in 30-45 minutes before Day 1. During the
route, read only the current day in 5 minutes before starting work.

Calendar: this plan starts Sunday, 2026-06-14, and finishes Monday,
2026-07-13. Keep the dates fixed. If a day slips, cut stretch scope and protect
the next milestone rather than expanding the whole route.

Expected pace: 5-7 focused hours per day. Each day ends with a short engineering
log and a commit.

Teaching method: use `teaching-method.md` as the route-level version of the
main curriculum's lesson contract. Each day should preserve action before
lecture, evidence before claims, minimum path before enrichment, and reflection
before moving on.

## Daily Learner Logic

Before starting the day's build, answer the same five questions used by the
main curriculum:

| Question | Answer for today's project slice |
| --- | --- |
| What can I do now? |  |
| What new capability am I adding? |  |
| What failure does this help me catch? |  |
| How does this improve FinAgent or a practical AI system? |  |
| What should I be able to explain afterward? |  |

## Default Task Time Boxes

Use this for every day unless the day guide gives a narrower estimate:

| Task type | Target time | Typical output |
| --- | ---: | --- |
| Daily setup and board update | 15 min | one minimum artifact selected |
| Read/trace source material | 45-60 min | first expected failure or trace note |
| Small design note | 10-20 min | inputs, outputs, boundary, stop rule |
| One function or task slice | 20-45 min | one behavior, test, prompt, schema, or doc section |
| Build block | 90-120 min | 2-4 completed slices |
| Test/debug block | 60-120 min | failing command understood or fixed |
| Evidence/log/commit | 30-45 min | command, result, limitation, next step |

Productivity rule: keep one implementation slice in progress. When a slice
exceeds 45 minutes, reduce it to the next observable behavior and log the rest
as backlog.

## Evidence Portfolio Rhythm

Each day should leave four evidence types:

- technical evidence: code, tests, fixtures, evals, traces, commands, or docs
- failure evidence: first failure, rejected input, refusal, abstention, or known
  limitation
- explanation evidence: 2-4 teammate-facing sentences about the tradeoff
- transfer evidence: how the pattern strengthens FinAgent or another practical
  AI system

## Week 1 - Engineering Loop, Python, Data, And Deterministic Project Spine

Goal: Build without LLM magic first.

Detailed guide: `week-01.md`, with daily guides in `week-01/`

### Day 1 - Setup, Diagnostic, And Project Scope

Deliverable: `PROJECT_SCOPE.md`

- Objective: choose one project spine and define the smallest useful Day 30 outcome.
- Read or trace: `START_HERE.md`, `LEARNER_READY_MATRIX.md`, Module 0 diagnostic, and this route's `templates/PROJECT_SCOPE.md`.
- Build: project folder, virtual environment, initial README, and filled project scope.
- Test or verify: run `python -m pytest curriculum/main-track/00-python-foundations/week-00-diagnostic -q`.
- Engineering log: diagnostic result, project choice, non-goals, and first risk.
- Done criteria: scope names input, output, deterministic v0, safety boundary, and Day 7/14/21/28/30 evidence.
- Do not do today: add an LLM call, vector database, UI, or live scraping.

### Day 2 - Pytest, Workbench Discipline, And Git Habit

Deliverable: one small utility, tests, commit explanation

- Objective: prove the local test loop works before the project grows.
- Read or trace: Module 0 workbench ritual and `HOW_TO_USE_AI_ASSISTANTS.md`.
- Build: one utility such as ticker normalization, document ID normalization, or date parsing.
- Test or verify: write unit tests for normal, empty, malformed, and boundary input.
- Engineering log: first failing assertion, smallest change, final command, and AI use if any.
- Done criteria: utility is tested, committed, and explained in plain English.
- Do not do today: create broad abstractions or ask AI for a finished module.

### Day 3 - Data Models, Validation, And Configuration

Deliverable: config, models, tests

- Objective: make project inputs explicit and reject bad input early.
- Read or trace: Module 0 configuration patterns and Module 1 FinAgent boundary notes.
- Build: typed data models, config loading, and validation errors.
- Test or verify: config tests, valid model tests, and bad-input tests.
- Engineering log: what the model accepts, what it rejects, and why.
- Done criteria: no core workflow accepts unvalidated raw input.
- Do not do today: connect to a live provider or hide validation inside prompts.

### Day 4 - Deterministic Pipeline v0

Deliverable: local input -> validate -> process -> output workflow

- Objective: create a useful non-LLM workflow that can be trusted and tested.
- Read or trace: Module 1 whole-game FinAgent flow.
- Build: a deterministic pipeline from local fixture input to a local output file or report.
- Test or verify: run unit tests plus one end-to-end local command.
- Engineering log: workflow steps, observed output, and first limitation.
- Done criteria: one command runs the deterministic slice with validated input and clear output.
- Do not do today: call an LLM to make the output look smarter.

### Day 5 - HTTP/API-First Data Acquisition

Deliverable: raw/clean data boundaries and ingestion tests

- Objective: collect or simulate external data while keeping raw and clean layers separate.
- Read or trace: web-data bridge Core Labs 1-4.
- Build: fixture-backed or API-first ingestion with raw storage and clean parsing.
- Test or verify: tests for timeout, malformed response, missing field, and duplicate record where relevant.
- Engineering log: source choice, access assumption, and failure handling.
- Done criteria: raw input is preserved and cleaned output is validated.
- Do not do today: scrape production sites at scale or ignore source terms.

### Day 6 - Cleaning, Provenance, And RAG-Ready Records

Deliverable: processed JSONL-style records with metadata

- Objective: convert collected data into records that retrieval can cite later.
- Read or trace: web-data bridge Core Labs 5-6 and Module 4 AI-ready data notes.
- Build: processed records with source URL or file, timestamp, title/heading, text, and provenance metadata.
- Test or verify: tests for missing metadata, empty text, duplicate IDs, and stale source markers.
- Engineering log: record schema, rejected records, and metadata tradeoff.
- Done criteria: project can produce RAG-ready records without using a model.
- Do not do today: add embeddings before records are clean.

### Day 7 - Milestone 1: Deterministic Assistant

Deliverable: deterministic project slice with tests, logs, validated input, and documented limits

- Objective: defend a reliable non-LLM baseline.
- Read or trace: `milestone-rubric.md` Day 7 section and Module 1 gate.
- Build: cleanup only; tighten tests, logs, README, and known limits.
- Test or verify: run the smallest full local check command and record output.
- Engineering log: milestone evidence, unresolved risk, and next week's first question.
- Done criteria: another engineer can run the deterministic slice and understand its limits.
- Do not do today: celebrate a demo that lacks tests or validated input.

## Week 2 - LLM APIs, Prompts, Embeddings, And RAG

Goal: Add LLM behavior behind testable boundaries.

Detailed guide: `week-02.md`, with daily guides in `week-02/`

### Day 8 - LLM API Wrapper

Deliverable: provider wrapper with retries, timeouts, mock mode, and token-cost logging

- Objective: isolate model calls behind a replaceable interface.
- Read or trace: Module 3 provider wrapper and safe configuration guidance.
- Build: wrapper interface, mock provider, timeout/retry behavior, and cost/token log fields.
- Test or verify: mock tests for success, timeout, provider error, and no-key behavior.
- Engineering log: provider boundary and what remains mock-only.
- Done criteria: project can run without a paid API key.
- Do not do today: scatter direct provider calls across the codebase.

### Day 9 - Prompt Templates And Structured Output

Deliverable: prompt templates, schema validation, prompt regression tests

- Objective: treat prompts as contracts, not chat snippets.
- Read or trace: Module 3 PromptOps and structured output sections.
- Build: prompt template files, output schema, parser, and validation errors.
- Test or verify: prompt rendering tests and invalid JSON or missing-field tests.
- Engineering log: prompt version, expected fields, and one injection concern.
- Done criteria: model output is accepted only after schema validation.
- Do not do today: rely on "the model usually follows instructions."

### Day 10 - Embeddings And Similarity

Deliverable: cosine similarity or simple retrieval implementation

- Objective: understand retrieval mechanics before adding a database.
- Read or trace: Module 2 embeddings and similarity labs.
- Build: simple embedding adapter or deterministic vector fixture plus cosine similarity ranking.
- Test or verify: tests for ranking, empty corpus, ties, and irrelevant query behavior.
- Engineering log: what similarity finds well and what it misses.
- Done criteria: retrieval can rank a tiny local corpus reproducibly.
- Do not do today: add a vector database before the retrieval contract is clear.

### Day 11 - Chunking And Metadata

Deliverable: chunked documents with source metadata and bad-record tests

- Objective: split records without losing citation context.
- Read or trace: Module 4 chunking, metadata, and AI-ready data notes.
- Build: chunker, chunk IDs, source references, and metadata propagation.
- Test or verify: chunk overlap, empty document, missing source, and duplicate chunk tests.
- Engineering log: chunk size decision and citation risk.
- Done criteria: every retrievable chunk points back to its source record.
- Do not do today: optimize retrieval before citations are possible.

### Day 12 - Simple RAG With Citations

Deliverable: query -> retrieve -> answer with citations and abstention

- Objective: answer only from retrieved evidence.
- Read or trace: Module 4 cited RAG and abstention sections.
- Build: query pipeline, retrieved-context prompt, cited answer schema, and abstention path.
- Test or verify: golden happy path, unsupported question, and citation-mismatch tests.
- Engineering log: answer rule, abstention rule, and failure example.
- Done criteria: unsupported answers are refused or marked insufficient.
- Do not do today: let the model invent sources or citations.

### Day 13 - RAG Evaluation

Deliverable: golden questions, eval runner, failure taxonomy

- Objective: make answer quality inspectable.
- Read or trace: Module 5 golden eval concepts and Module 4 retrieval logs.
- Build: small eval set, scoring script, failure categories, and sample run output.
- Test or verify: run evals against mock or fixture-backed answers.
- Engineering log: weakest eval result and likely cause.
- Done criteria: eval output distinguishes retrieval, citation, refusal, and formatting failures.
- Do not do today: report subjective quality without examples.

### Day 14 - Milestone 2: Cited Q&A System

Deliverable: RAG assistant with citations, abstention, evals, and failure notes

- Objective: defend grounded LLM behavior.
- Read or trace: `milestone-rubric.md` Day 14 section.
- Build: cleanup only; improve docs, eval notes, and failure examples.
- Test or verify: run unit tests plus eval command and save the result in the log.
- Engineering log: milestone evidence and top retrieval limitation.
- Done criteria: project can answer supported questions with citations and abstain on unsupported ones.
- Do not do today: add tools or agents before RAG behavior is measurable.

## Week 3 - Tools, Workflows, And Bounded Agents

Goal: Build controlled agentic behavior without over-autonomy.

Detailed guide: `week-03.md`

### Day 15 - Typed Tools

Deliverable: one or two deterministic tools with input/output schemas

- Objective: expose deterministic capabilities through strict contracts.
- Read or trace: Module 3 typed tool schema and tool boundary material.
- Build: tool input schema, output schema, and one or two useful tools.
- Test or verify: valid input, malformed input, tool failure, and output validation tests.
- Engineering log: tool permission boundary and failure mode.
- Done criteria: tools are callable without model involvement and fail predictably.
- Do not do today: give tools broad filesystem, network, or hidden authority.

### Day 16 - Tool Calling Boundary

Deliverable: bounded tool router with validation and failure handling

- Objective: route tool calls through explicit validation and allowlists.
- Read or trace: Module 3 tool routing and security boundary notes.
- Build: router, allowlist, error mapping, and trace event for each call.
- Test or verify: unknown tool, bad args, tool exception, and successful call tests.
- Engineering log: what the router allows and denies.
- Done criteria: no unvalidated model text reaches tool execution.
- Do not do today: implement open-ended autonomous tool use.

### Day 17 - Explicit Workflow

Deliverable: planner/retrieve/tool/draft/verify workflow with observable state

- Objective: make the workflow steps visible and debuggable.
- Read or trace: Module 4 explicit workflow patterns.
- Build: workflow state object and steps for plan, retrieve, optional tool, draft, verify, and final output.
- Test or verify: step-order tests, state-transition tests, and failed-step behavior.
- Engineering log: workflow state fields and stop condition.
- Done criteria: a trace shows what happened at each step.
- Do not do today: use an agent framework to hide the workflow.

### Day 18 - Critic, Retry, And Human-Review Loop

Deliverable: verifier step, bounded retry, human escalation rule

- Objective: catch weak or unsupported outputs before final response.
- Read or trace: Module 4 critique, retry, and human-review material.
- Build: verifier, retry counter, escalation state, and human-review message.
- Test or verify: unsupported answer, citation mismatch, max retry, and escalation tests.
- Engineering log: what can be retried and what must stop.
- Done criteria: weak outputs do not loop forever or silently pass.
- Do not do today: let the model critique itself without objective checks.

### Day 19 - Integrate Web/API Data Into Workflow

Deliverable: workflow uses real or fixture-backed collected data with stale-data warning

- Objective: connect collected data to the AI workflow while preserving source quality.
- Read or trace: web-data bridge provenance and Module 4 source-grounding notes.
- Build: ingestion-to-workflow adapter and stale-data warning.
- Test or verify: stale source, missing source, and fixture-backed workflow tests.
- Engineering log: source freshness rule and any legal/ethical assumption.
- Done criteria: final output can show source freshness or warn when data is stale.
- Do not do today: hide stale or uncertain data behind confident language.

### Day 20 - Safety, Prompt Injection, And Refusal Boundaries

Deliverable: `SAFETY_BOUNDARIES.md`

- Objective: define and test what the system must refuse or constrain.
- Read or trace: Module 3 injection tests, Module 4 safety notes, and `FINANCE_SAFETY.md` if using FinAgent.
- Build: safety boundary doc, injection examples, refusal cases, and domain-limit checks.
- Test or verify: prompt injection, unsafe request, unsupported claim, and source-conflict tests.
- Engineering log: strongest safety boundary and known gap.
- Done criteria: safety behavior is documented and covered by tests or eval cases.
- Do not do today: claim safety without examples.

### Day 21 - Milestone 3: Bounded AI Workflow

Deliverable: tool-using workflow with state, trace logs, stop conditions, source grounding, and safety tests

- Objective: defend controlled agentic behavior.
- Read or trace: `milestone-rubric.md` Day 21 section.
- Build: cleanup only; tighten workflow trace, docs, and tests.
- Test or verify: run workflow tests and one end-to-end trace.
- Engineering log: milestone evidence and the boundary that prevents over-autonomy.
- Done criteria: workflow can use tools, retrieve evidence, stop safely, and explain failures.
- Do not do today: add multi-agent behavior or memory unless it is already justified and bounded.

## Week 4 - Production Hardening And Project Readiness

Goal: Make the project maintainable, observable, and presentable.

Detailed guide: `week-04.md`

### Day 22 - Service Boundary

Deliverable: CLI, FastAPI endpoint, Streamlit/Gradio demo, or clean local script

- Objective: expose the workflow through one simple runnable boundary.
- Read or trace: Module 5 service boundary and Module 6 capstone run guidance.
- Build: one entry point with documented inputs and outputs.
- Test or verify: smoke test or command test for the service boundary.
- Engineering log: chosen boundary and why broader platform work is deferred.
- Done criteria: another engineer can run the project from the documented command.
- Do not do today: build a full frontend/backend platform.

### Day 23 - Caching And Versioning

Deliverable: `VERSIONING.md` with prompt/model/index/data version notes

- Objective: make repeated runs reproducible enough to debug.
- Read or trace: Module 5 versioning, caching, and model-selection notes.
- Build: version note for prompts, model/provider, index, data snapshot, and cache policy.
- Test or verify: cache hit/miss or version-record test where relevant.
- Engineering log: what changes invalidate outputs.
- Done criteria: output can be traced to data, prompt, index, and model assumptions.
- Do not do today: add complex artifact registries.

### Day 24 - Logs, Traces, Cost, And Latency

Deliverable: `OBSERVABILITY.md` and sample trace

- Objective: make failures diagnosable from logs and traces.
- Read or trace: Module 5 logging, cost, latency, and observability material.
- Build: structured trace fields, sample trace, and cost/latency note.
- Test or verify: log fields exist for key workflow steps.
- Engineering log: one failure that the trace can now diagnose.
- Done criteria: sample trace shows request, retrieval, tool use, model call, verification, and final status where relevant.
- Do not do today: install a large monitoring stack.

### Day 25 - CI-Style Local Quality Gate

Deliverable: one check command such as `make check` or `python scripts/check_project.py`

- Objective: create a repeatable local gate before demos or commits.
- Read or trace: Module 5 CI-style quality gate notes.
- Build: check command that runs tests, lightweight evals, and basic lint or import checks if available.
- Test or verify: run the command from a clean shell.
- Engineering log: command output and any skipped checks.
- Done criteria: one command gives a clear pass/fail signal for the project.
- Do not do today: add hosted CI before the local gate is stable.

### Day 26 - Failure Handling Sprint

Deliverable: `FAILURE_ANALYSIS.md`

- Objective: document and test the ways the project can fail.
- Read or trace: Module 5 failure analysis and this route's `templates/FAILURE_ANALYSIS.md`.
- Build: failure analysis for missing data, malformed API responses, bad input, weak retrieval, citation mismatch, rate limits, and timeouts.
- Test or verify: run or list tests/evals for each failure case.
- Engineering log: highest-risk remaining failure.
- Done criteria: known failures have expected behavior, coverage, mitigation, and remaining risk.
- Do not do today: hide unresolved failures from the portfolio.

### Day 27 - Demo Workflow

Deliverable: `DEMO_SCRIPT.md` with happy path, edge case, and refusal/abstention case

- Objective: prepare a repeatable demo that proves behavior and boundaries.
- Read or trace: Module 6 demo and portfolio guidance.
- Build: demo script, sample inputs, expected outputs, and what to say while presenting.
- Test or verify: rehearse the demo and record command output or screenshots if useful.
- Engineering log: demo risk and fallback.
- Done criteria: demo covers happy path, edge case, and refusal or abstention.
- Do not do today: demo only the best case.

### Day 28 - Milestone 4: Production-Shaped Local App

Deliverable: local app with tests, evals, logs, service boundary, failure handling, and documentation

- Objective: defend local production readiness.
- Read or trace: `milestone-rubric.md` Day 28 section.
- Build: cleanup only; close documentation gaps and rerun gates.
- Test or verify: run the local quality gate and one demo path.
- Engineering log: milestone evidence and remaining production gap.
- Done criteria: project is runnable, observable, tested, evaluated, and documented locally.
- Do not do today: add major new functionality.

### Day 29 - Portfolio Packaging

Deliverable: README, architecture explanation, diagram guidance, screenshots or trace samples, portfolio note

- Objective: turn the project into a readable professional artifact.
- Read or trace: Module 6 capstone portfolio guidance and `templates/PORTFOLIO_NOTE.md`.
- Build: portfolio note, architecture explanation, evidence table, and README polish.
- Test or verify: run documented setup and demo commands exactly as written.
- Engineering log: what the portfolio proves and what it does not prove.
- Done criteria: a reviewer can understand the problem, architecture, evidence, and limits without a live walkthrough.
- Do not do today: inflate claims or say the system is production-ready beyond local evidence.

### Day 30 - Final Defense And Next Backlog

Deliverable: `NEXT_30_DAYS.md`

- Objective: defend the project and choose the next learning path.
- Read or trace: `milestone-rubric.md` Day 30 section and `continuation-roadmap.md`.
- Build: final defense note, next backlog, and top 5 improvements.
- Test or verify: run the quality gate, eval command, and demo command one final time.
- Engineering log: final result, limitations, and next specialization choice.
- Done criteria: project has a clear portfolio story, evidence, limitations, and continuation plan.
- Do not do today: pretend 30 days replaced the complete curriculum.
