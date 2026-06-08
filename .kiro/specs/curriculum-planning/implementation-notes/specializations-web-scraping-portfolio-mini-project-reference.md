# Reference Behavior: Web Data Portfolio Mini-Project

Scaffold: `curriculum/specializations/web-scraping/portfolio-mini-project/workbench.py`

## Intent

This project should compose the six web data core labs into one fixture-first
portfolio package with source approval, provenance, quality reporting,
RAG-ready packaging, and ethics reflection.

## Intended Behavior

- Load source approval records from the local catalog.
- Keep only approved fixture/API sources with attribution.
- Collect raw records only from approved sources.
- Normalize records without dropping source names, URLs, timestamps, tags, or citations.
- Build a quality report that counts accepted records, duplicate citations, missing provenance, stale-looking records, and unique source URLs.
- Build a portfolio package with chunk counts, citation counts, refusal rules, source URLs, quality summary, and a non-advice ethics note.

## Reviewer Edge Cases

- Unapproved source records should not enter the raw portfolio collection.
- Duplicate evidence should be counted, not silently hidden.
- Missing source URL or citation should show up as quality evidence.
- The package should include refusal rules for stale data, missing provenance, and financial advice.

## Do Not Accept

- Live scraping as the required path.
- Records without source URLs or attribution.
- Portfolio claims that imply the data is live, complete, or financial advice.
