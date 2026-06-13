"""Local deployment boundary for the FinAgent whole-game slice.

Expected time to finish: 3-5 hours.

Complete the TODOs to expose the deterministic analysis as a structured,
testable request/response flow.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class DeploymentRequest:
    """Validated request data for one FinAgent local run."""

    ticker: str
    previous_close: float
    current_price: float
    source: str


def validate_request(payload: dict) -> DeploymentRequest:
    """Validate arbitrary request data and return a typed request.

    Required fields: ticker, previous_close, current_price, source.
    """
    # TODO: check that all required fields are present.
    # TODO: normalize ticker to uppercase and require 1-5 alphabetic characters.
    # TODO: convert prices to float and require positive values.
    # TODO: require source to be a non-empty string.
    return DeploymentRequest("", 0.0, 0.0, "")


def analyze_move(request: DeploymentRequest) -> dict:
    """Analyze a validated stock movement."""
    # TODO: calculate percentage change.
    # TODO: classify movement as up, down, or flat.
    # TODO: classify risk as low, watchlist, or high volatility.
    return {}


def build_response(request: DeploymentRequest, analysis: dict) -> dict:
    """Build a structured response suitable for a future CLI/API/MCP wrapper."""
    # TODO: include ticker, analysis, summary, trace, and disclaimer fields.
    return {}


def handle_request(payload: dict) -> dict:
    """Validate, analyze, and format a local FinAgent response."""
    # TODO: compose validate_request, analyze_move, and build_response.
    return {}
