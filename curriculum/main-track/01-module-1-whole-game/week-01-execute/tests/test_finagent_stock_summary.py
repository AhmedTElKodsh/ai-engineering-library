import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    StockSnapshot,
    build_stock_summary,
    classify_movement,
    parse_price,
    percentage_change,
    validate_ticker,
)


def test_parse_price_accepts_plain_and_dollar_values():
    assert parse_price("101.25") == 101.25
    assert parse_price(" $42.50 ") == 42.50


def test_parse_price_rejects_invalid_values():
    for raw_value in ["", "abc", "0", "-4.5"]:
        try:
            parse_price(raw_value)
        except ValueError:
            continue
        raise AssertionError(f"parse_price should reject {raw_value!r}")


def test_percentage_change_calculates_market_move():
    assert percentage_change(100.0, 105.0) == 5.0
    assert percentage_change(100.0, 97.5) == -2.5


def test_percentage_change_rejects_zero_previous_close():
    try:
        percentage_change(0.0, 105.0)
    except ValueError:
        return
    raise AssertionError("previous_close of zero should raise ValueError")


def test_classify_movement_uses_simple_thresholds():
    assert classify_movement(1.0) == "up"
    assert classify_movement(0.25) == "flat"
    assert classify_movement(-1.0) == "down"


def test_validate_ticker_normalizes_and_rejects_bad_symbols():
    assert validate_ticker(" aapl ") == "AAPL"

    for ticker in ["", "TOOLONG", "BRK.B", "123"]:
        try:
            validate_ticker(ticker)
        except ValueError:
            continue
        raise AssertionError(f"validate_ticker should reject {ticker!r}")


def test_build_stock_summary_is_grounded_and_safe():
    snapshot = StockSnapshot(
        ticker="msft",
        previous_close=100.0,
        current_price=102.5,
        source="sample lesson data",
    )

    summary = build_stock_summary(snapshot)

    assert "MSFT" in summary
    assert "up" in summary
    assert "2.50%" in summary
    assert "sample lesson data" in summary
    assert "not financial advice" in summary.lower()
