# Validation: Web Data Core Lab 2 Fixture-First Static Extraction

Scaffold: `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/workbench.py`

## Commands

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction --collect-only -q
python -m pytest curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to fixture loading, normalization, extraction, failed-record handling, or JSONL rows.

## Reviewer Checks

- Confirm fixture-only collection.
- Confirm failures are represented explicitly.
- Confirm provenance survives output conversion.
