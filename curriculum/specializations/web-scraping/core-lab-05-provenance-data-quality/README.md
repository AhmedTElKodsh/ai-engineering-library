# Core Lab 5: Provenance and Data Quality

## Learning Goal

Make a collected dataset reviewable before it becomes retrieval or agent context.

**Expected time to finish:** 3-4 hours

## Real-World Context

A scraper can "work" and still produce data that should not feed an AI system. Records may be duplicated, stale, too thin, or missing the source assumptions a reviewer needs. This lab turns cleaned records into a provenance table and a data-quality report before Module 4 packages anything for RAG.

## Visual Map

```mermaid
flowchart LR
    A["Collected records fixture"] --> B["Normalize records"]
    B --> C["Provenance table"]
    B --> D["Quality checks"]
    D --> E["Issue list"]
    C --> F["Quality report"]
    E --> F
    F --> G["RAG gate"]
```

## Evidence First

Run:

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/tests -v
```

The first run should collect cleanly and fail on TODO behavior in `workbench.py`.

## Learner Outputs

| Artifact | Purpose |
| --- | --- |
| Normalized source records | Keep source URL, heading, timestamp, assumptions, and content hash together. |
| Provenance table | Give humans a compact review surface before retrieval. |
| Quality issue list | Flag duplicate, stale, missing-provenance, and weak-summary records. |
| Quality report | Decide whether the dataset is ready for RAG packaging. |

## Module 4 Handoff

Only records that pass this gate should become chunk candidates. Module 4 can retrieve from cleaner context because the web-data mini-course has already made provenance and failure modes explicit.

## Cafe Visual Break

- Reference: [ISO 8601 date/time examples](https://www.w3.org/TR/NOTE-datetime) - use consistent timestamps when comparing freshness.
- Reference: [Python hashlib documentation](https://docs.python.org/3/library/hashlib.html) - use stable hashes to detect duplicate content.
