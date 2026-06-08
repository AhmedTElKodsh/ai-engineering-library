# Reference Behavior: Web Data Core Lab 6 RAG-Ready Packaging

Scaffold: `curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/workbench.py`

## Intent

This lab should package reviewed records into citation-ready chunks and refusal rules for downstream RAG.

## Intended Behavior

- Load reviewed records while preserving quality status.
- Build chunk text from title, heading, and summary.
- Package only passing records for RAG while preserving citations.
- Build refusal rules for uncertain, stale, unsafe, or unsupported questions.
- Build package manifests with citation and source counts.

## Reviewer Edge Cases

- Failed or unreviewed records should not become RAG chunks.
- Citation metadata should survive chunk packaging.
- Refusal rules should cover finance-safety and weak-evidence cases.

## Do Not Accept

- Packaging failed records.
- Chunks without source IDs or citation URLs.
- Refusal rules that only mention generic uncertainty.
