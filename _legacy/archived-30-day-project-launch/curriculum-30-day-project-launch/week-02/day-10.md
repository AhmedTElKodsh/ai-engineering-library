# Day 10 - Embeddings And Similarity

Deliverable: cosine similarity or simple retrieval implementation

Calendar date: Tuesday 2026-06-23
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Understand retrieval mechanics before adding a vector database. The goal is a
tiny, reproducible ranking system that exposes IDs, scores, and metadata.

## Read Or Trace

Required:

- `curriculum/main-track/02-module-2-first-principles/week-02-embeddings/`

Optional if blocked or ahead:

- Module 2 tokenization notes

## Build

- deterministic embedding fixture or simple bag-of-terms vectorizer
- cosine similarity
- ranking function over a tiny local corpus
- empty-corpus and no-match behavior
- retrieval result shape with `chunk_id` or `record_id`, score, and source
  metadata

## Required Tests

- relevant result ranks ahead of weaker result
- empty corpus returns no result or a clear error
- tie behavior is deterministic
- irrelevant query produces low score or no usable evidence
- result includes the ID and metadata Day 11/12 will use for citations

## Minimum Path

- local corpus of 3-5 records
- deterministic vector or embedding fixture
- ranking tests
- reusable retrieval result contract

## Stretch

- provider-backed embedding adapter behind the same interface
- configurable top-k

## Before You Run

Which record should rank first for the sample query, and why?

## Evidence First

Inspect the tiny corpus, vector representation, or first ranking mismatch before
changing retrieval logic.

## Smallest Change

Rank one relevant record ahead of one weaker record before adding top-k settings
or provider-backed embeddings.

## Explain Like A Teammate

What does similarity find well, and what can it miss?

## One Step Stronger

Add one empty-corpus, tie, or irrelevant-query case after the basic ranking
works.

## Evidence To Capture

- sample corpus path or fixture
- sample query
- expected top result
- tie behavior
- final test command

## Done Criteria

Done when retrieval can rank a tiny local corpus reproducibly.

## Do Not Do Today

- add a vector database before retrieval behavior is clear
- hide ranking scores from traces
- rely on a non-deterministic external embedding call for required tests
