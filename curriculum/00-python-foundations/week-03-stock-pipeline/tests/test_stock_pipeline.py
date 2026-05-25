import sys
from pathlib import Path

import pytest

PROJECT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    PipelineReport,
    StockDataError,
    StockPrice,
    build_report,
    calculate_metrics,
    group_by_ticker,
    load_price_rows,
    moving_average,
    percentage_change,
    render_report,
    stream_summary_lines,
)


DATA_PATH = PROJECT_DIR / "data" / "sample_prices.csv"


def test_stock_price_from_row_validates_and_normalizes():
    price = StockPrice.from_row(
        {"ticker": " aapl ", "date": "2026-05-01", "close": "190.50", "source": "fixture"}
    )

    assert price.ticker == "AAPL"
    assert price.date == "2026-05-01"
    assert price.close == 190.50
    assert price.source == "fixture"


@pytest.mark.parametrize(
    "row",
    [
        {"ticker": "", "date": "2026-05-01", "close": "190.50", "source": "fixture"},
        {"ticker": "TOOLONG", "date": "2026-05-01", "close": "190.50", "source": "fixture"},
        {"ticker": "BRK.B", "date": "2026-05-01", "close": "190.50", "source": "fixture"},
        {"ticker": "AAPL", "date": "05-01-2026", "close": "190.50", "source": "fixture"},
        {"ticker": "AAPL", "date": "2026-05-01", "close": "0", "source": "fixture"},
        {"ticker": "AAPL", "date": "2026-05-01", "close": "abc", "source": "fixture"},
    ],
)
def test_stock_price_from_row_rejects_bad_data(row):
    with pytest.raises(StockDataError):
        StockPrice.from_row(row)


def test_load_price_rows_uses_csv_fixture():
    rows = load_price_rows(DATA_PATH)

    assert len(rows) == 6
    assert rows[0].ticker == "AAPL"
    assert rows[-1].ticker == "MSFT"


def test_group_by_ticker_preserves_rows():
    rows = [
        StockPrice("AAPL", "2026-05-01", 100.0, "fixture"),
        StockPrice("MSFT", "2026-05-01", 200.0, "fixture"),
        StockPrice("AAPL", "2026-05-02", 110.0, "fixture"),
    ]

    grouped = group_by_ticker(rows)

    assert list(grouped) == ["AAPL", "MSFT"]
    assert [p.close for p in grouped["AAPL"]] == [100.0, 110.0]


def test_percentage_change_rounds_and_rejects_bad_first_value():
    assert percentage_change(100.0, 105.125) == 5.12

    with pytest.raises(StockDataError):
        percentage_change(0.0, 105.0)


def test_moving_average_calculates_rolling_windows():
    assert moving_average([10.0, 20.0, 30.0], 2) == [15.0, 25.0]
    assert moving_average([10.0], 2) == []

    with pytest.raises(StockDataError):
        moving_average([10.0], 0)


def test_calculate_metrics_for_each_ticker():
    rows = load_price_rows(DATA_PATH)
    metrics = calculate_metrics(group_by_ticker(rows))

    assert metrics["AAPL"]["first_close"] == 190.0
    assert metrics["AAPL"]["last_close"] == 192.0
    assert metrics["AAPL"]["change_percent"] == 1.05
    assert metrics["MSFT"]["latest_2_day_average"] == 427.1


def test_stream_summary_lines_is_a_generator():
    metrics = {
        "AAPL": {
            "last_close": 192.0,
            "change_percent": 1.05,
            "latest_2_day_average": 192.9,
        }
    }

    stream = stream_summary_lines(metrics)

    assert iter(stream) is stream
    assert list(stream) == ["AAPL: last close 192.00, change 1.05%, 2-day average 192.90"]


def test_build_and_render_report():
    report = build_report(DATA_PATH)

    assert isinstance(report, PipelineReport)
    assert report.ticker_count == 2
    assert len(report.summary_lines) == 2

    rendered = render_report(report)

    assert "Stock Research Summary" in rendered
    assert "AAPL" in rendered
    assert "MSFT" in rendered
    assert "2 tickers" in rendered
    assert "not financial advice" in rendered.lower()
