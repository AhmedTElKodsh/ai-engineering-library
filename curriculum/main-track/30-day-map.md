# 30-Day Core Map

This is the active daily map for the main track. It borrows pacing discipline
from the archived 30-day plan, but the learner-facing route now lives here.

Use each day as a small evidence contract:

| Field | Meaning |
| --- | --- |
| Goal | the capability added today |
| Main task | the smallest useful build or review slice |
| Evidence | the artifact or command output a reviewer can inspect |
| Checkpoint | the question the learner should be able to answer |
| Do not do today | the scope guard that protects the 30-day core |

## Week 1: Deterministic Baseline

| Day | Goal | Main task | Evidence | Checkpoint | Do not do today |
| ---: | --- | --- | --- | --- | --- |
| 1 | establish Python readiness and scope | run Module 0 diagnostic and write a narrow Day 30 project scope | diagnostic notes and project scope | what Python gap or project risk is most important first? | add LLM calls, vector databases, UI, or live scraping |
| 2 | prove the local test loop | implement one small utility and its tests | first failing assertion, passing focused test, commit note | can you explain the smallest change that made the test pass? | ask AI for a finished module or broad abstraction |
| 3 | make inputs explicit | add typed models, config, and validation errors | model/config tests and rejected-input note | what input is now rejected before workflow logic? | hide validation inside prompts |
| 4 | build a deterministic pipeline | connect local input, validation, processing, and output | one runnable local command and output sample | what can the workflow do without model behavior? | call an LLM to make the output look smarter |
| 5 | preserve raw and clean data boundaries | add fixture-backed or API-first ingestion | raw/clean fixtures and failure tests | what source assumption can break the system? | scrape production sites at scale |
| 6 | create RAG-ready records | produce processed records with provenance metadata | JSONL-style records and metadata tests | can every record point back to a source? | add embeddings before records are clean |
| 7 | defend Milestone 1 | tighten tests, logs, README, and known limits | Day 7 milestone note | can another engineer run the deterministic slice and understand its limits? | turn the milestone into an untested demo |

## Week 2: Grounded LLM Behavior

| Day | Goal | Main task | Evidence | Checkpoint | Do not do today |
| ---: | --- | --- | --- | --- | --- |
| 8 | isolate model calls | build provider wrapper, mock mode, timeout/retry, and token/cost log fields | mock provider tests and boundary note | can the project run without a paid API key? | scatter direct provider calls |
| 9 | treat prompts as contracts | add prompt template, output schema, parser, and invalid-output tests | prompt regression tests | what fields must model output prove before acceptance? | rely on "the model usually follows instructions" |
| 10 | understand retrieval mechanics | implement simple embedding or deterministic vector fixture plus similarity ranking | ranking tests and trace note | what does similarity find and miss? | add a vector database before the contract is clear |
| 11 | keep citations attached | chunk records with source metadata and propagation checks | chunk tests and citation-risk note | can every chunk point back to a source record? | optimize retrieval before citations are possible |
| 12 | answer only from evidence | build query, retrieve, cited-answer, and abstention path | happy-path, unsupported-question, and citation-mismatch tests | when must the system abstain? | let the model invent sources |
| 13 | make quality inspectable | add golden questions, eval runner, and failure taxonomy | eval output and weakest-result note | can you distinguish retrieval, citation, refusal, and formatting failures? | report subjective quality without examples |
| 14 | defend Milestone 2 | clean up cited RAG, eval notes, and failure examples | Day 14 milestone note | can the system answer supported questions and abstain on unsupported ones? | add tools or agents before RAG is measurable |

## Week 3: Bounded Workflows

| Day | Goal | Main task | Evidence | Checkpoint | Do not do today |
| ---: | --- | --- | --- | --- | --- |
| 15 | expose deterministic tools safely | define one or two typed tools with input/output schemas | tool schema tests | what authority does each tool have? | give tools broad filesystem, network, or hidden authority |
| 16 | route tool calls explicitly | build allowlisted router, error mapping, and trace events | router tests and denied-call note | what prevents unvalidated model text from executing? | implement open-ended autonomous tool use |
| 17 | make workflow state observable | create plan, retrieve, optional tool, draft, verify, final steps | state-transition tests and sample trace | what happened at each step? | use a framework to hide the workflow |
| 18 | add objective review | implement verifier, retry counter, and human escalation rule | max-retry and escalation tests | what can be retried, and what must stop? | let the model critique itself without objective checks |
| 19 | connect source data to workflow | add ingestion-to-workflow adapter and freshness warning | stale-source tests and workflow trace | how does the final output reveal source freshness? | hide stale or uncertain data behind confident language |
| 20 | document safety boundaries | write refusal, injection, and domain-limit cases | safety note and tests/evals | what request should the system refuse? | claim safety without examples |
| 21 | defend Milestone 3 | tighten workflow trace, stop conditions, docs, and tests | Day 21 milestone note | can the workflow use tools, retrieve evidence, stop safely, and explain failures? | add multi-agent behavior or memory without justification |

## Week 4: Production-Shaped Local App

| Day | Goal | Main task | Evidence | Checkpoint | Do not do today |
| ---: | --- | --- | --- | --- | --- |
| 22 | expose one runnable boundary | add CLI, API endpoint, demo app, or clean local script | smoke test or command test | can another engineer run it from the docs? | build a full frontend/backend platform |
| 23 | make outputs reproducible enough | document prompt, model, index, data, and cache versions | versioning note and cache/version test | what change invalidates an output? | add complex artifact registries |
| 24 | make failures diagnosable | add structured trace fields, cost, latency, and sample trace | observability note and log-field check | what failure can the trace now diagnose? | install a large monitoring stack |
| 25 | create local quality gate | add one repeatable check command for tests/evals/imports | command output and skipped-check note | what gives the project a clear pass/fail signal? | add hosted CI before the local gate is stable |
| 26 | document known failures | write failure analysis for data, retrieval, citation, rate-limit, and timeout cases | failure analysis and mapped tests/evals | what is the highest-risk remaining failure? | hide unresolved failures from the portfolio |
| 27 | rehearse the demo | write demo script with happy path, edge case, and refusal/abstention | demo script and rehearsal note | does the demo prove boundaries, not just best case? | demo only the best case |
| 28 | defend Milestone 4 | close docs gaps and rerun the quality gate | Day 28 milestone note | is the app runnable, observable, tested, evaluated, and documented locally? | add major new functionality |
| 29 | package the portfolio | polish README, architecture explanation, evidence table, and portfolio note | portfolio package and exact setup/demo command output | can a reviewer understand the problem, architecture, evidence, and limits? | inflate claims beyond local evidence |
| 30 | defend and choose next path | write final defense, next backlog, and top improvements | Day 30 defense and next 30 days note | what did the project prove, and what comes next? | pretend 30 days replaced all future learning |

