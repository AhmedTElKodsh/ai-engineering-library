# Module 2 AI Authoring Guide

Use this guide when creating or modifying first-principles lessons.

## Module Role

Module 2 opens the machine. Learners build small inspectable versions of tokenization, embeddings, attention, context behavior, and decoding before they use LLM APIs. Transformer-block and training-versus-inference depth now live in Extended Concepts for learners who are ahead or returning later.

## Authoring Priorities

1. Keep the required sequence fixed: tokenization -> embeddings -> attention -> context/decoding.
2. Use plain Python first.
3. Keep math small enough to inspect with tests.
4. Connect every primitive back to FinAgent market text or source grounding.
5. Use first-principles implementation, worked traces, retrieval practice, and UDL-friendly visuals to reduce math intimidation.
6. Prepare Module 3 without drifting into transformer implementation or full model training.

## Lesson Requirements

Each week needs:

- a worked trace with tiny inputs
- an expected time to finish near the top of the README and learner-editable workbench file
- `workbench.py` with explicit TODOs
- tests for normal cases and edge cases
- progressive hints
- a rubric with concept explanation requirements
- a shape/trace table or diagram when the mechanism involves intermediate values
- one model-decision reflection: when this primitive helps, and when a production library or API is the right tool
- reviewer-only intended behavior under `.kiro/specs/curriculum-planning/implementation-notes/`

## Guardrails

- Do not require NumPy, PyTorch, transformer libraries, paid APIs, or GPUs for the first-success path.
- Do not pull the extended tiny-transformer lab back into the required path unless the learner is explicitly taking the extension.
- Do not let from-scratch GPT training enter Layer 1.
- Treat numerical tests carefully and keep tolerances explicit.

## Pedagogy Enforcement

Every Module 2 lesson must make the teaching style visible:

- explain each mechanism like a knowledgeable friend at a cafe, using tiny numbers, sketches, and plain language before formal terms
- include a useful diagram, mind map, tensor/shape table, or visual trace when it clarifies the model mechanism
- search the web before publishing for one current, high-quality visual or video resource for the exact topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- begin with a concrete FinAgent model-facing question
- show a tiny traceable input before explaining the abstraction
- ask learners to predict an intermediate value before running tests
- keep explanations tied to the next helper function they will implement
- require inspection of tokens, vectors, scores, weights, shapes, or traces
- ask learners to separate what the toy implementation proves from what it cannot prove about real models
- end with what the toy mechanism teaches and what it does not prove about real models

If the lesson turns into theory without inspectable code and tests, revise it before adding technical depth.

## Good Module 2 Slice

A good slice creates a tiny artifact the learner can run, inspect, test, and explain in plain language.

## Instructor Guidance

Use learner-facing phase titles even when stable folder names remain week-based:

- `week-01-tokenization`: Phase 1 - Market Text Tokenization Lab
- `week-02-embeddings`: Phase 2 - Market Note Similarity Search Lab
- `week-03-attention`: Phase 3 - Market Context Attention Lab
- `week-04-context-decoding`: Phase 4 - Context Window And Decoding Lab

Extended concepts, in recommended order:

- `../../extended-concepts/01-model-internals/week-01-tiny-transformer/`: Tiny Transformer Block Lab
- `../../extended-concepts/01-model-internals/week-02-training-vs-inference/`: Training Versus Inference Lab
