# Module 6: Capstone Projects

## How To Use This File

Read this file first. It defines the lesson objective, the minimum path, the expected evidence, and the verification command. Treat the local tests as the exact contract when implementation details feel unclear.

## Portfolio-Ready AI Engineering Synthesis

**Full capstone library:** 12-18 hours across 3 scaffold phases
**Milestone 1 allocation:** 4-5 hours for integration, transfer, and defense because the cumulative product starts at the beginning of the route
**Prerequisites:** Module 5 or equivalent ability to build, test, evaluate, and explain an AI workflow  
**Pedagogy:** build, evaluate, harden, explain

Timeline rule: keep each scaffold week focused on one portfolio artifact,
verification command, and limitation note before adding polish.

## Canonical Capstone

**FinAgent: Educational Stock-Market Analysis Assistant**

FinAgent helps users understand public market information, compare evidence, summarize market context, and explain uncertainty. It does not recommend trades, predict prices as advice, or present itself as a financial advisor.

The shared safety checklist is `../../../FINANCE_SAFETY.md`.

Use `CAPSTONE_PORTFOLIO_EVIDENCE_CHECKLIST.md` before revising capstone
lessons that touch portfolio evidence, demo scripts, release readiness,
limitation notes, or interview defense.

Use `PORTFOLIO_README_TEMPLATE.md` when packaging the final learner-facing
capstone README. Use `FINAL_ASSESSMENT_CHECKLIST.md` for the reviewer or
self-assessment gate before presenting the capstone.

This capstone is a strong Milestone 1 portfolio project because it naturally integrates:

- structured data loading and validation
- AI-ready data boundaries: raw, clean, curated, and failed records
- LLM API and PromptOps contracts when model calls are used
- tool contracts and external data boundaries
- retrieval and citation checks
- controlled agentic workflow patterns
- eval-driven development
- safety language and refusal behavior
- cost, latency, logging, and release notes
- model-selection reasoning

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 6's current
learner-ready path is capstone kickoff, deterministic local integration, and
polish evidence: scoped behavior, eval cases, fixture data, source-grounded
brief generation, refusal/limitation language, release evidence, and interview
defense. Live providers, hosted services, and richer finance integrations remain
advanced extensions.

The advanced doorway is specialization. A learner may later deepen the same
system with richer finance data, GraphRAG, fine-tuning, multimodal inputs, or
advanced agent workflows, but none of those are required to prove Milestone 1
completion.

## Recommended Project Architecture

Milestone 1 uses one small cumulative spine:

- **Spine:** FinAgent appears in small slices across the route.
- **Practice branches:** RAG, tool, workflow, and production assets deepen the
  same application instead of becoming separate required projects.
- **Final:** the integration and defense phase verifies the accumulated work.

Optional alternate capstones can reuse the same gates:

- Research Assistant for papers or internal documents
- Web Data Monitoring Agent for public data sources

These are variants, not replacements for the canonical FinAgent path.

## Minimum Implementer Portfolio Path

The full library proposes many possible projects. Milestone 1 keeps one
portfolio artifact and reuses earlier evidence:

1. FinAgent deterministic baseline.
2. The same FinAgent with model, evaluation, and grounded retrieval boundaries.
3. The same FinAgent with one tool, bounded workflow, service boundary, and
   operational evidence.
4. Final transfer task, eval run, failure analysis, limitations, and defense.

This shows APIs, prompting, data pipelines, RAG, tools/workflows, evaluation, deployment discipline, and production thinking without forcing a 17-project portfolio.

## Capstone Requirements

### Product Behavior

- validate ticker symbols and user inputs
- load or fetch market/context data responsibly
- compute basic indicators or comparisons
- retrieve cited supporting evidence where applicable
- generate an educational research brief
- label uncertainty and limitations clearly
- refuse unsupported investment advice

### Engineering Behavior

- use typed contracts for tools and data
- include deterministic fixtures for tests
- include a golden eval set with edge cases
- log key workflow steps and failures
- expose a reproducible local run command
- document cost, latency, and data freshness limits
- document why the design uses deterministic code, prompting, RAG, tools, agents, or avoids fine-tuning

### Portfolio Behavior

- include a concise README
- include an architecture diagram
- include a demo script or walkthrough
- include a failure-analysis note
- include a limitations and ethics note
- include an interview-style explanation of major tradeoffs

## Timeline

Folder names preserve earlier scaffold history. For Milestone 1,
`week-03-integration-build` is opened during Block 1 and updated throughout the
route. The timeline below describes the capstone library in isolation; it does
not add three more required weeks to the 30-45-hour route.

### Week 1: Scope, Evaluate, And Plan The Build

- Day 1: Choose scope, write the architecture note, create kickoff eval cases, and start the portfolio evidence ledger.
- Day 2: Identify which prior data/tool contracts and fixtures the capstone will reuse.
- Day 3: Define retrieval, citation, or source-comparison behavior to integrate.
- Day 4: Define workflow and failure-handling behavior to integrate.
- Day 5: Run the kickoff tests, collect eval-plan evidence, and cut scope if needed.

### Week 2: Integrate The Runnable Local Workflow

- Day 1: Load fixture market data and evidence chunks.
- Day 2: Add request validation and advice refusal.
- Day 3: Add deterministic evidence retrieval and cited brief composition.
- Day 4: Add workflow trace evidence for success and refusal paths.
- Day 5: Run integration tests and write the integration tradeoff note.

### Week 3: Harden And Present

- Day 1: Add or refine the golden eval set.
- Day 2: Add structured logs and release checks.
- Day 3: Document cost, latency, safety, and limitations.
- Day 4: Prepare demo and portfolio README.
- Day 5: Present the system and defend tradeoffs.

## Learner-Ready Scaffolds

| Milestone 1 role | Legacy folder | Learner deliverable | Verification |
| --- | --- | --- | --- |
| Required working spine from Block 1 | `week-03-integration-build` | One cumulative FinAgent application with focused checkpoint tests for model, eval, retrieval, tool/workflow, HTTP, operations, and defense | Use the checkpoint command in the local README |
| Optional planning aid | `week-01-build` | Additional scope and portfolio-planning practice when the learner needs it | `python -m pytest curriculum/main-track/06-capstone-projects/week-01-build/tests -v` |
| Selected final evidence | `week-02-polish` | Demo, limitation note, and interview defense; reuse Block 8 release evidence | `python -m pytest curriculum/main-track/06-capstone-projects/week-02-polish/tests -k "demo_script or limitation_note or interview_defense" -v` |

The cumulative spine should collect cleanly and fail only on visible TODO
contracts. Learners run one checkpoint filter at a time; the complete suite is
the Block 9 regression gate.

## Assessment Split

| Area | Weight | Evidence |
| --- | ---: | --- |
| Working implementation | 25% | runnable app or workflow with core behavior complete |
| Eval harness and golden dataset | 25% | repeatable command, edge cases, failure categories |
| Testing and CI-style gates | 20% | unit tests, smoke checks, regression command |
| Observability and operations | 15% | logs, traces, cost/latency notes, release checklist |
| Failure analysis and explanation | 15% | written tradeoff defense and known limitations |

## Success Criteria

The capstone is complete when a reviewer can:

- run the system from a clean checkout
- inspect tests and evals without guessing the intended behavior
- see how bad inputs and unsupported claims are handled
- trace where data came from
- understand what the system does not know
- read the README and believe the learner can discuss the architecture in an interview

## Non-Goals

- no trading bot
- no investment recommendations
- no unsupported price predictions
- no hidden full-solution AI code filling
- no full fintech SaaS requirement for Milestone 1
