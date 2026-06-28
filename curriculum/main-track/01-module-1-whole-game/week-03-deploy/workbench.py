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
    # TODO: check that all required fields are present before reading values.
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
    except:
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
    # TODO: calculate percentage change from the validated prices.
    # Hint: compare current_price against previous_close as the baseline.
    # Keep the sign so the next label can tell up from down.
    # Start by naming the derived percent value here.

    # TODO: classify movement as up, down, or flat using the lesson thresholds.
    # Hint: this label cares about direction, so use the signed percent.


    # TODO: classify risk by movement size, not by whether the move is up or down.
    # Hint: this label cares about magnitude, so compare the absolute percent.


    return {}



def build_response(request: DeploymentRequest, analysis: dict) -> dict:
    """Build a structured response suitable for a future CLI/API/MCP wrapper.

    Required fields: ticker, analysis, summary, trace, disclaimer.
    Trace should include operation, source, and status.

    Think first:
    - Which fields are machine-readable, and which are human-readable?
    - How can the trace explain where the answer came from?
    - What safety text should always travel with the response?
    - Which fields should tests and future wrappers inspect without parsing text?
    - Which trace values explain operation, evidence source, and success status?
    """
    # TODO: include the required top-level fields so tests and callers can inspect them.
    # TODO: include the non-advice safety phrase in the disclaimer.
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
    # TODO: compose the three helper functions in the same order as the docstring.
    return {}
