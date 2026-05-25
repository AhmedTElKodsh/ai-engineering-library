# Web Data Acquisition AI Authoring Guide

Use this guide when creating or modifying the mandatory web data acquisition mini-course or optional web scraping extension projects.

## Track Role

The required core teaches ethical, fixture-first web/API data collection that can support RAG, research workflows, monitoring, and FinAgent source collection. The optional extension teaches deeper scraping and crawling patterns after the core gate is satisfied.

## Authoring Priorities

1. Start with stable local fixtures.
2. Add network access only after fixture tests pass.
3. Preserve source URLs, timestamps, and extraction assumptions.
4. Teach responsible target selection, robots.txt, rate limits, attribution, and terms.
5. Connect scraped data to downstream AI reliability and source grounding.

## Project Requirements

Each project needs:

- sample fixture inputs
- `workbench.py`
- tests for missing fields, malformed HTML, broken selectors, duplicates, pagination stops, stale data, failed requests, or timeouts as appropriate
- progressive hints
- a rubric with ethics and reliability criteria
- clear no-network first-success path

## Required Core Gate

Before a learner can use web-collected data in RAG, tools, agents, or FinAgent capstone work, the mini-course must show:

- approved-source checklist
- API-first decision where applicable
- local fixtures and fixture-first tests
- rate limits, retries, timeouts, and polite crawling behavior
- source URL, timestamp, heading, and provenance metadata
- raw, clean, processed, and RAG-ready output layers
- data-quality report and RAG-ready chunk sample
- short reflection on legal, ethical, privacy, and production failure assumptions

## Guardrails

- Do not scrape private data.
- Do not bypass access controls.
- Do not ignore robots.txt, rate limits, or terms.
- Do not represent scraped data as guaranteed current.
- Do not make a live website the only test source.

## Pedagogy Enforcement

Every scraping project must make the teaching style visible:

- explain scraping behavior like a knowledgeable friend at a cafe, using small HTML snippets, sketches, and real-world ethics examples
- include a useful diagram, mind map, extraction table, pagination flow, or failure map when it clarifies the learner's next action
- search the web before publishing for one current, high-quality visual or video resource for the exact parser, browser automation, scraping ethics, or data extraction topic
- add optional book/course references from `../../resources/curated-learning-resources.md` when deeper study would help
- frame the project around a data need, layout failure, missing field, or ethics decision
- ask learners to inspect fixture HTML before writing extraction code
- require a prediction about what will be extracted and what should be refused or marked missing
- make fixture test failures the first debugging evidence
- include an ethics/rate-limit/source attribution reflection
- end by connecting the scraped data to RAG, monitoring, or FinAgent source grounding

If the project jumps to live crawling before fixture reasoning and ethics, revise it before adding network code.

## Good Specialization Slice

A good slice proves extraction behavior with local fixtures first, then documents what would change for live targets.
