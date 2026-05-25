# Phase 2: Market Note Similarity Search Lab

Folder: `week-02-embeddings`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_tiny_embeddings.py`

## Learning Goal

Build a tiny vector search system with plain Python and explain how FinAgent can retrieve related market notes before generating an answer.

## Success Looks Like

- The tests pass because term normalization, vocabulary order, vector math, retrieval, and grounded-context formatting work.
- Your trace note shows one query vector, one document vector, and the similarity score between them.
- Your reflection separates this transparent toy embedding from production semantic embeddings.

## Real-World Context

Modern AI systems rarely answer from one prompt alone. They retrieve relevant context first: earnings notes, analyst summaries, filings, news snippets, and prior calculations. In production this is often called retrieval-augmented generation, but the core idea is simple:

1. Represent each text as a vector.
2. Measure similarity between vectors.
3. Return the most relevant records.
4. Ground the generated answer in those records.

This chapter does not call an embeddings API. You will build a small deterministic version so the mechanism is visible.

## Story

FinAgent has three notes:

- AAPL reports stronger iPhone revenue.
- MSFT expands cloud margins.
- TSLA lowers delivery guidance.

A learner asks:

> What notes are relevant to Apple revenue?

FinAgent should not guess. It should retrieve the most related notes first. Your job is to build the tiny retrieval layer that makes that possible.

## Read

An embedding is a list of numbers that represents useful features of a text. Production embeddings are learned by large models. In this chapter, you will use a transparent bag-of-terms embedding:

1. Normalize text.
2. Tokenize it into simple words.
3. Build a vocabulary from the corpus.
4. Count term frequencies into vectors.
5. Compare vectors with cosine similarity.
6. Retrieve the highest scoring market notes.

This is intentionally small. The point is to understand vector search before using a managed vector database or model-generated embeddings.

## Trace

Before editing code, inspect `workbench.py` and answer:

1. Which functions turn text into terms?
2. Where does the vocabulary order come from?
3. Why do query vectors and document vectors need the same length?
4. What should happen when a query shares no terms with any document?
5. Which function would later be replaced by an API embedding call?

## Explain

Write short answers before coding:

1. Why is cosine similarity better than raw dot product for comparing documents of different lengths?
2. What does a zero vector mean in this chapter?
3. Why should retrieved notes include source IDs?
4. What can go wrong if FinAgent retrieves irrelevant market notes?

## Modify

Start with vector math:

1. Implement `dot_product`.
2. Implement `magnitude`.
3. Implement `cosine_similarity`.
4. Run the tests and read the next failure.

Then move into text processing and retrieval.

## Create

Complete the TODOs in `workbench.py`:

- `normalize_terms`
- `build_vocabulary`
- `vectorize`
- `dot_product`
- `magnitude`
- `cosine_similarity`
- `build_index`
- `search`
- `build_grounded_context`

Keep the implementation deterministic. If scores tie, preserve the original document order.

## Verify

Run from this folder:

```powershell
python -m pytest tests -v
```

The tests intentionally fail at first. Treat each failure as the next instruction.

## Reflect

- Which retrieved note was most obvious?
- Which retrieved note was ambiguous?
- Why are simple term counts weaker than learned embeddings?
- What source metadata would FinAgent need before using retrieved notes in a final answer?

## Extension

Add one test for a query about a ticker symbol and one test for a query about a business topic such as revenue, margins, or guidance.

## Evidence Artifact

Write a short retrieval trace:

```text
Query:
Normalized query terms:
Vocabulary positions inspected:
Top source ID:
Similarity score:
Why this result is grounded:
What this toy embedding misses:
```

## Connection To Phase 1

Phase 1 showed how text becomes tokens. Phase 2 shows how text becomes vectors for retrieval. Later, FinAgent will combine both ideas: token budgeting controls what can fit in context, and retrieval decides what deserves to be included.
