# Authoring Plan: Module 2 Phase 1

## Scope

Create a market-text tokenization lab before embeddings, attention, and provider
boundaries.

This phase teaches learners to inspect how raw text becomes bytes, token IDs,
merge rules, decoded text, and token-budget estimates. It must stay as a tiny
plain-Python tokenizer, not a production tokenizer dependency.

## Acceptance Checks

- [x] `README.md` frames tokenization as the bridge from human text to model
  input.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define UTF-8 bytes, decode round trips, adjacent-pair counts,
  non-overlapping merges, BPE training, ordered merge encoding, decoding, and
  token-budget estimates.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates token traces, merge behavior, round trips, budget
  reasoning, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-01-tokenization/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: deterministic FinAgent
  text output from Module 1.
- New capability added by this lesson: trace raw market text through bytes,
  merges, token IDs, and decoded text.
- Failure mode the learner must reproduce, inspect, or prevent: punctuation or
  spacing changing token boundaries, merge-order bugs, or decode behavior that
  cannot reconstruct the original text.
- FinAgent or practical AI-system improvement: FinAgent can reason about context
  and cost before sending long market notes to a provider.
- Explanation artifact the learner should leave with: a short trace showing one
  sentence as bytes, token IDs, decoded text, and token-budget estimate.

## Scope Boundary Enhancement

- Minimum required path: convert text to bytes, count pairs, merge pairs, train a
  small BPE tokenizer, encode, decode, and estimate token budgets.
- Optional enrichment only after the minimum path works: add one punctuation,
  unknown character, or budget edge case.
- Advanced doorway, named briefly but not required: production tokenizers,
  Unicode normalization depth, special tokens, tokenizer training at scale, and
  provider-specific token counting belong to later depth or provider docs.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `Natural Language Processing with Transformers`, p.41 and p.53-57
  for tokenization before numerical model input and character/word/subword
  tradeoffs.
- B09 `Hands-On Large Language Models` indexed baseline for visual LLM intuition
  and concrete token/embedding mental models.
- B13 `Build a Large Language Model (From Scratch)` indexed baseline for
  from-scratch mechanisms as later-course depth.
- Assessment conversion rule: each source insight must become a token trace,
  byte/ID assertion, merge-history check, round-trip check, budget note, or
  learner explanation prompt.
