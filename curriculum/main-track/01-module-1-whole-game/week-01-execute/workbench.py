"""First FinAgent slice.

Expected time to finish: 3-4 hours.

Complete the TODOs to build a deterministic stock summary. Keep the code
simple: this lesson is about making the system testable before adding LLMs.
"""
import re
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
    - Which input examples in the tests are valid prices, and which are traps?
    - Should cleanup change the number itself, or only remove display characters?
    """
    # Hint reference: hints.md#parse_price
    # TODO: strip whitespace and a leading dollar sign.
    if isinstance(raw_value, float):
        raise ValueError("The input must be a string")
    val = raw_value.strip().lstrip('$')
    if not val:
        raise ValueError("The string cannot be empty")
    
    # TODO: convert to float.
    try:
        val = float(val)
    except ValueError:
        raise ValueError("Invalid price format.")
    # TODO: reject zero and negative values.
    if val <= 0:
        raise ValueError("The number is less than or equal to zero.")
    return val


def percentage_change(previous_close: float, current_price: float) -> float:
    """Return the percentage movement from previous close to current price.

    Think first:
    - Why is previous_close the denominator?
    - What would happen if previous_close were zero?
    - Which value is the baseline and which value is the new observation?
    - Does the sign of the result need to survive for later movement labeling?
    """
    # Hint reference: hints.md#percentage_change
    # TODO: reject previous_close <= 0 because division would be invalid.
    if previous_close <= 0:
        raise ValueError("The dominantor must be positive")
    if current_price <= 0:
        raise ValueError("The numerator must be positive")
    # TODO: calculate ((current - previous) / previous) * 100.
    return ((current_price - previous_close) / previous_close) * 100


def classify_movement(change_percent: float) -> str:
    """Classify a stock movement using simple thresholds.

    Think first:
    - Which boundary values belong to "up" and "down"?
    - Why might tiny changes be called "flat"?
    - Are 1.0 and -1.0 inside the movement buckets or still flat?
    - Does this function care about dollars, or only an already-computed percent?
    """
    # Hint reference: hints.md#classify_movement
    # TODO: return "up" for >= 1.0, "down" for <= -1.0, otherwise "flat".
    if change_percent >= 1.0:
        return "up"
    elif change_percent <= -1.0:
        return "down"
    return "flat"


def validate_ticker(ticker: str) -> str:
    """Return a normalized ticker or raise ValueError.

    Think first:
    - What should happen to lowercase or padded input?
    - Why reject symbols that do not match this lesson's simple ticker rule?
    - Which operation normalizes learner-friendly input before the shape check?
    - Which characters would make downstream summaries look less trustworthy?
    """
    # Hint reference: hints.md#validate_ticker
    # TODO: strip whitespace and uppercase the ticker.
    # TODO: require 1-5 alphabetic characters.
    ticker = ticker.strip().upper()
    pattern = r"^[A-Z]{1,5}$"
    if not bool(re.match(pattern, ticker)):
        raise ValueError("Invalid ticker: " + ticker)
    return ticker



def build_stock_summary(snapshot: StockSnapshot) -> str:
    """Build a concise, educational stock summary.

    Think first:
    - Which helper functions should this call instead of duplicating logic?
    - What information makes the answer grounded and safe?
    - Why should an empty source be rejected instead of printed?
    - Which fields come from the snapshot, and which values are derived?
    - Which phrase protects the summary from sounding like trading advice?
    """
    # Hint reference: hints.md#build_stock_summary
    # TODO: validate the ticker.
    # TODO: compute percentage change and movement label.
    # TODO: reject a missing or blank source before building the summary.
    # TODO: include the source and an educational-not-financial-advice disclaimer.

    ticker = validate_ticker(snapshot.ticker)
    change_percent = percentage_change(snapshot.previous_close, snapshot.current_price)
    movement = classify_movement(change_percent)
    if snapshot.source == "":
        raise ValueError("Invalid source")
        
    summary = f"""
    Ticker: {ticker}
    Previous Close: ${snapshot.previous_close:.2f}
    Current Price: ${snapshot.current_price:.2f}
    Percentage Change: {change_percent:.2f}%
    Movement: {movement}
    Source: {snapshot.source}
    This is educational and not financial advice.
    """
    return summary



    
