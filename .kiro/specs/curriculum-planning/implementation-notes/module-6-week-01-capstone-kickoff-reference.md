# Module 6 Week 1 Capstone Kickoff Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`define_capstone_scope()` should define FinAgent as an educational stock-market analysis assistant. The scope should include:

- target user with educational framing
- allowed citation/source-comparison behavior
- non-goals that explicitly rule out investment recommendations
- required source types
- safety limits

`build_eval_cases()` should include at least:

- cited answer
- abstention
- invalid input
- advice refusal

`score_eval_case()` should return repeatable pass/fail evidence with the case ID, expected behavior, observed behavior, and `passed`.

`build_portfolio_evidence_ledger()` should include reviewer-checkable entries for:

- `README`
- `architecture_diagram`
- tests
- `eval_report`
- trace sample
- data provenance note
- limitations note
- demo script

The ledger proves that the capstone is a portfolio artifact, not just a code exercise.
