import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_prompt_chain_plan,
    build_trace_summary,
    classify_request,
    evaluate_gate,
    load_workflow_cases,
    run_evidence_tool,
    run_explicit_workflow,
)


FIXTURE = PROJECT_ROOT / "fixtures" / "workflow-cases.json"


def test_load_workflow_cases_reads_fixture_cases():
    cases = load_workflow_cases(FIXTURE)

    assert len(cases) == 3
    assert cases[0].case_id == "case-cited-brief"
    assert cases[0].available_evidence == ["chunk-cloud", "chunk-supply"]


def test_classify_request_routes_by_evidence_and_risk():
    cited_case, missing_case, risky_case = load_workflow_cases(FIXTURE)

    assert classify_request(cited_case) == "retrieve_then_answer"
    assert classify_request(missing_case) == "retrieve_then_answer"
    assert classify_request(risky_case) == "refuse"


def test_build_prompt_chain_plan_makes_steps_explicit():
    case = load_workflow_cases(FIXTURE)[0]
    steps = build_prompt_chain_plan(case, "retrieve_then_answer")

    assert [step.step_id for step in steps] == ["inspect-request", "lookup-evidence", "draft-grounded-response"]
    assert steps[0].action == "classify_intent"
    assert "Summarize cloud" in steps[0].input_text
    assert steps[-1].expected_output == "answer with citations or abstention"


def test_run_evidence_tool_returns_evidence_or_failure():
    cited_case, missing_case, _risky_case = load_workflow_cases(FIXTURE)

    ok_result = run_evidence_tool(cited_case, "cloud margin context")
    failed_result = run_evidence_tool(missing_case, "private payroll data")

    assert ok_result.ok is True
    assert ok_result.evidence_ids == ["chunk-cloud", "chunk-supply"]
    assert "2 evidence chunks" in ok_result.output
    assert failed_result.ok is False
    assert failed_result.output == "No approved evidence available."


def test_evaluate_gate_blocks_unsupported_answers():
    cited_case, missing_case, risky_case = load_workflow_cases(FIXTURE)

    assert evaluate_gate("retrieve_then_answer", [run_evidence_tool(cited_case, "cloud")]) == "answer_with_evidence"
    assert evaluate_gate("retrieve_then_answer", [run_evidence_tool(missing_case, "payroll")]) == "abstain_missing_evidence"
    assert evaluate_gate("refuse", [run_evidence_tool(risky_case, "buy signal")]) == "refuse_unsafe_request"


def test_run_explicit_workflow_returns_traceable_response():
    trace = run_explicit_workflow(load_workflow_cases(FIXTURE)[0])

    assert trace.case_id == "case-cited-brief"
    assert trace.route == "retrieve_then_answer"
    assert trace.gate_decision == "answer_with_evidence"
    assert "Based on approved evidence" in trace.final_response
    assert "chunk-cloud" in trace.final_response


def test_build_trace_summary_is_debuggable():
    trace = run_explicit_workflow(load_workflow_cases(FIXTURE)[0])

    summary = build_trace_summary(trace)

    assert summary == {
        "case_id": "case-cited-brief",
        "route": "retrieve_then_answer",
        "step_ids": ["inspect-request", "lookup-evidence", "draft-grounded-response"],
        "tool_names": ["evidence_lookup"],
        "gate_decision": "answer_with_evidence",
        "final_response": trace.final_response,
    }
