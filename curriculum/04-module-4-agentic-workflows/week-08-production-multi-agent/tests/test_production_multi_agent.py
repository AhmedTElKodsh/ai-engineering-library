import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    AgentAction,
    AgentPolicy,
    MultiAgentTrace,
    append_action,
    authorize_action,
    build_agent_run_report,
    should_stop,
)


POLICIES = {"researcher": AgentPolicy("researcher", ["retrieve", "summarize"], 2)}


def test_authorize_action_requires_allowed_tool_and_reason():
    assert authorize_action(AgentAction("researcher", "retrieve", "need evidence"), POLICIES) is True
    assert authorize_action(AgentAction("researcher", "trade", "buy"), POLICIES) is False
    assert authorize_action(AgentAction("researcher", "retrieve", ""), POLICIES) is False


def test_should_stop_at_step_limit_or_stopped_reason():
    policy = POLICIES["researcher"]

    assert should_stop(MultiAgentTrace([AgentAction("researcher", "retrieve", "x")] * 2), policy) is True
    assert should_stop(MultiAgentTrace(stopped_reason="policy_refusal"), policy) is True


def test_append_action_refuses_unauthorized_tool():
    trace = append_action(MultiAgentTrace(), AgentAction("researcher", "trade", "buy"), POLICIES)

    assert trace.stopped_reason == "unauthorized_action"
    assert trace.actions == []


def test_append_action_stops_after_max_steps():
    trace = MultiAgentTrace([AgentAction("researcher", "retrieve", "x")] * 2)
    updated = append_action(trace, AgentAction("researcher", "summarize", "finish"), POLICIES)

    assert updated.stopped_reason == "max_steps_reached"


def test_build_agent_run_report_lists_tools_agents_and_stop_reason():
    trace = MultiAgentTrace([AgentAction("researcher", "retrieve", "x")], "done")
    report = build_agent_run_report(trace)

    assert report["action_count"] == 1
    assert report["tools_used"] == ["retrieve"]
    assert report["agents"] == ["researcher"]
    assert report["stopped_reason"] == "done"
