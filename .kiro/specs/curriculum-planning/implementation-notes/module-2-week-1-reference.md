# Module 2 Week 1 Reference Behavior

This note records intended behavior for reviewers without placing complete answers in the learner-facing workbench.

## Intended Scope

Module 2 Week 1 introduces a tiny deterministic byte-pair tokenizer for stock-market text. It should remain a first-principles lesson:

- plain Python only
- no `tiktoken`
- no `transformers`
- no NumPy
- no LLM calls

## Expected Learner Behaviors

- `text_to_bytes(text)` returns UTF-8 byte integers.
- `bytes_to_text(byte_values)` reconstructs valid UTF-8 text.
- `count_adjacent_pairs(tokens)` counts every adjacent pair.
- `merge_pair(tokens, pair, new_token_id)` merges non-overlapping matches left to right.
- `train_bpe(corpus, target_vocab_size)` starts with byte vocabulary `0..255`, learns most frequent adjacent pair merges, breaks ties deterministically, and records expanded byte sequences for merged tokens.
- `encode(text, tokenizer)` converts text to bytes and applies learned merges in training order.
- `decode(token_ids, tokenizer)` expands token IDs into byte values and decodes them.
- `estimate_token_budget(texts, tokenizer)` maps each original text snippet to encoded token count.

## Pedagogical Intent

The tests are expected to fail in the learner workbench state. That failure is the exercise contract. Reviewers should verify import and collection success separately from learner TODO failures.

The FinAgent callback is token budgeting for stock summaries and market notes before those texts are sent to an LLM context window in later modules.
