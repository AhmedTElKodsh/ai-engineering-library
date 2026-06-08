# Validation: Web Data Core Lab 6 RAG-Ready Packaging

Scaffold: `curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/workbench.py`

## Commands

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging --collect-only -q
python -m pytest curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to reviewed-record loading, chunk text, packaging, refusal rules, or manifest behavior.

## Reviewer Checks

- Confirm failed records are skipped.
- Confirm citations and source counts are preserved.
- Confirm refusal rules cover uncertain and unsafe questions.
