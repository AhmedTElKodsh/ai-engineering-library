# Hints: Advanced RAG

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
