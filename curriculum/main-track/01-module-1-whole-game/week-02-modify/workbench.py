"""FinAgent risk-signal extension.

Expected time to finish: 2-3 hours.

Complete the TODOs to add a simple risk label to the deterministic stock
summary. Keep this local and testable before later modules add external tools.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class StockMove:
    """A normalized market move for one ticker."""

    ticker: str
    change_percent: float
    source: str


def risk_label(change_percent: float) -> str:
    """Classify movement magnitude as a simple educational risk label.

    Rules:
    - absolute move below 1.0% -> "low"
    - absolute move from 1.0% up to but not including 5.0% -> "watchlist"
    - absolute move 5.0% or greater -> "high volatility"
    """
    # TODO: use absolute movement so up and down moves share thresholds.
    # TODO: return the correct label for each threshold.
    return "low"


def format_percent(value: float) -> str:
    """Format a percentage with two decimal places."""
    # TODO: return a string like "2.50%".
    return ""


def movement_label(change_percent: float) -> str:
    """Return a simple direction label."""
    if change_percent >= 1.0:
        return "up"
    if change_percent <= -1.0:
        return "down"
    return "flat"


def build_risk_aware_summary(move: StockMove) -> str:
    """Build a concise educational summary with movement and risk."""
    # TODO: use movement_label, risk_label, and format_percent.
    # TODO: include ticker, source, and a not-financial-advice disclaimer.
    return ""
