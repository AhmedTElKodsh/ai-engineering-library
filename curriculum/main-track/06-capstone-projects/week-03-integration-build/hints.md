# Hints: Milestone 1 Cumulative FinAgent Application

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and identified which
workflow stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are
stuck. Use Layer 3 when the workflow runs but citations, refusals, or trace
evidence still fail.

## Layer 1

This milestone is a workflow, not a new finance system. Keep every step small,
deterministic, and reviewable.

Before editing, answer:

- Is this failure about fixture loading, request validation, retrieval, brief composition, refusal, or trace?
- What evidence should survive into the final result?
- Should this request be answered or refused?

## Layer 2

### Validation

Ticker validation can be simple: uppercase alphabetic symbols in a small length
range. Advice-seeking language should trigger refusal before retrieval.

### Retrieval

Use direct text matching against fixture chunks. This milestone tests evidence
flow, not embedding quality. Rank before slicing to `max_chunks`; otherwise the
context budget can discard the strongest evidence. Use `chunk_id` to make equal
scores deterministic. Record why production semantic retrieval would need a
separate measured evaluation rather than claiming this overlap score is an
embedding.

### Brief Composition

The brief should include movement, a grounded interpretation, citations,
uncertainty, and non-advice language. Do not invent facts outside the fixtures.

### Trace

Each major step should leave a short trace item: validation, data loading,
retrieval, safety, and composition or refusal.

## Layer 3

### Reading The Tests

If advice requests are answered, move safety earlier in the workflow.

If citations are missing, inspect retrieval output before changing the brief.

If an unsupported question produces an answer, make the empty-retrieval branch
abstain before composition, provider, or tool execution.

If trace assertions fail, check whether both success and refusal paths record
reviewable steps.

### Final Check

A reviewer should be able to run one command, see a cited educational brief, and
see a refusal for investment advice without guessing which gate made the choice.

## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the
failing test name, assertion message, malformed fixture, missing field, unsafe
output, weak citation, or unclear trace. Write one sentence about what the
failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### load_market_snapshot

**Layer 1:** Read the UTF-8 JSON and map every required field into the typed
snapshot.

**Layer 2:** Treat fixture data as external input even though it is local.
Ticker shape, positive prices, and non-empty company/currency/timestamp fields
must be checked before returning.

**Layer 3:** Raise a `ValueError` that names the invalid field. Do not let a
zero price reach movement calculations and fail somewhere less understandable.

### build_deterministic_summary

**Layer 1:** This is the Block 1 output. It uses only the typed snapshot—no
evidence retrieval, model, tool, or service.

**Layer 2:** Percentage movement uses `previous_close` as the denominator.
Preserve the sign for direction and format the displayed price/percentage
without changing the underlying values.

**Layer 3:** Include the timestamp and non-advice wording so the deterministic
baseline already has provenance and safety boundaries. Later brief composition
can reuse this behavior instead of recalculating it differently.

### load_evidence_chunks

**Layer 1:** Treat the JSON file as untrusted input. Require a `chunks` list and
turn each complete record into an `EvidenceChunk`.

**Layer 2:** A chunk needs non-empty identity, ticker, text, citation, and
collection timestamp fields. Preserve tags without using them as provenance.

**Layer 3:** Reject the fixture at this boundary when citation provenance is
missing. Later composition cannot repair or safely invent a source.

### validate_request

Use this hint entry for `validate_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### retrieve_evidence

Use this hint entry for `retrieve_evidence`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### compose_finagent_brief

Use this hint entry for `compose_finagent_brief`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### run_finagent_workflow

Use this hint entry for `run_finagent_workflow`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### call_provider_with_retry

**Layer 1:** Keep the retry loop at the provider boundary. Count calls and catch
only the explicitly retryable error.

**Layer 2:** Treat returned content and citations as untrusted structured data.
Both must have the expected types, and content cannot be blank.

**Layer 3:** Every returned citation must already exist in the deterministic
brief. Stop after `max_attempts`; invalid structured output should fail closed
rather than become an answer.

### load_evaluation_cases

**Layer 1:** Inspect `fixtures/evaluation_cases.json` and the `EvaluationCase`
fields before parsing.

**Layer 2:** The fixture root contains `cases`. Preserve each request and all
four expected-behavior fields.

**Layer 3:** Validate the shape while loading so a malformed eval fixture fails
at the boundary instead of producing a misleading score.

### dispatch_tool

**Layer 1:** Decide authority before looking at arguments: only
`quote_lookup` exists.

**Layer 2:** Approval is required even for the allowed tool. Unknown and
unapproved calls return structured denials with no data.

**Layer 3:** The requested ticker must match the already loaded snapshot. Return
only ticker, price, currency, and timestamp—never paths, secrets, or environment
values.

### run_milestone_application

**Layer 1:** Compose existing boundaries; do not reimplement validation,
retrieval, provider, or tool logic here.

**Layer 2:** The safe order is deterministic workflow, refusal/abstention stop,
optional tool gate, provider boundary, then final metrics.

**Layer 3:** Add a short `WorkflowStep` for each boundary. Metrics must label
fixture mode and `live_provider_verified=False`; actual fixture cost is zero
even when you estimate a hypothetical live cost. Record measured `latency_ms`
separately from `input_tokens_estimated`, `output_tokens_estimated`, and
`estimated_live_cost_usd`. If the tool is unapproved or denied, return that
status without calling the provider.

### run_evaluation

**Layer 1:** Run the same application for every case. Do not special-case case
IDs in production logic.

**Layer 2:** Compare status, required citations, and abstention separately so
one result can report more than one failure category.

**Layer 3:** Return total, passed, failed, and a list containing each failed case
ID plus its `failure_categories`. A score without diagnostic categories is not
useful; run the changed-expectation test to catch hardcoded pass totals.

### service_health

Return stable service name/version fields plus fixture/live evidence labels.
Health means the local adapter can respond; it does not mean a live provider or
hosted deployment is healthy.

### handle_service_request

**Layer 1:** Treat the payload as untrusted. Require an object, then validate
ticker, question, optional tool name, and boolean approval.

**Layer 2:** Convert the payload to `FinAgentRequest` and, when requested, a
`ToolCall`. Let `run_milestone_application` own application behavior.

**Layer 3:** Malformed shapes are boundary failures with a 4xx status. A valid
advice refusal is an application response, not malformed HTTP input.

**Layer 3:** Serialize dataclasses into JSON-safe dictionaries. Malformed input
uses a 4xx response; refusal and abstention are successful application outcomes
with explicit statuses.

## Checkpoint Recovery Rule

If a later checkpoint fails because an earlier TODO is incomplete, return to
the earliest failing focused command. Do not patch the later orchestration
function to hide a broken validation, retrieval, provider, or tool boundary.
