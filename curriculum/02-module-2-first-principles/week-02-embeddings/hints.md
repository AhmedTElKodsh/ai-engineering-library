# Hints: Market Note Similarity Search Lab

Use these only after you have read the failing test and identified the retrieval stage it exercises.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the search result looks close but not quite right.

## Layer 1

Build the search system in order: normalize terms, build vocabulary, vectorize notes, score similarity, store the index, then format grounded context.

Before editing, answer:

- Is this test about text normalization, vector shape, ranking, filtering, or citation context?
- Does the expected output depend on stable ordering?
- What metadata must survive from the original note?

## Layer 2

### Normalization And Vocabulary

Normalize terms in a simple deterministic way: lowercase text and keep word-like pieces. Avoid smart linguistic behavior that the tests did not ask for.

Collect unique terms, then put them in stable order. Vector positions only make sense when every note uses the same vocabulary order.

### Vectorization And Similarity

Vectorization counts terms in vocabulary order. Missing terms should contribute zero instead of changing vector length.

Cosine similarity compares direction, not raw size. If either vector has no magnitude, the safest score is zero.

### Index And Search

The index should keep the vocabulary, original notes, and one vector per note together. All vectors must match the vocabulary length.

Search should keep enough information to break ties deterministically and map a score back to the original note.

Only positive matches should appear in the tiny search result. A zero score means this toy model found no shared terms.

### Grounded Context

Grounded context should include source identity, ticker, score, and original note text. This prepares the learner for later citation-aware RAG.

## Layer 3

### Reading The Tests

If vector lengths differ, inspect vocabulary construction before search ranking.

If ranking is unstable, check tie-breaking and original note order.

If context text fails, list the required fields before changing score logic.

### Final Check

Run normalization and vector tests before search tests. Retrieval bugs are easier to diagnose when the earlier stages are already trustworthy.
