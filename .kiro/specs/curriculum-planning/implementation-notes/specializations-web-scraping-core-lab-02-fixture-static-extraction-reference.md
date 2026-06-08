# Reference Behavior: Web Data Core Lab 2 Fixture-First Static Extraction

Scaffold: `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/workbench.py`

## Intent

This lab should teach extraction from local HTML fixtures with clean records, failed extraction evidence, normalized text, and JSONL-ready provenance.

## Intended Behavior

- Load fixture HTML from local files.
- Normalize whitespace without destroying meaning.
- Extract market-note records and failed extractions.
- Preserve source URL, record ID, title/heading, and citation fields.
- Convert records to JSONL-style rows.

## Reviewer Edge Cases

- Missing fields should become failed extraction records.
- Whitespace normalization should collapse runs but keep content.
- Provenance should survive serialization.

## Do Not Accept

- Live scraping in the required path.
- Silent skipped records.
- JSONL rows without source metadata.
