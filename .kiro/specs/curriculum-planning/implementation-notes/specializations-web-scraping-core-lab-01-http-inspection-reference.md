# Reference Behavior: Web Data Core Lab 1 HTTP And Page Inspection

Scaffold: `curriculum/specializations/web-scraping/core-lab-01-http-inspection/workbench.py`

## Intent

This lab should teach source inspection before collection: permission, structure, citation fields, and allowed-source decisions.

## Intended Behavior

- Build page inspection records complete enough for review.
- Decide whether a source can be used based on permission and structure.
- Build extraction target tables that preserve citation fields.

## Reviewer Edge Cases

- Permission missing or disallowed should block use.
- Pages without stable structure should be marked risky.
- Citation fields should include source URL or equivalent provenance.

## Do Not Accept

- Scraping before source-use decision.
- Ignoring permission or robots/source policy notes.
- Extraction targets without citation metadata.
