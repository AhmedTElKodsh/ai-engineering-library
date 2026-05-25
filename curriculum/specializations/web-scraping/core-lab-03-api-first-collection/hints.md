# Hints

## Hint 1

Load the JSON fixture first. Do not design around live HTTP until the local schema is clear.

## Hint 2

Treat `symbol`, `headline`, `summary`, `source_url`, and `published_at` as required for a clean record.

## Hint 3

Keep malformed API items in failed records with a reason. API data can be messy too.

## Hint 4

The clean layer should be smaller and stricter than the raw payload.
