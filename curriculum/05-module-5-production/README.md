# Module 5: Production AI Engineering

## Verification, Operations, and Model Decisions

**Duration:** 7 weeks  
**Expected time to finish:** 8-12 hours learner-ready core, plus planned production extensions  
**Prerequisites:** Module 4 or equivalent comfort with RAG, tools, workflows, and pytest  
**Pedagogy:** eval-driven development, operational evidence, and small release gates

## Module Overview

Module 5 turns working AI features into maintainable AI systems. Learners build golden datasets, regression checks, CI gates, structured logs, deployment boundaries, and monitoring plans.

The lesson is simple: a demo that works once is not production engineering. A junior AI engineer should learn to ask what can regress, what should be logged, what costs money, what leaks secrets, what fails under malformed input, and how the team will know when the system is wrong.

The all-phases book synthesis adds one more production habit: do not jump to fine-tuning or bigger models because they sound advanced. Learners must compare deterministic code, prompt-only design, RAG, tool use, agents, and fine-tuning before choosing a path.

## Layer-Proof Project

**Production Hardening Sprint**

Learners take one prior project, preferably the RAG support desk or the tool-using assistant, and harden it:

- create a small golden dataset
- add repeatable eval commands
- add structured logs and failure categories
- define latency and cost budgets
- containerize or package the app locally
- document a release checklist

The same hardening pattern is then applied to FinAgent before the capstone.

**Model Selection and Adaptation Decision**

Learners take one narrow requirement and compare:

- deterministic code
- prompt-only output
- structured-output prompting
- RAG
- tool use
- fine-tuning as an optional later-layer path

They produce a decision note with quality, cost, latency, data, safety, and maintenance tradeoffs.

## Current Learning Path

| Week | Folder | Learner deliverable | Verification |
| --- | --- | --- | --- |
| Week 1 | `week-01-golden-datasets` | Golden examples, edge cases, eval objective, and summary report | `python -m pytest curriculum/05-module-5-production/week-01-golden-datasets/tests -v` |
| Week 2 | `week-02-cicd` | Prompt/model/index version notes plus unit/eval smoke gate and CI-style command checklist | `python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v` |
| Week 3 | `week-03-fastapi` | Local service boundary with health and error responses | planned scaffold |
| Week 4 | `week-04-docker` | Reproducible local package or container run path | planned scaffold |
| Week 5 | `week-05-monitoring` | Structured logs, traces, failure categories, and review loop | planned scaffold |
| Week 6 | `week-06-optimization` | Cost, latency, caching, batching, and retry tradeoffs | planned scaffold |
| Week 7 | `week-07-fine-tuning` | Decision framework for prompt/RAG/tooling/fine-tuning, with fine-tuning kept as optional adaptation lab | planned scaffold |

## Learner Readiness Boundary

Assign only Week 1 and Week 2 today. Weeks 3-7 are roadmap placeholders until
each folder has a README, learner-editable `workbench.py`, fixtures if needed,
tests that collect cleanly, hints, and a rubric. Do not use planned scaffold
folders as capstone readiness gates.

## Teaching Contract

Every week should produce operational evidence:

1. A command the learner can run.
2. A failure case the learner can reproduce.
3. A log, metric, or eval result the learner can inspect.
4. A short decision note explaining the tradeoff.

## Style Rubric

A strong Module 5 learner:

- starts evals before optimizing prompts or agents
- separates unit tests, scaffold tests, and AI behavior evals
- keeps secrets out of tests, logs, prompts, and docs
- treats LLM outputs as nondeterministic unless constrained or mocked
- explains cost and latency in plain numbers
- compares model/system choices before adding complexity
- can explain why fine-tuning is often not the first fix
- writes release notes that a teammate could actually follow

## FinAgent Connection

FinAgent's final value depends on reliability, not just features. Module 5 adds gates for:

- bad tickers
- missing or stale market data
- malformed tool responses
- unsupported claims
- citation failures
- rate limits
- latency and cost budgets
- safety language for educational use only

## Checkpoint Gate

Learners are ready for the capstone when they can:

- create and run a golden eval set
- explain false positives, false negatives, and ambiguous failures
- add structured logs for a failed workflow
- run the app from a clean checkout or reproducible local package
- produce a model-selection decision note
- document known limitations without overselling the system
