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

    Think first:
    - Why does risk use the size of the move instead of its direction?
    - Which exact boundary values belong to each label?
    - Should -6.0 and 6.0 produce different risk labels?
    - Which built-in function lets you compare magnitude without direction?

    Rules:
    - absolute move below 1.0% -> "low"
    - absolute move from 1.0% up to but not including 5.0% -> "watchlist"
    - absolute move 5.0% or greater -> "high volatility"
    """
    # Hint reference: hints.md#risk_label
    movement = abs(change_percent)
    if movement < 1.0:
        return "low"
    if movement < 5.0:
        return "watchlist"
    return "high volatility"


def format_percent(value: float) -> str:
    """Format a percentage with two decimal places and a trailing percent sign.

    Think first:
    - What should the reader see for whole numbers, decimals, and negatives?
    - Why should formatting stay here instead of inside the summary string?
    - Should this return a number for math, or a string for display?
    - Which formatting rule keeps every summary visually consistent?
    """
    # Hint reference: hints.md#format_percent
    return f"{value:.2f}%"


def movement_label(change_percent: float) -> str:
    """Return a simple direction label.

    Think first:
    - Which boundary values count as meaningful movement?
    - Why should small positive or negative changes still be called flat?
    - Should this use the signed value or the absolute value?
    - Which labels describe direction, not risk?
    """
    # Hint reference: hints.md#movement_label
    if change_percent >= 1.0:
        return "up"
    if change_percent <= -1.0:
        return "down"
    return "flat"


def build_risk_aware_summary(move: StockMove) -> str:
    """Build a concise educational summary with movement, risk, source, and safety text.

    Think first:
    - Which helper owns each piece of derived information?
    - What source detail keeps the answer grounded?
    - What safety phrase makes the summary educational instead of advisory?
    - Which values should be calculated before the final sentence is assembled?
    - Which facts would a reader need to audit where the summary came from?
    """
    # Hint reference: hints.md#build_risk_aware_summary
    # TODO: use the helper functions instead of recalculating labels inline.
    # TODO: include ticker, formatted percent, movement, risk label, source,
    # and a not-financial-advice disclaimer in one readable summary.
    movement = movement_label(move.change_percent)
    risk = risk_label(move.change_percent)
    percent = format_percent(move.change_percent)

    return (
        f"{move.ticker} is {movement} {percent}, "
        f"labeled {risk} based on {move.source}. "
        "This is not financial advice."
    )
