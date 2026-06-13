# Final Capstone Assessment Checklist

Use this checklist after Week 2 polish and the integration build. It is for a
reviewer, mentor, or learner doing a final self-check before presenting the
Course 1 capstone.

## Review Gate

| Area | Required evidence | Status |
|---|---|---|
| Scope | README names included behavior and non-goals | Not checked |
| Run command | Reviewer can run tests or demo from a clean checkout | Not checked |
| Input safety | Bad tickers, malformed requests, and advice requests are handled | Not checked |
| Source grounding | Cited outputs map to real fixture evidence or retrieved chunks | Not checked |
| Abstention/refusal | Unsupported claims or unsafe advice requests do not produce confident answers | Not checked |
| Eval evidence | Golden or integration tests include happy path and failure cases | Not checked |
| Traceability | Output includes enough trace data to debug route, evidence, or refusal decisions | Not checked |
| Release evidence | Pass/fail/blocker status is summarized before portfolio claims | Not checked |
| Limitations | Freshness, coverage, safety, and model/system limits are explicit | Not checked |
| Interview defense | Learner can explain architecture, tradeoffs, evals, safety, and next work | Not checked |

## Minimum Passing Standard

The capstone is Course 1 ready when all of these are true:

- A reviewer can run at least one verification command without guessing paths.
- The project demonstrates one safe success path and one safe refusal or
  abstention path.
- At least one output is connected to source evidence or trace data.
- Release evidence includes tests or evals, not only screenshots or prose.
- The limitation note makes the finance safety boundary visible.
- The learner can defend why the design is appropriately small.

## Strong Portfolio Standard

A strong capstone also includes:

- a concise architecture diagram
- a demo script with commands and expected reviewer observations
- explicit pass/fail counts from the latest run
- failure categories for invalid input, missing evidence, unsafe request, and
  trace/release blockers
- version notes for prompt, dataset, model/provider boundary, or index fixtures
- a STAR-style explanation backed by artifacts

## Stop And Revise If

- The system gives investment advice.
- Claims cannot be traced to source evidence.
- The demo hides failing tests or release blockers.
- The README promises hosted production behavior that was not built.
- The project adds advanced features while basic refusal, citation, or eval
  evidence is missing.
