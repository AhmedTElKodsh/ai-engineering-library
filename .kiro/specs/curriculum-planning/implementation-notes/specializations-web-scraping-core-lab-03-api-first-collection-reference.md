# Reference Behavior: Web Data Core Lab 3 API-First Collection

Scaffold: `curriculum/specializations/web-scraping/core-lab-03-api-first-collection/workbench.py`

## Intent

This lab should teach preferring stable JSON/API fixtures when available and separating raw, clean, and failed collection layers.

## Intended Behavior

- Load local API fixture payloads.
- Validate required item fields and report missing fields.
- Collect clean API records separately from failed records.
- Preserve IDs, titles, sources, timestamps, and evidence fields.
- Build collection reports that summarize clean and failed counts.

## Reviewer Edge Cases

- Missing required fields should identify the specific field.
- Failed records should preserve enough raw context to debug.
- Reports should include evidence, not only counts.

## Do Not Accept

- Live API dependency in required tests.
- Merging failed and clean layers.
- Dropping malformed items silently.
