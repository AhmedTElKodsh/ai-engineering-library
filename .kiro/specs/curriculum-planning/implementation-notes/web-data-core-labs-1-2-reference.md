# Web Data Acquisition Core Labs 1-2 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

## Core Lab 1

`build_sample_inspection()` should return one public, HTML, inspected market-context source with:

- HTTPS URL
- `status_code == 200`
- HTML content type
- non-empty title
- `robots_reviewed == True`
- `terms_reviewed == True`
- at least one useful selector

`decide_source_use()` should allow only sources that meet the HTTP, content, permission-review, title, and selector checks. Allowed decisions should include polite limits such as bounded pages, attribution, and rate limiting. Blocked decisions should explain the failed checks.

`extraction_target_table()` should include at least `title`, `body`, `source_url`, and `collected_at`, with a short purpose for each field.

## Core Lab 2

`load_fixture_html()` should read the fixture with UTF-8.

`normalize_text()` should collapse whitespace without changing capitalization.

`extract_market_notes()` should parse local `article.note` cards. Valid cards need `data-source-id`, `h2`, `a[href]`, and `.summary`. Missing required fields become `FailedExtraction` rows with useful reasons.

Expected fixture behavior:

- two valid records
- one failed record for `broken-card`
- record IDs follow `{source_id}-001` order
- every clean record preserves source URL, timestamp, and extraction assumptions

`records_to_jsonl_rows()` should convert dataclasses to dictionaries without dropping provenance.
