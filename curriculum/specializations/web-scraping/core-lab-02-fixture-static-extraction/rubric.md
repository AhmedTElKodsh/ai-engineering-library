# Rubric

| Category | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Extraction | Extracts all valid cards and rejects broken cards with reasons | Extracts valid cards | Silently drops or invents data |
| Provenance | Preserves source URL, collected timestamp, and assumptions | Preserves source URL | Loses citation fields |
| Testing | Handles malformed HTML and missing fields | Handles the fixture happy path | Depends on live pages |
| RAG Readiness | Emits clean text suitable for chunking | Emits mostly usable text | Emits unreviewable records |
