# Web Data Acquisition Core Lab 3 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_api_fixture()` should read UTF-8 JSON from disk and return a dictionary.

`validate_api_item()` should require these non-empty fields:

- `id`
- `symbol`
- `headline`
- `summary`
- `source_url`
- `published_at`

`collect_api_records()` should preserve payload-level `endpoint` and `collected_at` on every clean record. It should return two clean records and one failed record for the provided fixture.

Expected clean records:

- `api-001`, symbol `AAPL`
- `api-002`, symbol `MSFT`

Expected failed record:

- `api-003` with a reason containing `symbol`

`build_api_collection_report()` should return:

- `clean_count`
- `failed_count`
- sorted unique `symbols`
- `failure_reasons` counts keyed by missing/invalid field name
