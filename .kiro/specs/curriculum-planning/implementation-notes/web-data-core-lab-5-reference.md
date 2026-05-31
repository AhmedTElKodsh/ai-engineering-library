# Web Data Acquisition Core Lab 5 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_records_fixture()` should read UTF-8 JSON from disk and return the top-level `records` list.

`normalize_source_record()` should trim text fields, preserve provenance fields, and compute a deterministic 12-character content hash from normalized title plus summary when no hash is present.

Required provenance fields:

- `source_url`
- `source_heading`
- `collected_at`
- `extraction_assumption`

`build_provenance_table()` should return dictionaries containing:

- `record_id`
- `source_url`
- `source_heading`
- `collected_at`
- `extraction_assumption`

`find_quality_issues()` should produce:

- `listing-002-copy`: `duplicate`
- `listing-003`: `stale`
- `listing-004`: `missing_provenance`
- `listing-005`: `weak_summary`

Use the ISO date portion of `collected_at` when comparing age against `reference_date`.

`summarize_quality_report()` should return:

- `record_count`
- `issue_count`
- `ready_for_rag`
- `issue_counts`
- sorted unique `reviewed_source_urls`

`ready_for_rag` should be `False` when any quality issue exists.
