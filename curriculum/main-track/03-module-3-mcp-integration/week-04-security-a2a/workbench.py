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
    # Hint reference: hints.md#is_tool_allowed
    # TODO: Match the role policy and check the tool is explicitly allowed.
    # Hint: no matching role policy should mean no permission.
    return False


def detect_prompt_injection(text: str) -> bool:
    """Detect obvious instruction-smuggling attempts in untrusted text."""
    # Hint reference: hints.md#detect_prompt_injection
    # TODO: Detect phrases such as ignore previous instructions, reveal secrets,
    # system prompt, or exfiltrate.
    # Hint: normalize case before checking phrases so casing cannot bypass the guard.
    return False


def redact_secret_values(config: dict[str, str]) -> dict[str, str]:
    """Return config names without leaking secret values."""
    # Hint reference: hints.md#redact_secret_values
    # TODO: Replace values for keys containing key, token, secret, or password.
    # Hint: inspect key names, preserve non-secret values, and never mutate by surprise.
    return config


def build_handoff(
    from_role: str,
    to_role: str,
    task: str,
    context_summary: str,
    allowed_tools: tuple[str, ...],
) -> Handoff:
    """Create a safe role-to-role handoff object."""
    # Hint reference: hints.md#build_handoff
    # TODO: Reject empty fields and injection in task or context summary.
    # Hint: handoff text crosses a role boundary, so validate it like user input.
    return Handoff(from_role, to_role, task, context_summary, allowed_tools)


def authorize_handoff_tool_call(handoff: Handoff, call: ToolCall) -> bool:
    """Check that a receiving role stays inside the handoff boundary."""
    # Hint reference: hints.md#authorize_handoff_tool_call
    # TODO: Allow only calls by handoff.to_role using handoff.allowed_tools.
    # Hint: check both the acting role and the specific tool name.
    return False
