# Module 6 AI Authoring Guide

Use this guide when creating or modifying capstone lessons.

## Module Role

Module 6 synthesizes the curriculum into a portfolio-ready FinAgent capstone. The capstone must show implementation, evaluation, source grounding, safety boundaries, and interview-ready explanation.

## Authoring Priorities

1. Keep FinAgent scoped to educational stock-market analysis.
2. Require tests, evals, fixtures, traces, and failure analysis.
3. Make model-selection reasoning visible.
4. Preserve source freshness, uncertainty, and limitations.
5. Prepare portfolio artifacts without turning Layer 1 into a full SaaS build.

## Lesson Requirements

Each capstone slice needs:

- a concrete deliverable
- runnable local command
- tests or eval evidence
- documentation requirement
- safety and non-advice language
- a portfolio or interview explanation prompt

## Guardrails

- Do not produce investment advice, trading recommendations, or unsupported price predictions.
- Do not require a frontend, cloud stack, or full fintech platform.
- Do not accept uncited claims when the capstone claims source grounding.
- Do not let agent autonomy bypass tool, retrieval, or safety gates.

## Pedagogy Enforcement

Every Module 6 slice must make the teaching style visible:

- explain capstone decisions like a knowledgeable friend at a cafe, using concrete portfolio, reviewer, and user examples before formal architecture
- include a useful diagram, mind map, architecture sketch, eval table, or decision map when it clarifies the capstone artifact
- search the web before publishing for one current, high-quality visual or video resource for the exact capstone topic or interface
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- frame the task as a portfolio-ready engineering decision or capstone failure to repair
- ask learners to inspect prior module artifacts, evals, traces, or source evidence before building
- require a prediction about reliability, safety, or user-facing output
- make tradeoff explanation part of the deliverable, not an afterthought
- include a reviewer-facing artifact such as eval results, trace samples, architecture notes, or failure analysis
- end with an interview-style explanation prompt

If the capstone slice becomes feature accumulation without evidence and explanation, revise the gate before continuing.

## Good Module 6 Slice

A good slice integrates earlier module skills and leaves behind a clear portfolio artifact a reviewer can inspect and rerun.
