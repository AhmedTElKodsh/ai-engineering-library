# 30-Day Project Backlog Template

Timing: fill the first version in 45-60 minutes before Day 2. Update it in
5-10 minutes at the start or end of each day.

Copy this into your project repository and fill it in before Day 2.

## Project Goal

What useful local AI engineering project will exist by Day 30?

## User Problem

Who has the problem, what are they trying to do, and what makes the current
workflow unreliable, slow, or hard to explain?

## Core Workflow

```text
input -> validate -> collect/load data -> clean/process -> retrieve or tool-call -> draft -> verify -> output
```

## Data Sources

| Source | Use | Access method | Freshness | Risk |
| --- | --- | --- | --- | --- |
|  |  | fixture/API/manual export |  |  |

## Risks And Assumptions

- Assumption:
- Technical risk:
- Data risk:
- Safety or domain risk:
- Schedule risk:

## Week 1 Backlog

- [ ] Define project scope and non-goals.
- [ ] Add pytest and one small tested utility.
- [ ] Add config and data models.
- [ ] Build deterministic input -> output workflow.
- [ ] Add ingestion and raw/clean boundaries.
- [ ] Produce RAG-ready records with metadata.
- [ ] Write Day 7 milestone note.

## Week 2 Backlog

- [ ] Add mockable LLM API wrapper.
- [ ] Add prompt templates and structured output schema.
- [ ] Implement embeddings or simple similarity retrieval.
- [ ] Add chunking and metadata checks.
- [ ] Build cited RAG with abstention.
- [ ] Add golden questions and eval runner.
- [ ] Write Day 14 milestone note.

## Week 3 Backlog

- [ ] Add one or two typed deterministic tools.
- [ ] Add tool router with validation.
- [ ] Add explicit workflow state.
- [ ] Add verifier, bounded retry, and human-review rule.
- [ ] Integrate real or fixture-backed collected data.
- [ ] Add safety and prompt-injection tests.
- [ ] Write Day 21 milestone note.

## Week 4 Backlog

- [ ] Add CLI, local script, FastAPI endpoint, Streamlit demo, or Gradio demo.
- [ ] Add versioning notes for prompts, data, index, and model.
- [ ] Add logs, traces, cost, and latency notes.
- [ ] Add a local quality gate command.
- [ ] Write failure analysis.
- [ ] Write demo script.
- [ ] Package portfolio docs and Day 30 defense.

## Stretch Ideas

- Improve retrieval scoring.
- Add a small feedback loop.
- Add optional live provider mode behind a mock-first interface.
- Add lightweight UI only after the core workflow is reliable.

## Deferred Ideas

- From-scratch GPT training
- Deep PyTorch training loops
- LoRA/QLoRA implementation
- GraphRAG
- Multimodal RAG
- Complex multi-agent systems
- Kubernetes
- Hosted SaaS platform
- Enterprise MLOps
- Full frontend/backend platform
- Production scraping at scale

## Do Not Build Yet

List tempting work that would distract from the 30-day evidence goal.

- [ ] 
