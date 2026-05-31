# Week 03 Hints

Use these only after you have read the failing test and found the matching stock-pipeline function.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the test expectation is clear but the pipeline shape feels blurry.

## Layer 1

Follow the data path in order: raw row, validated price object, grouped prices, calculated metrics, rendered report.

Before editing, answer:

- Which stage is the failing test exercising?
- Is the function supposed to reject bad data or transform good data?
- What later stage would become unreliable if this function accepts messy input?

Fix one stage at a time and re-run the matching test.

Use this order unless the first failing test points somewhere else:

1. Validate a single CSV row.
2. Load all rows through that same validation path.
3. Group already-valid rows.
4. Calculate small metrics.
5. Stream human-readable lines.
6. Build and render the final report.

The pipeline is progressive by design. Do not patch the report to hide problems from earlier stages.

## Layer 2

### Row Validation

`StockPrice.from_row` is the gatekeeper. Normalize fields before validating them, and make bad rows fail loudly instead of leaking into later calculations.

Ticker cleanup should produce a predictable symbol. Date validation only needs the simple shape required by the lesson, not a full calendar parser.

Checkpoint before moving on: would a bad row be stopped before it can affect a metric?

### Loading And Grouping

CSV loading should convert each raw row through the same validation path. Avoid creating a second, looser interpretation of a stock row.

Grouping should preserve each price object while organizing records by ticker. Think "one key per ticker, many prices per key."

Checkpoint before moving on: can you explain why grouping should not discard date, source, or close price data?

### Calculations

Moving averages are window-based. A window should only produce an output when it has enough values.

Metrics should reuse the smaller calculation helpers. If you duplicate formulas, it becomes harder to debug which behavior is wrong.

Checkpoint before moving on: can each metric be traced back to validated prices?

### Rendering

The report is the final presentation layer. It should use the calculated metrics, include the educational disclaimer, and avoid changing the underlying data.

Checkpoint before finishing: does the report make the data understandable without pretending to give financial advice?

## Layer 3

### Reading The Tests

If a test expects an exception from a bad row, do not return a partially-filled object.

If a test checks grouped keys, inspect the ticker normalization path first.

If a test checks report text, list the required facts before changing formatting.

### Final Check

Run the focused test after each stage. When the pipeline passes end to end, run the full Week 03 file to catch interactions between validation, metrics, and rendering.
