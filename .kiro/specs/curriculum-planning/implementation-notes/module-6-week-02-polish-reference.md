# Module 6 Week 2 Capstone Polish Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`build_demo_script()` should return at least four `DemoStep` entries covering:

- setup or run command
- safe cited answer
- abstention or refusal path
- evidence review for tests, evals, trace, or limitations

Each step should include a reviewer action, expected evidence, and risk checked.

`summarize_release_evidence(checks)` should return a dictionary with:

- `total_checks`
- `passed_checks`
- `ready_to_present`
- `blockers`

The capstone is ready only when every check passes and no blocker remains.

`write_limitation_note()` should disclose:

- source freshness or stale-data limits
- unsupported claims such as price predictions
- the investment-advice safety boundary
- concrete follow-up work

`build_interview_defense()` should include at least five concise answers covering:

- architecture
- eval design
- citation or source grounding
- safety
- next improvement or tradeoff

The intended solution should make the capstone reviewable as an engineering artifact, not just impressive as a demo.
