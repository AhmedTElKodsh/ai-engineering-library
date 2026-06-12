# Authoring Plan: Module 2 Phase 3

## Scope

Create a tiny scaled dot-product attention lab after embeddings and before the
transformer vertical slice.

This phase teaches learners to inspect query/key/value vectors, score scaling,
softmax weights, weighted sums, source alignment, and attention explanations. It
must stay as plain Python lists and tests, not a transformer library lab.

## Acceptance Checks

- [x] `README.md` frames attention as a visible mechanism for context emphasis.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define dot product, dimension mismatch refusal, score scaling,
  softmax, empty softmax, weighted sum, attention output, unaligned-input
  refusal, most-attended source, empty-result handling, and explanation text.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates shape checks, attention weights, source alignment,
  explanation quality, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-03-attention/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: vector construction,
  similarity scoring, and grounded-context formatting.
- New capability added by this lesson: trace how a query distributes attention
  over key/value/source triples.
- Failure mode the learner must reproduce, inspect, or prevent: mismatched
  dimensions, unaligned keys/values/sources, unstable weights, or unsupported
  claims about what attention proves.
- FinAgent or practical AI-system improvement: FinAgent can explain which
  context source a toy mechanism emphasized while still treating final answers
  as needing citations and evals.
- Explanation artifact the learner should leave with: a short note naming the
  highest-weight source, its ticker, its weight, and what the toy does not prove.

## Scope Boundary Enhancement

- Minimum required path: compute dot products, scale scores, softmax weights,
  weighted sums, aligned attention output, most-attended source, and an
  explanation.
- Optional enrichment only after the minimum path works: add one dimension,
  alignment, or empty-result edge case.
- Advanced doorway, named briefly but not required: multi-head attention,
  positional encodings, masking, residuals, layer normalization, and optimized
  tensor implementations belong to later Module 2 slices or Course 2.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `Natural Language Processing with Transformers`, p.81 and p.84-86
  for transformer anatomy, encoders, and self-attention as contextual
  representation mechanisms.
- B09 `Hands-On Large Language Models` indexed baseline for visual LLM intuition
  and attention/embedding mental models.
- B13 `Build a Large Language Model (From Scratch)` indexed baseline for
  from-scratch attention mechanisms as later-course depth.
- Assessment conversion rule: each source insight must become a shape check,
  weight trace, source-alignment assertion, highest-weight explanation,
  toy-limitation note, or learner explanation prompt.
