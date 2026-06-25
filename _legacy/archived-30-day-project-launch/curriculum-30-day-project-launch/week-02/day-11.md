# Day 11 - Chunking And Metadata

Deliverable: chunked documents with source metadata and bad-record tests

Calendar date: Wednesday 2026-06-24
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Split records without losing citation context. Every retrievable chunk must
point back to its source record.

## Read Or Trace

Required:

- `curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/`

Optional if blocked or ahead:

- Week 1 processed-record evidence

## Build

- chunker for processed Week 1 records
- stable chunk IDs
- source ID, URL or file, title/heading, and timestamp propagation
- bad-record handling

## Required Tests

- normal document chunks preserve metadata
- empty document is rejected or reported
- missing source metadata fails safely
- duplicate chunk IDs are handled or rejected

## Minimum Path

- one chunking strategy
- one metadata propagation rule
- tests for empty text and missing source

## Stretch

- overlap policy
- chunk-size version note
- chunk quality report

## Before You Run

Which metadata field would make citations impossible if it were lost?

## Evidence First

Inspect one processed record and the resulting chunk metadata before changing
the chunker.

## Smallest Change

Create stable chunks for one valid record before tuning overlap or chunk size.

## Explain Like A Teammate

How does chunking change the data without breaking provenance?

## One Step Stronger

Add one empty-document, missing-source, or duplicate-ID case after normal
metadata propagation works.

## Evidence To Capture

- processed input example
- chunk output example
- propagated metadata fields
- bad-record failure example
- final test command

## Done Criteria

Done when every retrievable chunk points back to its source record.

## Do Not Do Today

- drop source metadata during chunking
- optimize chunk size before citations are reliable
- use generated summaries as a substitute for source-grounded chunks
