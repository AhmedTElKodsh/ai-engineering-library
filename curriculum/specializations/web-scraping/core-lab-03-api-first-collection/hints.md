# Hints: Core Lab 3

Use these only after you have read the failing test and identified the API-collection stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when local fixture loading works but cleaning or failure handling does not.

## Layer 1

Load the JSON fixture first. Do not design around live HTTP until the local schema is clear.

Before editing, answer:

- Is this test about fixture loading, required fields, clean-record shape, failed-record shape, or strictness?
- Which raw fields are required for downstream use?
- Should this item become clean or failed?

## Layer 2

### API Fixture Shape

Treat the fixture as the source of truth for this lab. Keep raw payload interpretation local and deterministic.

Required fields should be checked before creating a clean record.

### Clean Records

The clean layer should be smaller and stricter than the raw payload. Keep fields that downstream lessons need for content and provenance.

Avoid preserving random raw noise in the clean record unless the lab contract asks for it.

### Failed Records

Malformed API items should become failed records with a reason. API data can be messy too.

Failure handling should not prevent other valid items from being collected.

## Layer 3

### Reading The Tests

If clean counts are wrong, classify each fixture item by required fields.

If a clean record lacks provenance, inspect the mapping from raw field to clean field.

If failed records are vague, add a stable reason rather than dumping the raw item.

### Final Check

Run fixture and cleaning tests before report tests. The collector should produce strict clean data and visible failures without live network calls.
