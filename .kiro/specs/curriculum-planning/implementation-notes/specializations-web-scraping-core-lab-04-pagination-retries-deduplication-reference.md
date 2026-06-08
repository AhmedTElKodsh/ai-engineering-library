# Reference Behavior: Web Data Core Lab 4 Pagination, Retries, And Deduplication

Scaffold: `curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication/workbench.py`

## Intent

This lab should teach robust collection planning: page fixtures, next-page discovery, listing extraction, deduplication, fetch plans, and collection summaries.

## Intended Behavior

- Load local page fixtures.
- Resolve relative next-page URLs and stop on last page.
- Extract listing records with page and source metadata.
- Deduplicate by repeated URL and content.
- Build fetch plans with timeout and rate-limit metadata.
- Summarize records and failures.

## Reviewer Edge Cases

- Last pages should return no next URL.
- Relative links should resolve against page URL.
- Duplicates should be removed without losing unique records.

## Do Not Accept

- Infinite pagination.
- Fetch plans without timeout/rate-limit metadata.
- Deduplication that drops distinct records with similar titles.
