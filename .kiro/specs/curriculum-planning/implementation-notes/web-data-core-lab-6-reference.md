# Web Data Acquisition Core Lab 6 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_reviewed_records()` should read UTF-8 JSON from disk and return the top-level `records` list as `ReviewedRecord` instances.

`build_chunk_text()` should combine title, source heading, and summary. Expected shape:

`{title}. Source section: {source_heading}. {summary}`

`package_records_for_rag()` should skip any record whose `quality_status` is not `passed`. It should split chunk text by `max_words`, preserve first-seen record order, and produce chunk IDs like `listing-001-chunk-001`.

Expected packaged record sequence with `max_words=12`:

- `listing-001`, two chunks
- `listing-002`, two chunks
- `listing-003`, two chunks

Each chunk should include:

- `chunk_id`
- `record_id`
- `text`
- `citation` as `{title} | {source_url}`
- metadata with `source_url`, `source_heading`, `collected_at`, `title`, `quality_status`, and `extraction_assumption`

`build_refusal_rules()` should return these rule IDs in order:

- `stale-data`
- `missing-provenance`
- `financial-advice`

`build_package_manifest()` should return:

- `record_count`
- `packaged_record_count`
- `chunk_count`
- `citation_count`
- `refusal_rule_ids`
- sorted unique `source_urls` from packaged chunks
