# 30-Day Project Launch Route

This folder contains a compressed, hands-on route for building a
production-shaped AI engineering project in 30 full-time days. It is an overlay
on Course 1. It does not replace the complete Course 1 path.

## Purpose

In 30 full-time days, you will build by hand a local AI engineering project with
data ingestion, validation, LLM API wrappers, prompt contracts, structured
outputs, RAG, tools, bounded workflows, evals, logs, safety boundaries, and
portfolio-ready documentation.

The route favors visible engineering evidence over broad coverage. Every day
should leave behind code, tests, validation output, notes, or documentation that
another engineer can inspect.

## Relationship To Course 1

Course 1 remains the canonical full curriculum. This route borrows from its
module sequence and compresses the work around one project spine. Use this route
when you need a practical launch project quickly, then return to Course 1 for
deeper first-principles, scaffolded lessons, and capstone polish.

## Project Spine Options

Choose one project and keep it for all 30 days:

1. FinAgent educational stock analysis assistant
2. AI document support assistant
3. AI research assistant
4. AI knowledge-base chatbot
5. AI web-data monitoring assistant

Recommended default: **FinAgent educational stock analysis assistant**. It
already aligns with the curriculum spine, the safety boundary in
`FINANCE_SAFETY.md`, and the final capstone expectations.

## Weekly Milestones

| Week | Milestone | Evidence |
| --- | --- | --- |
| Week 1 | Deterministic assistant | validated input, processed records, tests, logs, documented limits |
| Week 2 | Cited Q&A system | prompt contracts, structured output, retrieval, citations, abstention, evals |
| Week 3 | Bounded AI workflow | typed tools, workflow state, retry/review rules, safety tests |
| Week 4 | Production-shaped local app | service boundary, local quality gate, observability, failure analysis, demo evidence |

## Daily Rhythm

1. Read or trace: 45-60 min
2. Implement by hand: 3-4 hrs
3. Test and debug: 1-2 hrs
4. Write explanation and commit: 30-45 min

## Required Daily Deliverables

- code or documentation artifact
- tests or validation command where relevant
- short engineering note
- one limitation or failure mode
- commit

## Files In This Route

- `daily-plan.md`: the 30-day sequence
- `project-backlog-template.md`: backlog template for your project
- `no-vibe-coding-protocol.md`: strict AI-assistant use rules
- `milestone-rubric.md`: Day 7, 14, 21, 28, and 30 quality gates
- `continuation-roadmap.md`: what to do after the launch
- `templates/`: project scope, daily log, failure analysis, demo, portfolio,
  and next-30-days templates

## Deferrals

This route explicitly defers from-scratch GPT training, deep PyTorch training
loops, LoRA/QLoRA implementation, GraphRAG, multimodal RAG, complex multi-agent
systems, Kubernetes, hosted SaaS platforms, enterprise MLOps, full frontend and
backend platforms, and production scraping at scale.
