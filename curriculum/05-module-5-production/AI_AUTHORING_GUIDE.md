# Module 5 AI Authoring Guide

Use this guide when creating or modifying production AI engineering lessons.

## Module Role

Module 5 turns working AI features into evaluated, observable, reproducible systems. It teaches evals, logs, release gates, cost, latency, configuration, and model-selection decisions.

## Authoring Priorities

1. Start with golden datasets and repeatable eval commands.
2. Separate unit tests, scaffold checks, learner evals, and reviewer validation.
3. Keep secrets out of tests, logs, prompts, docs, and summaries.
4. Teach cost and latency with small concrete numbers.
5. Make fine-tuning a decision path or optional lab, not the default fix.

## Lesson Requirements

Each week needs:

- a reproducible command
- a realistic failure case
- an inspectable log, metric, eval result, or release artifact
- `workbench.py` where learners implement the core behavior
- tests or evals for normal, edge, and failure paths
- a rubric with operational evidence

## Guardrails

- Do not call a demo production-ready without eval evidence.
- Do not require cloud deployment for the first-success path.
- Do not optimize before defining the measurement.
- Do not introduce fine-tuning implementation unless prompt/RAG/tool alternatives have been compared.

## Pedagogy Enforcement

Every Module 5 lesson must make the teaching style visible:

- explain operational concepts like a knowledgeable friend at a cafe, using a small incident, metric, or release decision before formal process
- include a useful diagram, mind map, eval table, release-gate chart, or log/metric visual when it clarifies the evidence
- search the web before publishing for one current, high-quality visual or video resource for the exact eval, observability, deployment, or reliability topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- frame the lesson around a regression, release risk, cost/latency surprise, or observability gap
- ask learners to inspect eval examples, logs, metrics, or failure categories before changing code
- require a prediction about which case will pass, fail, or become ambiguous
- make the verification command produce evidence the learner can interpret
- include a decision note about the tradeoff being made
- end by connecting the operational gate to FinAgent capstone reliability

If the lesson adds tooling without measurable evidence, revise the eval/logging task first.

## Good Module 5 Slice

A good slice produces evidence a teammate could rerun: a command, a result, a failure category, and a short decision note.
