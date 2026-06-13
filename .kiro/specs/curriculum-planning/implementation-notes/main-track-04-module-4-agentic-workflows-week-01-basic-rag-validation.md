# Validation: Module 4 Phase 1 AI-Ready Ingestion And Chunking

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag --collect-only -q
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to normalization, metadata, record preparation, chunking, or reporting.

## Reviewer Checks

- Confirm bad records produce evidence.
- Confirm chunks preserve citation metadata.
- Confirm output contains clean records, failures, chunks, and report.
