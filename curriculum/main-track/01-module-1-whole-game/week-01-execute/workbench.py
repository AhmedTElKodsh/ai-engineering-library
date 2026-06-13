"""First FinAgent slice.

Expected time to finish: 3-4 hours.

Complete the TODOs to build a deterministic stock summary. Keep the code
simple: this lesson is about making the system testable before adding LLMs.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class StockSnapshot:
    """A tiny market snapshot for one ticker."""

    ticker: str
    previous_close: float
    current_price: float
    source: str


def parse_price(raw_value: str) -> float:
    """Convert a raw price string into a positive float.

    Accept values such as "101.25" or "$101.25".
    Raise ValueError for empty, non-numeric, zero, or negative values.

    Think first:
    - What string cleanup must happen before float conversion?
    - Which invalid cases should raise instead of returning 0.0?
    """
    # TODO: strip whitespace and a leading dollar sign.
    # TODO: convert to float.
    # TODO: reject zero and negative values.
    return 0.0


def percentage_change(previous_close: float, current_price: float) -> float:
    """Return the percentage movement from previous close to current price.

    Think first:
    - Why is previous_close the denominator?
    - What would happen if previous_close were zero?
    """
    # TODO: reject previous_close <= 0 because division would be invalid.
    # TODO: calculate ((current - previous) / previous) * 100.
    return 0.0


def classify_movement(change_percent: float) -> str:
    """Classify a stock movement using simple thresholds.

    Think first:
    - Which boundary values belong to "up" and "down"?
    - Why might tiny changes be called "flat"?
    """
    # TODO: return "up" for >= 1.0, "down" for <= -1.0, otherwise "flat".
    return "flat"


def validate_ticker(ticker: str) -> str:
    """Return a normalized ticker or raise ValueError.

    Think first:
    - What should happen to lowercase or padded input?
    - Why reject symbols that do not match this lesson's simple ticker rule?
    """
    # TODO: strip whitespace and uppercase the ticker.
    # TODO: require 1-5 alphabetic characters.
    return ticker


def build_stock_summary(snapshot: StockSnapshot) -> str:
    """Build a concise, educational stock summary.

    Think first:
    - Which helper functions should this call instead of duplicating logic?
    - What information makes the answer grounded and safe?
    """
    # TODO: validate the ticker.
    # TODO: compute percentage change and movement label.
    # TODO: include the source and an educational-not-financial-advice disclaimer.
    return ""
