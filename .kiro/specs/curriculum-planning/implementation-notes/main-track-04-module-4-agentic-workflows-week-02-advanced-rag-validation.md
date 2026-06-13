# Validation: Module 4 Phase 2 Citation And Abstention RAG

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag --collect-only -q
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag -q
```

## Expected Starter State

Collection should succeed. TODO failures should point to chunk loading, term normalization, retrieval, answer construction, abstention, or trace behavior.

## Reviewer Checks

- Confirm supported and unsupported queries are both tested.
- Confirm citations are non-empty only for supported answers.
- Confirm trace fields expose matched terms and sources.
