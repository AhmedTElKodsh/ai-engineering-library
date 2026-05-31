# Web Data Acquisition Core Lab 4 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_page_fixture()` should read UTF-8 HTML from disk.

`discover_next_page_url()` should find an anchor with `rel="next"` and resolve it against `current_url` with `urljoin`. It should return `None` on the final page.

`extract_listing_records()` should parse each `.listing-card`, extract `data-id`, `.listing-link`, and `.listing-summary`, normalize whitespace, resolve source URLs to absolute URLs, and compute a deterministic 12-character content hash from normalized title plus summary.

Expected page 1 records:

- `listing-001`
- `listing-002`
- `listing-003`

Expected page 2 records:

- duplicate of semiconductor supply content and URL
- `listing-004`

`deduplicate_records()` should keep first-seen records by `(source_url, content_hash)`, producing these IDs:

- `listing-001`
- `listing-002`
- `listing-003`
- `listing-004`

`build_fetch_plan()` should return one dictionary per URL with:

- `page_url`
- `timeout_seconds`
- `delay_before_next_seconds`
- `max_attempts` set to `3`

The last planned URL should have `delay_before_next_seconds` set to `0.0`.

`summarize_collection()` should return:

- `record_count`
- `failed_count`
- sorted `source_urls`
- `failure_reasons` counts keyed by reason
