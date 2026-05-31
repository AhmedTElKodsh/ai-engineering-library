# Module 6: Capstone Projects

## Portfolio-Ready AI Engineering Synthesis

**Duration:** 2 weeks minimum, longer if used as a formal portfolio sprint  
**Prerequisites:** Module 5 or equivalent ability to build, test, evaluate, and explain an AI workflow  
**Pedagogy:** build, evaluate, harden, explain

## Canonical Capstone

**FinAgent: Educational Stock-Market Analysis Assistant**

FinAgent helps users understand public market information, compare evidence, summarize market context, and explain uncertainty. It does not recommend trades, predict prices as advice, or present itself as a financial advisor.

This capstone is a strong Layer 1 portfolio project because it naturally integrates:

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

## Recommended Project Architecture

Layer 1 should not depend on one enormous project from day one. The curriculum uses a spine-and-ribs model:

- **Spine:** FinAgent appears in small slices across the modules.
- **Ribs:** smaller layer-proof projects show transfer in RAG, tools, workflows, and production.
- **Final:** FinAgent capstone synthesizes the layers into one portfolio artifact.

Optional alternate capstones can reuse the same gates:

- Research Assistant for papers or internal documents
- Web Data Monitoring Agent for public data sources

These are variants, not replacements for the canonical FinAgent path.

## Minimum Job-Ready Portfolio Path

The all-phases synthesis proposes many possible projects. For Layer 1, the minimum coherent portfolio should be smaller and stronger:

1. FinAgent whole-game slice from Module 1.
2. LLM API Playground or Prompt Engineering Test Suite from Module 3.
3. AI-Ready Data Pipeline plus RAG Support Desk from Module 4.
4. Production Hardening Sprint from Module 5.
5. FinAgent capstone with evals, traces, and failure analysis.

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

### Week 1: Build and Integrate

- Day 1: Choose scope, write the architecture note, create kickoff eval cases, and start the portfolio evidence ledger.
- Day 2: Connect data/tool contracts and fixtures.
- Day 3: Add retrieval, citations, or source comparison.
- Day 4: Add workflow orchestration and failure handling.
- Day 5: Run tests, collect eval results, and cut scope if needed.

## Learner-Ready Kickoff

| Week | Folder | Learner deliverable | Verification |
| --- | --- | --- | --- |
| Week 1 | `week-01-build` | FinAgent capstone scope, deterministic eval cases, and portfolio evidence ledger | `python -m pytest curriculum/06-capstone-projects/week-01-build/tests -v` |
| Week 2 | `week-02-polish` | Demo, limitation note, release evidence, and interview defense | `python -m pytest curriculum/06-capstone-projects/week-02-polish/tests -v` |

### Week 2: Harden and Present

- Day 1: Add or refine the golden eval set.
- Day 2: Add structured logs and release checks.
- Day 3: Document cost, latency, safety, and limitations.
- Day 4: Prepare demo and portfolio README.
- Day 5: Present the system and defend tradeoffs.

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
- no full fintech SaaS requirement for Layer 1
