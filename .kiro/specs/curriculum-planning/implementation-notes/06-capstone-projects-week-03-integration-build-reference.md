# Reference Behavior: Module 6 Week 3 Runnable FinAgent Integration Build

Scaffold: `curriculum/06-capstone-projects/week-03-integration-build/workbench.py`

## Intent

This milestone should turn the scoped FinAgent capstone into a deterministic
local workflow that a reviewer can run before live LLM, tool, or deployment work
is added.

## Intended Behavior

- Load market snapshot fixtures and preserve ticker, company, prices, currency, and timestamp.
- Load cited evidence chunks from fixture data.
- Validate requests by normalizing tickers and refusing malformed or investment-advice prompts.
- Retrieve cited fixture evidence by ticker and simple keyword overlap.
- Compose an educational brief with movement, citations, uncertainty, and non-advice language.
- Run the workflow with trace steps for validation, loading, retrieval, composition, and refusal.

## Reviewer Edge Cases

- Advice requests should refuse before retrieval or answer composition.
- Malformed tickers should produce invalid-input evidence.
- Briefs should not include uncited claims from outside the fixtures.
- Success and refusal paths should both produce reviewable trace steps.

## Do Not Accept

- Live finance APIs as the required path.
- Trading recommendations or unsupported price predictions.
- A successful answer without citations.
- Hidden workflow decisions with no trace.
