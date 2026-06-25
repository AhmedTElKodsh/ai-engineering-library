# Day 6 - Cleaning, Provenance, And RAG-Ready Records

Deliverable: processed JSONL-style records with metadata

Calendar date: Friday 2026-06-19
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Convert collected data into records that Week 2 can chunk, embed, retrieve, and
cite. The project should produce RAG-ready records without using a model.

## Read Or Trace

Required:

- `curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/`
- `curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/`

Optional if blocked or ahead:

- Module 4 AI-ready data notes

## Build

Each processed record should include:

- stable `id`
- `source_url` or `source_file`
- `retrieved_at` or fixture date
- title or heading
- cleaned text
- provenance metadata
- freshness or stale-source marker where relevant

## Required Tests

- missing metadata is rejected
- empty text is rejected
- duplicate IDs are handled
- stale source markers are preserved

## Minimum Path

- one JSONL-style processed record format
- required provenance fields
- tests for missing metadata and empty text

## Stretch

- duplicate ID resolution
- stale-source policy
- quality report summary

## Before You Run

Which metadata field will Week 2 need for citations?

## Evidence First

Inspect one clean record and one rejected bad record before changing the
processed-record format.

## Smallest Change

Produce one valid JSONL-style record with required provenance before adding a
quality report or duplicate-resolution policy.

## Explain Like A Teammate

What makes this record ready for retrieval but not yet an answer?

## One Step Stronger

Add one missing-metadata, empty-text, duplicate-ID, or stale-source case after
the valid record path works.

## Evidence To Capture

- processed record example
- rejected bad record example
- metadata fields
- final test command
- known citation risk

## Done Criteria

Done when the project can produce RAG-ready records without using a model.

## Do Not Do Today

- add embeddings before records are clean
- lose citation metadata during cleaning
- use the model to summarize or repair records
