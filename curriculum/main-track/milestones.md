# Main Track Milestones

Use these gates on Days 7, 14, 21, 28, and 30. If a milestone does not pass in
the review window, cut stretch scope before expanding the 30-day core.

## Shared Review Rule

Every milestone must show:

- runnable technical evidence
- at least one failure, limit, refusal, or rejected input
- a short explanation of the tradeoff
- a transfer note for FinAgent or another practical AI system

## Day 7: Deterministic Assistant

Ready to continue when:

- local input is validated before processing
- one deterministic workflow runs from a documented command
- tests cover normal and bad-input behavior
- logs, README, or notes state known limits
- no LLM behavior is required for the baseline to be useful

## Day 14: Cited Q&A System

Ready to continue when:

- provider behavior is isolated behind a mockable boundary
- prompts and outputs have schemas or regression checks
- retrieval can rank a small corpus reproducibly
- answers cite retrieved evidence or abstain
- eval output distinguishes retrieval, citation, refusal, and formatting issues

## Day 21: Bounded AI Workflow

Ready to continue when:

- tools have typed input and output contracts
- tool routing uses explicit allowlists and failure handling
- workflow state is visible in a trace or log
- verifier and retry behavior have stop conditions
- safety/refusal behavior is documented with examples

## Day 28: Production-Shaped Local App

Ready to continue when:

- the project has one documented runnable boundary
- versioning and cache assumptions are written down
- logs or traces expose request, retrieval, tool, model, verification, and final status where relevant
- one local quality gate gives a clear pass/fail signal
- demo and failure analysis cover happy path, edge case, and refusal or abstention

## Day 30: Portfolio Defense

Complete when:

- setup and demo commands work as written
- the portfolio explains problem, architecture, evidence, limits, and next steps
- the learner can defend what is deterministic, what is model-dependent, and what is still mock-only
- the next backlog separates follow-up fixes from extended concepts
- the project claims local educational readiness, not unsupported production readiness

