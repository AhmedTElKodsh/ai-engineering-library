"""Local deployment boundary for the FinAgent whole-game slice.

Expected time to finish: 3-5 hours.

Complete the TODOs to expose the deterministic analysis as a structured,
testable request/response flow.
"""

from dataclasses import dataclass
import re

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

    Think first:
    - Which checks protect the rest of the flow from malformed input?
    - Which values should be normalized, and which should stay as supplied?
    - When should this function raise instead of guessing a default?
    - Which payload keys must exist before any indexing like payload["ticker"]?
    - Which returned dataclass fields should contain the validated values?
    """
    # Hint reference: hints.md#validate_request
    # TODO: check that all required fields are present before reading values.
    # Example shape: {"ticker": " msft ", "previous_close": "100",
    # "current_price": "102.5", "source": "lesson fixture"} -> DeploymentRequest.
    required_keys = {"ticker", "previous_close", "current_price", "source"}
    if not required_keys.issubset(payload.keys()):
        raise ValueError("Missing one or more required fields.")
    # TODO: normalize ticker to uppercase and require this lesson's simple ticker shape.
    ticker_val = str(payload['ticker']).upper()
    pattern = r"^[A-Z]{1,5}$"
    if not re.search(pattern, ticker_val):
        raise ValueError("Ticker must be uppercase with 1-5 alphabetic characters")
    # TODO: convert prices to numbers and reject values that cannot support percentage math.
    try:
        current_price = float(payload['current_price'])
        previous_close = float(payload['previous_close'])
    except (TypeError, ValueError):
        raise ValueError("Prices must be valid numerical values")
    if current_price <= 0 or previous_close <= 0:
        raise ValueError("Prices must be positive values")
    # TODO: require source to be usable evidence, not a missing or blank label.
    if not isinstance(payload['source'], str) or not payload['source'].strip():
        raise ValueError("source must be a non-empty string value")

    return DeploymentRequest("", 0.0, 0.0, "")


def analyze_move(request: DeploymentRequest) -> dict:
    """Analyze a validated stock movement.

    Think first:
    - What fields are already safe because validate_request handled them?
    - Which thresholds should match the earlier whole-game lessons?
    - What keys will build_response need later?
    - Prices should already be positive floats, so focus on derived values.
    - Movement uses signed percent; risk uses movement size.
    - Return data, not prose: build_response owns the human-readable wording.
    """
    # Hint reference: hints.md#analyze_move
    # TODO: calculate percentage change from the validated prices.
    # Hint: compare current_price against previous_close as the baseline.
    # Keep the sign so the next label can tell up from down.
    # Start by naming the derived percent value here.
    # Example shape: previous=100.0 and current=106.0 -> change_percent 6.0.
    percent = (request.current_price - request.previous_close) / request.previous_close

    # TODO: classify movement as up, down, or flat using the lesson thresholds.
    # Hint: this label cares about direction, so use the signed percent.
    if percent > 0:
        movement = "UP"
    elif percent < 0:
        movement = "DOWN"
    else:
        movement = "FLAT"
    # TODO: classify risk by movement size, not by whether the move is up or down.
    # Hint: this label cares about magnitude, so compare the absolute percent.
    if abs(percent) >  0.05:
        risk = "High"
    elif abs(percent) < 0.05:
        risk = "LOW"
    else:
        risk = "medium"

    return {"movement": movement, "risk": risk}



def build_response(request: DeploymentRequest, analysis: dict) -> dict:
    """Build a structured response suitable for a future CLI/API/MCP wrapper.

    Required fields: ticker, analysis, summary, trace, disclaimer.
    Trace should include operation, source, and status.

    Take the clean request plus the calculated analysis and package them into
    the shape a future caller would expect.

    This is not cloud deployment. It prepares the output so later deployment
    is easy: a CLI, API, or MCP tool can read stable fields instead of parsing
    a human sentence.

    Think first:
    - summary is for humans.
    - analysis is for code.
    - trace is for debugging.
    - disclaimer is for safety.
    """
    # Hint reference: hints.md#build_response
    # TODO: include the required top-level fields so tests and callers can inspect them.
    # Hint: keep analysis as a nested dictionary instead of spreading its keys.
    # Hint: summary is for people; ticker, analysis, and trace are for code.
    # TODO: include the non-advice safety phrase in the disclaimer.
    # Hint: trace should describe the operation, evidence source, and ok status.
    # Example shape: DeploymentRequest("MSFT", ..., "lesson fixture") plus
    # {"change_percent": 2.5, ...} -> response["ticker"] == "MSFT" and
    # response["trace"]["source"] == "lesson fixture".

    return {}


def handle_request(payload: dict) -> dict:
    """Validate, analyze, and format a local FinAgent response.

    Think first:
    - Which function should run first at the trust boundary?
    - How should data move from validation to analysis to response formatting?
    - Why is orchestration cleaner here than duplicating helper logic?
    - Each helper should receive the output of the previous helper.
    - This function should be glue, not a second copy of validation or analysis.
    """
    # Hint reference: hints.md#handle_request
    # TODO: compose the three helper functions in the same order as the docstring.
    # Example shape: raw payload -> validate_request -> analyze_move -> build_response.
    return {}
