# Hints: Advanced RAG

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and identified the retrieval or answer stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when retrieval works but citation or abstention behavior fails.

## Layer 1

Make the citation contract visible before making retrieval fancy. A simple deterministic retriever is enough for this lab.

Before editing, answer:

- Is this test about scoring, chunk metadata, answer support, citation shape, or abstention?
- Which source facts must travel with a retrieved chunk?
- What should happen when no chunk is good enough?

## Layer 2

### Retrieval

Use simple keyword overlap first. Fancy embeddings can wait until the source-grounding behavior is clear.

A retrieved chunk should carry chunk identity, source identity, and human-readable source metadata.

### Answering

Answer generation can be extractive. Prefer combining supported evidence over inventing new prose.

Every answer that uses evidence should make citation data inspectable by a test or reviewer.

### Abstention

If every score is below the threshold, return an abstention with no citations and a clear reason.

Abstention is a successful safety behavior, not a crash.

## Layer 3

### Reading The Tests

If ranking fails, inspect score inputs before answer text.

If citation tests fail, check chunk metadata before answer generation.

If abstention fails, confirm low-score cases do not sneak into the answer path.

### Final Check

Run retrieval tests before answer tests. The answer layer should only use chunks that passed retrieval and threshold rules.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### load_bridge_chunks

Use this hint entry for `load_bridge_chunks`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### normalize_terms

Use this hint entry for `normalize_terms`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### retrieve

Use this hint entry for `retrieve`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_tiny_vocabulary

Use this hint entry for `build_tiny_vocabulary`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### vectorize_terms

Use this hint entry for `vectorize_terms`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### cosine_similarity

Use this hint entry for `cosine_similarity`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### retrieve_hybrid

Use this hint entry for `retrieve_hybrid`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### answer_with_citations

Use this hint entry for `answer_with_citations`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_retrieval_trace

Use this hint entry for `build_retrieval_trace`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
