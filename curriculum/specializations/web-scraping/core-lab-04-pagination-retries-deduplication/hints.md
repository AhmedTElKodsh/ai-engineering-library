# Hints: Core Lab 4

Use these only after you have read the failing test and identified the pagination or quality stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when records are extracted but pagination, deduplication, or reporting fails.

## Layer 1

Follow the crawler path in order: load fixture page, find next page, extract listings, deduplicate records, summarize quality.

Before editing, answer:

- Is this test about fixture loading, next-link detection, listing extraction, duplicate handling, or reporting?
- Which URL should be considered the base for relative links?
- What makes two records duplicates?

## Layer 2

### Fixture And Pagination

Load page fixtures as HTML text accurately enough for tests to find headings and listing cards.

For pagination, look for the page's explicit next-link signal and resolve relative links against the current page URL.

### Extraction

Extract each listing from its own card. Keep ID, link, title, summary, and any provenance fields the tests require.

Normalize whitespace before comparing or hashing content.

### Deduplication And Reporting

Deduplicate by stable source identity plus normalized content. Keep the first record when duplicates appear.

The summary is a compact quality gate. It should make failures visible instead of hiding them behind a clean count.

## Layer 3

### Reading The Tests

If pagination fails, inspect relative URL handling before extraction.

If duplicate counts are wrong, compare normalized identity fields rather than raw text.

If report tests fail, add the missing count or issue category without changing extraction.

### Final Check

Run loader and pagination tests before deduplication tests. The final report should reflect the records the crawler actually accepted or rejected.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
