# Reference Behavior: Module 4 Phase 3 Explicit Workflow Pattern Lab

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/workbench.py`

## Intent

This lesson should show that many agentic tasks can be safer explicit workflows: classify, plan, call evidence tools, gate unsupported answers, and produce traceable responses.

## Intended Behavior

- Load workflow cases from fixtures.
- Classify requests by evidence needs and risk.
- Build prompt-chain plans with explicit steps.
- Run evidence tools with success/failure results.
- Evaluate gates that block unsupported answers.
- Return workflow responses with trace summaries.

## Reviewer Edge Cases

- High-risk or unsupported cases should route to safe handling.
- Missing evidence should not produce a confident answer.
- Trace summaries should name steps and decisions.

## Do Not Accept

- Free-running agent loops.
- Tool results trusted without gate evaluation.
- Opaque final answers without trace evidence.
