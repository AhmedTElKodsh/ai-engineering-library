# Authoring Plan: Module 2 Phase 2

## Scope

Create a market-note similarity lab after tokenization and before attention.

This phase teaches learners to inspect tiny bag-of-terms vectors, vocabulary
order, cosine similarity, retrieval ranking, and grounded-context formatting. It
must not require embeddings APIs, vector databases, NumPy, or live model calls.

## Acceptance Checks

- [x] `README.md` frames embeddings and retrieval as inspectable vector
  similarity before RAG.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define term normalization, vocabulary ordering, vectorization, dot
  product, magnitude, cosine similarity, index construction, search ranking,
  tie order, no-match behavior, and grounded context formatting.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates vector traces, retrieval relevance, no-match
  handling, grounding, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-02-embeddings/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: text-to-token
  transformations and token-budget reasoning.
- New capability added by this lesson: represent market notes as comparable
  vectors and retrieve relevant notes before answering.
- Failure mode the learner must reproduce, inspect, or prevent: zero vectors,
  irrelevant matches, vocabulary-order mismatches, or unsupported retrieval
  claims.
- FinAgent or practical AI-system improvement: FinAgent can retrieve related
  market notes before full RAG answer generation.
- Explanation artifact the learner should leave with: a short trace showing one
  query vector, one document vector, similarity score, and retrieved source.

## Scope Boundary Enhancement

- Minimum required path: normalize terms, build vocabulary, vectorize text,
  compute similarity, build an index, search, and format grounded context.
- Optional enrichment only after the minimum path works: add one no-match,
  tie-break, or misleading-match edge case.
- Advanced doorway, named briefly but not required: learned embeddings,
  embedding APIs, vector databases, ANN indexes, hybrid retrieval, and reranking
  belong to Module 4/5 or Course 3.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B09 `Hands-On Large Language Models` indexed baseline for embeddings and RAG
  intuition in Course 1 mental models.
- Local PDF `Natural Language Processing with Transformers`, p.81 and p.84-86
  for embeddings becoming contextual representations in later transformer
  layers.
- Local PDF `Hands-On RAG for Production`, p.8-15 for retrieval as a separate
  flow that depends on source preparation and query behavior.
- Assessment conversion rule: each source insight must become a vector trace,
  similarity check, retrieval result, no-match behavior, grounded-context field,
  or learner explanation prompt.
