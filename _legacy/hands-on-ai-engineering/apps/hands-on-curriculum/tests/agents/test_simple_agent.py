"""Tests for SimpleAgent (OTAR loop) — src/agents/simple_agent.py."""

from __future__ import annotations

import pytest
from typing import Any, AsyncIterator

from src.agents.simple_agent import AgentState, SimpleAgent
from src.services.llm import ChatMessage, LLMProvider


class MockLLM(LLMProvider):
    """Minimal mock that returns a pre-configured sequence of responses."""

    def __init__(self, responses: list[str]) -> None:
        self._responses = iter(responses)

    async def complete(self, prompt: str, **kwargs: Any) -> str:
        return next(self._responses)

    async def chat(self, messages: list[ChatMessage], **kwargs: Any) -> str:
        return next(self._responses)

    async def stream(self, prompt: str, **kwargs: Any) -> AsyncIterator[str]:
        yield next(self._responses)

    def count_tokens(self, text: str) -> int:
        return len(text.split())


# ---------------------------------------------------------------------------
# State machine — invalid transition
# ---------------------------------------------------------------------------

def test_invalid_transition_raises():
    """VALID_TRANSITIONS rejects jumps that skip phases."""
    llm = MockLLM(responses=[])
    agent = SimpleAgent(llm=llm)
    with pytest.raises(ValueError, match="Invalid transition"):
        # Jump from IDLE directly to THINK (skipping OBSERVE)
        agent._transition_to(AgentState.THINK)


# ---------------------------------------------------------------------------
# _reflect() stop condition — false-positive resistance
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reflect_incomplete_continues():
    """INCOMPLETE/NOT COMPLETE on last line must NOT stop the loop."""
    responses = [
        "observation text",           # OBSERVE
        "thought text",               # THINK
        "action result",              # ACT
        "This task is INCOMPLETE\nCONTINUE",  # REFLECT — last line = CONTINUE
    ]
    agent = SimpleAgent(llm=MockLLM(responses=responses), max_iterations=5)
    agent._state = AgentState.IDLE
    from src.agents.simple_agent import AgentContext
    agent._context = AgentContext(task="test task", max_iterations=5)

    await agent._observe()
    await agent._think()
    await agent._act()
    reflection, should_complete = await agent._reflect()

    assert should_complete is False


@pytest.mark.asyncio
async def test_reflect_complete_stops():
    """Last line == COMPLETE must stop the loop."""
    responses = [
        "observation text",
        "thought text",
        "action result",
        "Task finished successfully.\nCOMPLETE",  # last line = COMPLETE
    ]
    agent = SimpleAgent(llm=MockLLM(responses=responses), max_iterations=5)
    agent._state = AgentState.IDLE
    from src.agents.simple_agent import AgentContext
    agent._context = AgentContext(task="test task", max_iterations=5)

    await agent._observe()
    await agent._think()
    await agent._act()
    _, should_complete = await agent._reflect()

    assert should_complete is True


# ---------------------------------------------------------------------------
# Full OTAR cycle — terminal state
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_full_otar_reaches_terminal_state():
    """Agent run() must finish in COMPLETE state given a cooperative mock."""
    # One full OTAR cycle: observe / think / act / reflect(COMPLETE)
    responses = [
        "I observed the situation.",
        "I will take action X.",
        "Action X produced result Y.",
        "The task is done.\nCOMPLETE",
    ]
    agent = SimpleAgent(llm=MockLLM(responses=responses), max_iterations=5)
    result = await agent.run("Test task")

    assert agent.state == AgentState.COMPLETE
    assert "result Y" in result
