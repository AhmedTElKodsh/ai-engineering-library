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
    # TODO: Expose only quote_lookup and moving_average.
    return []


def quote_lookup(arguments: dict[str, object]) -> dict[str, object]:
    """Return a deterministic fake quote for a ticker."""
    # TODO: Require a non-empty ticker string and return ticker, price, currency.
    return {}


def moving_average(arguments: dict[str, object]) -> dict[str, object]:
    """Compute a simple moving average from recent prices."""
    # TODO: Require prices as numbers and window as a positive integer.
    return {}


def dispatch_tool(request: ToolRequest) -> ToolResponse:
    """Validate and dispatch one tool request."""
    # TODO: Refuse unknown tools, missing arguments, and malformed arguments.
    # Return ToolResponse with ok/data/error plus trace fields.
    return ToolResponse(ok=False, data={}, error=None, trace={})
