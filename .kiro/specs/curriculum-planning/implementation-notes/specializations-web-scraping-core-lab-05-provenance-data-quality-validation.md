# Validation: Web Data Core Lab 5 Provenance And Data Quality

Scaffold: `curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/workbench.py`

## Commands

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality --collect-only -q
python -m pytest curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to fixture loading, normalization, provenance table, issue detection, or quality summary.

## Reviewer Checks

- Confirm duplicates, stale records, missing fields, and short records are tested.
- Confirm RAG readiness is blocked when quality issues exist.
- Confirm provenance fields are preserved.
