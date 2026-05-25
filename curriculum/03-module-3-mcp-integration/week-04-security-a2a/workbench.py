"""Secure MCP and agent handoff workbench for Module 3 Phase 4.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class PermissionPolicy:
    """Allowed tools for one assistant role."""

    role: str
    allowed_tools: tuple[str, ...]


@dataclass(frozen=True)
class ToolCall:
    """A proposed tool call that must pass permission checks."""

    role: str
    tool_name: str
    arguments: dict[str, object]


@dataclass(frozen=True)
class Handoff:
    """Minimal context passed from one assistant role to another."""

    from_role: str
    to_role: str
    task: str
    context_summary: str
    allowed_tools: tuple[str, ...]


def is_tool_allowed(call: ToolCall, policies: list[PermissionPolicy]) -> bool:
    """Return whether the role may call the requested tool."""
    # TODO: Match the role policy and check the tool is explicitly allowed.
    return False


def detect_prompt_injection(text: str) -> bool:
    """Detect obvious instruction-smuggling attempts in untrusted text."""
    # TODO: Detect phrases such as ignore previous instructions, reveal secrets,
    # system prompt, or exfiltrate.
    return False


def redact_secret_values(config: dict[str, str]) -> dict[str, str]:
    """Return config names without leaking secret values."""
    # TODO: Replace values for keys containing key, token, secret, or password.
    return config


def build_handoff(
    from_role: str,
    to_role: str,
    task: str,
    context_summary: str,
    allowed_tools: tuple[str, ...],
) -> Handoff:
    """Create a safe role-to-role handoff object."""
    # TODO: Reject empty fields and injection in task or context summary.
    return Handoff(from_role, to_role, task, context_summary, allowed_tools)


def authorize_handoff_tool_call(handoff: Handoff, call: ToolCall) -> bool:
    """Check that a receiving role stays inside the handoff boundary."""
    # TODO: Allow only calls by handoff.to_role using handoff.allowed_tools.
    return False
