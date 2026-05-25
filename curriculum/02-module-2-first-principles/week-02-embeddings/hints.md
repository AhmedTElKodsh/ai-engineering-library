# Hints: Market Note Similarity Search Lab

## Hint 1: Normalize Terms

Use a regular expression to find words:

```python
re.findall(r"[a-z0-9]+", text.lower())
```

This keeps the tokenizer simple and deterministic.

## Hint 2: Vocabulary

Collect terms in a set, then sort it:

```python
sorted(unique_terms)
```

The sorted order keeps vector positions stable.

## Hint 3: Vectorize

Count terms first, then build the vector in vocabulary order. If a vocabulary word does not appear, its value should be `0.0`.

## Hint 4: Cosine Similarity

The formula is:

```text
dot(left, right) / (magnitude(left) * magnitude(right))
```

Return `0.0` if either magnitude is zero.

## Hint 5: Build The Index

The index stores three things together:

- the vocabulary
- the original notes
- one vector per note

Every vector must have the same length as the vocabulary.

## Hint 6: Search

Use `enumerate` so you keep the original document order for tie-breaking.

Only return results with a positive score. A zero score means the query and document had no shared terms in this tiny model.

## Hint 7: Grounded Context

A useful context line includes:

- source note ID
- ticker
- score rounded to two decimals
- original note text

This prepares learners for later RAG and citation work.
