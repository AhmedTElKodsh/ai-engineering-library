# Reference Behavior: Module 2 Phase 1 Tokenization

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-01-tokenization/workbench.py`

## Intent

This lesson should make tokenization mechanical: bytes, adjacent pairs, merges, vocabulary records, encoding, decoding, round trips, and budget estimates.

## Intended Behavior

- Convert text to UTF-8 byte integer values and back.
- Count adjacent pairs across every neighbor.
- Merge non-overlapping pairs left to right.
- Train a tiny BPE tokenizer with deterministic merge and vocabulary records.
- Encode by applying learned merges in order.
- Decode base and merged tokens back to text.
- Estimate token budgets per original text.

## Reviewer Edge Cases

- Unicode text should round-trip through UTF-8.
- Pair merges should not overlap in one pass.
- Training should behave deterministically on ties.
- Empty input should stay well-defined.

## Do Not Accept

- Production tokenizer libraries.
- Encoding that cannot decode back to the original text for covered examples.
- Hidden randomness in merge selection.
