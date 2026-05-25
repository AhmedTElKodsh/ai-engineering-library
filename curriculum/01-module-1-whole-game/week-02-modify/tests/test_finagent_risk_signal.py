import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    StockMove,
    build_risk_aware_summary,
    format_percent,
    risk_label,
)


def test_risk_label_uses_absolute_movement():
    assert risk_label(0.25) == "low"
    assert risk_label(-0.99) == "low"
    assert risk_label(1.0) == "watchlist"
    assert risk_label(-3.5) == "watchlist"
    assert risk_label(5.0) == "high volatility"
    assert risk_label(-8.0) == "high volatility"


def test_format_percent_uses_two_decimals():
    assert format_percent(2.5) == "2.50%"
    assert format_percent(-0.125) == "-0.12%"


def test_build_risk_aware_summary_is_grounded_and_safe():
    move = StockMove(ticker="AAPL", change_percent=5.25, source="lesson fixture")

    summary = build_risk_aware_summary(move)

    assert "AAPL" in summary
    assert "up" in summary
    assert "5.25%" in summary
    assert "high volatility" in summary
    assert "lesson fixture" in summary
    assert "not financial advice" in summary.lower()
