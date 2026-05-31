# Hints: Core Lab 1

Use these only after you have read the failing test and identified the inspection artifact it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the inspection exists but does not yet support a clear collection decision.

## Layer 1

This lab is about deciding whether a source should be collected, not about scraping as much as possible.

Before editing, answer:

- Is this test about structured inspection fields, allow/block decision, source policy, or extraction targets?
- What evidence supports the decision?
- Which fields would a later collector need?

## Layer 2

### Structured Inspection

Start with the dataclass fields. A complete inspection is a structured note, not a paragraph.

Normalize decisions to booleans and short reasons so later code does not need to parse prose.

### Source Decision

An allowed source needs more than HTTP success. Look for robots or terms review, attribution, and a bounded collection plan.

If the source is not suitable, make the reason explicit enough for a reviewer to understand.

### Extraction Targets

Extraction targets should include both content fields and provenance fields such as source URL and collection timestamp.

## Layer 3

### Reading The Tests

If a decision test fails, compare the evidence fields before changing the final boolean.

If a target-field test fails, list the downstream record fields that need to be populated.

If text feels too narrative, convert it into structured fields and short reasons.

### Final Check

Review the inspection as a go/no-go note. A teammate should be able to tell whether collection is allowed and what exactly would be collected.
