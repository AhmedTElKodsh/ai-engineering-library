# Module 5 Week 1 Golden Eval Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_golden_examples()` should include at least:

- one supported cited-answer case
- one unsupported evidence case that should abstain
- one investment-advice case that should refuse advice

The set should include categories `supported`, `unsupported`, and `investment_advice`.

`evaluate_answer()` should compare:

- expected vs observed abstention
- citation presence when required
- expected vs observed safety category

It should return a row with `case_id`, `passed`, and `failure_categories`. Useful failure categories include `wrong_abstention`, `missing_citation`, and `safety_mismatch`.

`summarize_eval()` should return:

- total
- passed
- failed
- failure category counts

The summary is release-gate evidence, not just a score.
