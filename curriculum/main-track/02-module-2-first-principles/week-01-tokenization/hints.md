# Hints: Market Text Tokenization Lab

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and found the tokenizer function it names.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when you understand the concept but the exact behavior still fails.

## Layer 1

Follow the tokenizer in small stages: text to bytes, bytes back to text, pair counting, merging, vocabulary growth, and token-budget estimation.

Before editing, answer:

- Is the test about representing text, counting adjacent pairs, merging pairs, or tracking vocabulary?
- Does the function need to preserve order?
- What should happen when two choices have the same score or count?

## Layer 2

### Bytes And Text

Encoding turns text into byte values. Decoding reverses that process when the byte sequence is valid.

Keep the output type exactly what the test expects. A list of byte integers, a string, and a vocabulary entry are different contracts.

### Pair Counting And Merging

Pair counting looks at adjacent tokens. The last token has no token after it, so it does not start a pair.

Merging should be non-overlapping. After a pair is merged, the next scan position should move past both tokens in that pair.

### Training BPE

Start with byte-level vocabulary before adding learned merge tokens. Each new token should receive a stable new ID.

When counts tie, choose deterministically so repeated runs produce the same tokenizer.

Vocabulary entries should represent the underlying byte sequence, even when the merge includes a token that was itself created earlier.

### Token Budget

Token-budget estimation does not need to summarize the text. It only needs to encode each snippet and count the resulting token IDs.

## Layer 3

### Reading The Tests

If pair counts are off by one, check the scan range and the final token.

If merge output is too short or too long, check whether overlapping pairs were merged by accident.

If a vocabulary entry is wrong, expand any learned token back to its byte sequence before combining it with the new pair.

### Final Check

Run pair-counting and merge tests before training tests. The training path depends on those smaller behaviors being stable.
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

### text_to_bytes

Use this hint entry for `text_to_bytes`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### bytes_to_text

Use this hint entry for `bytes_to_text`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### count_adjacent_pairs

Use this hint entry for `count_adjacent_pairs`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### merge_pair

Use this hint entry for `merge_pair`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### train_bpe

Use this hint entry for `train_bpe`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### encode

Use this hint entry for `encode`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### decode

Use this hint entry for `decode`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### estimate_token_budget

Use this hint entry for `estimate_token_budget`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
