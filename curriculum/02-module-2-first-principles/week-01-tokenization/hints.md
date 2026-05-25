# Hints: Market Text Tokenization Lab

## Hint 1: Bytes First

Python strings have an `.encode("utf-8")` method. The result can be converted into a list of integers.

## Hint 2: Decode Is The Reverse

If you have integer byte values, `bytes(byte_values).decode("utf-8")` reconstructs the text when the byte sequence is valid UTF-8.

## Hint 3: Pair Counting

Use a loop over indexes:

```python
for index in range(len(tokens) - 1):
    pair = (tokens[index], tokens[index + 1])
```

Then increment a dictionary count.

## Hint 4: Non-Overlapping Merges

When you merge a pair, move forward by two positions. When you do not merge, copy the current token and move forward by one.

## Hint 5: Training BPE

Start the vocabulary with every byte:

```python
vocabulary = {i: (i,) for i in range(256)}
```

Each new token ID should start at `256`.

## Hint 6: Choosing The Pair

Pick the pair with the highest count. If two pairs tie, choose the lexicographically smaller pair so tests and learners get deterministic behavior.

## Hint 7: Vocabulary Entries

When `(65, 65)` becomes token `256`, the new vocabulary entry should be `(65, 65)`.

When `(256, 80)` becomes token `257`, expand the existing entry for `256`, then append the bytes for `80`, producing `(65, 65, 80)`.

## Hint 8: Token Budget

`estimate_token_budget` does not need to summarize text. It only needs to encode each snippet and count the token IDs.
