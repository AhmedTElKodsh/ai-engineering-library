"""Local tool server contract workbench for Module 3 Phase 2.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ToolRequest:
    """A model-facing request to call a named local tool."""

    tool_name: str
    arguments: dict[str, object]


@dataclass(frozen=True)
class ToolResponse:
    """Structured response returned by the local tool boundary."""

    ok: bool
    data: dict[str, object]
    error: str | None
    trace: dict[str, object]


@dataclass(frozen=True)
class ToolSpec:
    """A small tool contract that can be listed for clients."""

    name: str
    required_arguments: tuple[str, ...]
    description: str


def list_tools() -> list[ToolSpec]:
    """Return the narrow set of tools exposed through this boundary."""
    # Hint reference: hints.md#list_tools
    # TODO: Expose only quote_lookup and moving_average.
    # Hint: the tool list is an allowlist, not a dump of every Python function.
    return []


def quote_lookup(arguments: dict[str, object]) -> dict[str, object]:
    """Return a deterministic fake quote for a ticker."""
    # Hint reference: hints.md#quote_lookup
    # TODO: Require a non-empty ticker string and return ticker, price, currency.
    # Hint: validate the argument shape before normalizing ticker for the response.
    return {}


def moving_average(arguments: dict[str, object]) -> dict[str, object]:
    """Compute a simple moving average from recent prices."""
    # Hint reference: hints.md#moving_average
    # TODO: Require prices as numbers and window as a positive integer.
    # Hint: reject malformed inputs before calculating any average.
    # The window controls how many recent prices contribute to the result.
    return {}


def dispatch_tool(request: ToolRequest) -> ToolResponse:
    """Validate and dispatch one tool request."""
    # Hint reference: hints.md#dispatch_tool
    # TODO: Refuse unknown tools, missing arguments, and malformed arguments.
    # Return ToolResponse with ok/data/error plus trace fields.
    # Hint: this function owns routing; individual tools own their own argument checks.
    # The trace should make success and refusal paths inspectable.
    # Read the shape as: ok tells clients if it worked, data holds tool output,
    # error holds a safe explanation, and trace shows which tool path ran.
    return ToolResponse(ok=False, data={}, error=None, trace={})
