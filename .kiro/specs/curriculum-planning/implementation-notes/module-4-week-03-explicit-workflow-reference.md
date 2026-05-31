# Module 4 Phase 3 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_workflow_cases()` should read UTF-8 JSON and return the top-level `cases` list as `WorkflowCase` instances.

`classify_request()` should return:

- `refuse` when `risk_level` is `unsafe_financial_advice`
- `retrieve_then_answer` for normal cases in this lab

`build_prompt_chain_plan()` should return these step IDs for `retrieve_then_answer`:

- `inspect-request`
- `lookup-evidence`
- `draft-grounded-response`

For `refuse`, it can return:

- `inspect-request`
- `refuse-unsafe-request`

`run_evidence_tool()` should return:

- `ok=True`, output containing `2 evidence chunks`, and evidence IDs `chunk-cloud`, `chunk-supply` for `case-cited-brief`
- `ok=False`, output `No approved evidence available.`, and no evidence IDs for missing evidence

`evaluate_gate()` should return:

- `answer_with_evidence` when route is `retrieve_then_answer` and at least one tool result is ok with evidence IDs
- `abstain_missing_evidence` when route is `retrieve_then_answer` without evidence
- `refuse_unsafe_request` when route is `refuse`

`run_explicit_workflow()` should build a trace with route, steps, optional tool results, gate decision, and final response. The supported case response should contain `Based on approved evidence` and cite `chunk-cloud`.

`build_trace_summary()` should expose:

- `case_id`
- `route`
- `step_ids`
- `tool_names`
- `gate_decision`
- `final_response`
