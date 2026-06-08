# Validation: Web Data Core Lab 4 Pagination, Retries, And Deduplication

Scaffold: `curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication/workbench.py`

## Commands

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication --collect-only -q
python -m pytest curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to page loading, next-link discovery, extraction, deduplication, fetch planning, or summary behavior.

## Reviewer Checks

- Confirm last-page and relative-link cases are tested.
- Confirm deduplication criteria are explicit.
- Confirm fetch plan metadata includes timeout and rate-limit.
