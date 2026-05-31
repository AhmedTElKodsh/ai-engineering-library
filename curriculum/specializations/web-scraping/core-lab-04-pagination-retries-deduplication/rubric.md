# Rubric: Core Lab 4

| Criterion | Strong Evidence |
| --- | --- |
| Pagination | Finds an explicit next link and stops cleanly when no next link exists. |
| Extraction | Preserves record ID, title, source URL, page URL, and content hash. |
| Deduplication | Removes repeated source/content pairs while preserving first-seen order. |
| Politeness | Fetch plan includes timeout, retry, and delay metadata before live requests. |
| Reliability | Summary reports records, failed fetches, source URLs, and failure reasons. |
| Reflection | Explains why pagination increases both coverage and data-quality risk. |
