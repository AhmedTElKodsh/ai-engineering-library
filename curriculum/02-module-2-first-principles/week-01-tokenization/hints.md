# Hints: Market Text Tokenization Lab

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
