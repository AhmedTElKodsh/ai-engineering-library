# Day 5 - HTTP/API-First Data Acquisition

Deliverable: raw/clean data boundaries and ingestion tests

Calendar date: Thursday 2026-06-18
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Collect or simulate external data while keeping raw and clean layers separate.
Use a fixture-first path. Prefer stable APIs only when setup takes less than 60
minutes and the access terms are clear.

## Read Or Trace

Required:

- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/`
- `curriculum/specializations/web-scraping/core-lab-03-api-first-collection/`

Optional if blocked or ahead:

- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/`
- `curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication/`

## Data Access Guardrails

- source terms or usage assumptions are written down
- no API keys, cookies, or secrets are committed
- fixture fallback exists even if a live source works
- raw response is small enough to inspect
- no production scraping at scale

If no live source is appropriate, simulate the external response with a fixture
and document the assumption.

## Build

- raw response save path
- parser that converts raw input into clean records
- malformed response and missing-field handling

## Required Tests

- fixture-backed happy path
- malformed response
- missing field
- duplicate record where relevant, if dedupe is part of the minimum project

## Minimum Path

- one raw fixture
- one parser
- one clean record shape
- two failure tests

## Stretch

- timeout behavior for live API access
- retry behavior
- pagination
- richer duplicate handling

## Before You Run

Which fields must survive from raw input into the clean record?

## Evidence First

Inspect the raw fixture, response headers, source terms, or first parser failure
before changing ingestion code.

## Smallest Change

Preserve one raw input and parse one clean record before adding retries,
pagination, or deduplication.

## Explain Like A Teammate

Why do raw and clean data need to stay separate?

## One Step Stronger

Add one malformed response, missing-field case, or duplicate-record case after
the happy path works.

## Evidence To Capture

- source choice or fixture assumption
- raw fixture path
- clean record example
- failure handling examples
- final test command

## Done Criteria

Done when raw input is preserved and cleaned output is validated separately.

## Do Not Do Today

- scrape production sites at scale
- ignore source terms
- commit secrets
- treat raw external text as clean project data
