# Hints

## Hint 1

Use simple keyword overlap first. Fancy embeddings can wait until the citation contract is visible.

## Hint 2

A retrieved chunk should carry `chunk_id`, `record_id`, `source_id`, and source URL or title metadata.

## Hint 3

Answer generation can be extractive: combine the best supported sentence instead of inventing new prose.

## Hint 4

If every score is below the threshold, return an abstention with an empty citation list and a clear reason.
