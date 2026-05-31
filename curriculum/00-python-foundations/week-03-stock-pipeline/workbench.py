"""Stock research pipeline mini-project.

Complete the TODOs. The workbench imports cleanly, but behavior tests fail until
you implement the missing logic.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path


class StockDataError(ValueError):
    """Raised when stock data is missing or invalid."""


@dataclass(frozen=True)
class StockPrice:
    """One validated daily close price."""

    ticker: str
    date: str
    close: float
    source: str

    @classmethod
    def from_row(cls, row: dict[str, str]) -> "StockPrice":
        """Create a StockPrice from one CSV row.

        TODO:
        - require ticker, date, close, and source
        - normalize ticker to uppercase
        - require ticker to be 1-5 alphabetic characters
        - require date in YYYY-MM-DD shape
        - convert close to float
        - reject close <= 0
        """
        return cls(ticker="", date="", close=0.0, source="")


@dataclass(frozen=True)
class PipelineReport:
    """Final report data for the mini-project."""

    prices: list[StockPrice]
    metrics: dict[str, dict[str, float]]
    summary_lines: list[str]

    @property
    def ticker_count(self) -> int:
        """Return the number of tickers represented in the report."""
        # TODO: count tickers from self.metrics.
        return 0


def load_price_rows(csv_path: str | Path) -> list[StockPrice]:
    """Load and validate rows from a CSV file."""
    # TODO: open the CSV with a context manager.
    # TODO: use csv.DictReader.
    # TODO: convert each row with StockPrice.from_row.
    return []


def group_by_ticker(prices: list[StockPrice]) -> dict[str, list[StockPrice]]:
    """Group validated prices by ticker."""
    # TODO: return {"AAPL": [StockPrice, ...], ...}.
    # TODO: preserve the original row order within each ticker.
    return {}


def percentage_change(first: float, last: float) -> float:
    """Return percentage change from first to last, rounded to two decimals."""
    # TODO: reject first <= 0.
    # TODO: calculate ((last - first) / first) * 100.
    return 0.0


def moving_average(values: list[float], window: int) -> list[float]:
    """Return rolling averages rounded to two decimals."""
    # TODO: reject window <= 0.
    # TODO: return [] when there are not enough values.
    # TODO: calculate each rolling average.
    return []


def calculate_metrics(grouped: dict[str, list[StockPrice]]) -> dict[str, dict[str, float]]:
    """Calculate metrics for each ticker."""
    # TODO: for each ticker, calculate:
    # - first_close
    # - last_close
    # - change_percent
    # - average_close
    # - latest_2_day_average
    return {}


def stream_summary_lines(metrics: dict[str, dict[str, float]]):
    """Yield one human-readable summary line per ticker."""
    # TODO: yield one line per ticker with:
    # ticker, last close to 2 decimals, change percent to 2 decimals,
    # and latest 2-day average to 2 decimals.
    if False:
        yield ""


def build_report(csv_path: str | Path) -> PipelineReport:
    """Run the full local stock pipeline."""
    # TODO: load rows, group by ticker, calculate metrics, stream summary lines.
    return PipelineReport(prices=[], metrics={}, summary_lines=[])


def render_report(report: PipelineReport) -> str:
    """Render the final educational report."""
    # TODO: include a title, all summary lines, ticker count, and disclaimer.
    # The disclaimer must include the phrase "not financial advice".
    return ""
