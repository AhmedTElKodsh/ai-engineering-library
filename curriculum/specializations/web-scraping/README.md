# Web Data Acquisition for AI Systems

Mandatory core mini-course plus optional web scraping extension.

## Goal

Build ethical, testable web-data pipelines that can support AI engineering workflows such as RAG, market research, monitoring, and FinAgent source collection.

## Prerequisites

- Module 0: Python Foundations
- Basic comfort with functions, dictionaries, files, and pytest

The six core labs and portfolio mini-project are required before learners use
web-collected data for RAG, tools, agents, or FinAgent capstone evidence. Deeper
projects remain optional extension work because Course 1 should teach
responsible acquisition without turning into a full production scraping engineer
track.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. The minimum path is
six bounded labs plus the portfolio mini-project: inspect, extract from
fixtures, prefer APIs, handle pagination/retries/deduplication, report
provenance/data quality, package RAG-ready chunks, and compose one reviewable
data package.

The advanced doorway is production web data engineering: browser automation,
large crawling, scheduled refresh, monitoring, and legal review workflows. The
required bridge stays small so learners can responsibly feed AI systems without
turning Course 1 into a scraping specialization.

## Teaching Contract

Every project follows the same loop:

1. Inspect the target page or sample HTML.
2. Write extraction code yourself from TODOs.
3. Run tests against stable fixtures first.
4. Add network access only after fixture tests pass.
5. Respect robots.txt, rate limits, attribution, and site terms.
6. Record failure modes such as layout changes, missing fields, blocks, and stale data.

## Required Core Mini-Course

### Core Lab 1: HTTP and Page Inspection

Inspect URLs, query parameters, headers, status codes, HTML structure, robots.txt, sitemap.xml, and the browser network tab.

Learner output:

- page inspection note
- allowed-source checklist
- extraction target table

Status: learner scaffold available in `core-lab-01-http-inspection/`.

### Core Lab 2: Fixture-First Static Extraction

Build a scraper for stable local HTML fixtures using requests-style response handling and BeautifulSoup-style parsing.

Learner output:

- extract title, price, rating, availability, or equivalent structured fields
- test missing fields and malformed HTML
- save normalized rows as JSONL or CSV

Status: learner scaffold available in `core-lab-02-fixture-static-extraction/`.

### Core Lab 3: API-First Collection

Prefer a stable public JSON endpoint when available.

Learner output:

- collect structured records
- validate records with a schema
- store raw and cleaned outputs separately

Status: learner scaffold available in `core-lab-03-api-first-collection/`.

### Core Lab 4: Pagination, Retries, and Deduplication

Collect multiple pages without aggressive traffic.

Learner output:

- handle next-page URLs
- apply timeouts, retries, and rate limits
- deduplicate by normalized URL and content hash

Status: learner scaffold available in `core-lab-04-pagination-retries-deduplication/`.

### Core Lab 5: Provenance and Data Quality

Make the dataset reviewable.

Learner output:

- source URL, timestamp, heading, and extraction assumptions
- data-quality report
- tests for broken selectors, duplicate rows, stale data, and failed requests

Status: learner scaffold available in `core-lab-05-provenance-data-quality/`.

### Core Lab 6: RAG-Ready Packaging

Convert cleaned pages or records into chunks for downstream retrieval.

Learner output:

- chunk text with source metadata
- preserve citation fields
- explain what should be refused, flagged, or marked uncertain

Status: learner scaffold available in `core-lab-06-rag-ready-packaging/`.

## Portfolio Mini-Project

Status: learner scaffold available in `portfolio-mini-project/`.

Build a small documentation or market-context collector from local fixtures that
represent approved public sources.

Deliver:

- collector code
- fixtures and tests
- approved-source checklist
- raw dataset sample
- cleaned dataset sample
- data-quality report
- provenance table
- RAG-ready chunk output
- short ethics and production-failure reflection

## Optional Extension Project Path

### Project 1: Static Extraction

Go deeper on static extraction with additional layouts and exports.

Learner output:

- extract title, price, rating, and availability from product cards
- save normalized rows to CSV or JSON
- test missing fields and malformed HTML

### Project 2: Pagination

Extend the scraper across multiple pages.

Learner output:

- discover next-page links
- combine rows without duplicates
- stop safely when pagination ends
- test repeated pages and missing next links

### Project 3: Dynamic Content

Use browser automation for pages where content appears after JavaScript runs.

Learner output:

- wait for stable selectors
- extract rendered data
- handle timeouts clearly
- compare fixture extraction against browser extraction

### Project 4: Sessions and Forms

Practice safe session handling on demo targets.

Learner output:

- preserve cookies across requests
- submit a form
- avoid storing secrets in code
- test expired sessions and invalid credentials with fake fixtures

### Project 5: Scalable Crawling

Build a small crawler with queueing, deduplication, throttling, and exports.

Learner output:

- crawl allowed pages only
- deduplicate URLs
- apply rate limits
- export clean datasets
- document robots.txt and attribution decisions

## FinAgent Connection

The specialization feeds FinAgent with cited public context. Students should learn to prefer stable APIs when available, scrape only when appropriate, and always preserve source metadata.

## Safety Rules

- Do not scrape private data.
- Do not bypass access controls.
- Do not ignore robots.txt or site terms.
- Do not send aggressive request rates.
- Do not represent scraped data as guaranteed current.
