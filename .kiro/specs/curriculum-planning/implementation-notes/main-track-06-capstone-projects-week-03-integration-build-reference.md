# Reference Behavior: Module 6 Week 3 Runnable FinAgent Integration Build

Scaffold: `curriculum/main-track/06-capstone-projects/week-03-integration-build/workbench.py`

## Intent

This scaffold is the cumulative learner-owned FinAgent application across
Milestone 1. It should start deterministic, then add fixture-provider,
evaluation, grounded retrieval, tool/workflow, HTTP, operations, and transfer
evidence without becoming a second project.

## Intended Behavior

- Load market snapshot fixtures and preserve ticker, company, prices, currency, and timestamp.
- Produce a useful deterministic market summary before retrieval or provider behavior exists.
- Load cited evidence chunks from fixture data.
- Validate requests by normalizing tickers and refusing malformed or investment-advice prompts.
- Retrieve cited fixture evidence by ticker and simple keyword overlap.
- Compose an educational brief with movement, citations, uncertainty, and non-advice language.
- Run the workflow with trace steps for validation, loading, retrieval, composition, and refusal.
- Validate structured fixture-provider output and reject invented citations.
- Retry only transient provider failures and stop after two attempts.
- Load ten representative evaluation cases and report diagnostic failure categories.
- Dispatch only an approved, read-only quote tool and deny unknown authority.
- Compose the cumulative workflow with visible termination and evidence labels.
- Expose health and brief behavior over a real loopback HTTP adapter.
- Record latency, token, cost, fixture/live, and limitation evidence.

## Reviewer Edge Cases

- Advice requests should refuse before retrieval or answer composition.
- Malformed tickers should produce invalid-input evidence.
- Briefs should not include uncited claims from outside the fixtures.
- Success and refusal paths should both produce reviewable trace steps.
- Invalid provider output should fail closed without citations.
- Unknown or unapproved tools should return no data.
- Provider retry must terminate at the documented ceiling.
- HTTP validation errors should be structured 4xx responses.
- Fixture evidence must never be described as live-provider or hosted proof.

## Do Not Accept

- Live finance APIs as the required path.
- Trading recommendations or unsupported price predictions.
- A successful answer without citations.
- Hidden workflow decisions with no trace.
- Unbounded retry, tool execution, or agent autonomy.
- In-process service dictionaries presented as real HTTP evidence.
- Passing tests treated as proof of independent learner transfer.
