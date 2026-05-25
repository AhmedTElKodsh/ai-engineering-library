# Module 1 AI Authoring Guide

Use this guide when creating or modifying whole-game FinAgent lessons.

## Module Role

Module 1 gives learners the complete product shape before the internals. It should feel like running, tracing, modifying, and packaging a small deterministic FinAgent workflow.

## Authoring Priorities

1. Start from a visible whole workflow.
2. Keep the first FinAgent slice deterministic.
3. Teach the learner to trace input, validation, calculation, output, and safety language.
4. Make every change constrained and test-guided.
5. Use whole-part-whole, test-driven learning, and review-based learning: learners run the whole slice, change one part, then explain the product impact.
6. Prepare the learner for Module 2 by naming what the system does not yet understand.

## Lesson Requirements

Each week needs:

- a FinAgent story hook
- an expected time to finish near the top of the README and learner-editable workbench file
- `workbench.py`
- tests with meaningful failure messages
- progressive hints
- a rubric
- a short deterministic-code vs LLM/RAG/agent decision prompt
- one product-evidence artifact: trace note, PR-style summary, risk note, or failure analysis

## Guardrails

- Do not add LLM calls in Module 1.
- Do not hide the whole workflow behind framework code.
- Do not turn the stock-market context into investment advice.
- Do not skip the Module 0 diagnostic/remediation entry path.

## Pedagogy Enforcement

Every Module 1 lesson must make the teaching style visible:

- explain the product slice like a knowledgeable friend at a cafe, using concrete examples before abstract AI engineering language
- include a useful diagram, mind map, product-flow table, or trace visual when it clarifies the whole-game workflow
- search the web before publishing for one current, high-quality visual or video resource for the exact lesson topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- start with a FinAgent mission or product failure
- let learners run or trace the whole workflow before changing one part
- ask learners to predict which output or test will change
- make the first failing test part of the explanation
- require a short deterministic-code vs AI-complexity reflection
- require a short PR-style summary for larger changes: what changed, why, tests run, and remaining risk
- reconnect the modified behavior to the whole FinAgent slice

If the lesson becomes a disconnected function exercise, revise the story, trace, and reflection before adding more code.

## Good Module 1 Slice

A good slice lets learners change one visible product behavior while preserving the deterministic baseline and safety language.

## Instructor Guidance

Keep Module 1 lessons conversational and Socratic. Ask learners what they expect before they run code. When they are stuck, point them to the next failing test, trace prompt, or hint instead of giving the final implementation.

Use learner-facing phase titles even when stable folder names remain week-based:

- `week-01-execute`: Phase 1 - First FinAgent Stock Summary
- `week-02-modify`: Phase 2 - FinAgent Risk Signal Extension
- `week-03-deploy`: Phase 3 - Local FinAgent Request Boundary
