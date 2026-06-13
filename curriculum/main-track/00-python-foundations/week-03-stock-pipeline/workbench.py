"""Stock research pipeline mini-project.

Complete the TODOs. The workbench imports cleanly, but behavior tests fail until
you implement the missing logic.
"""

from __future__ import annotations

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
        
        CONCEPT CLARIFICATION:
        A factory method that validates and transforms raw CSV data.
        
        Input: {"ticker": "aapl", "date": "2024-01-15", "close": "150.25", "source": "yahoo"}
        Output: StockPrice(ticker="AAPL", date="2024-01-15", close=150.25, source="yahoo")
        
        Validation checklist:
        1. All required keys exist? Raise StockDataError if missing
        2. Ticker is 1-5 letters? Use .isalpha() and len() checks
        3. Date format? Check it has 2 dashes and matches YYYY-MM-DD pattern
        4. Close is positive number? Convert to float, check > 0
        
        Pattern:
        - Check each requirement
        - Raise StockDataError with descriptive message on failure
        - Return cls(ticker=..., date=..., close=..., source=...)
        
        Tip: Use try/except for float conversion to catch ValueError
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
    
    # CONCEPT CLARIFICATION:
    # Moving average = average of the last N values, sliding along.
    #
    # Example walk-through: moving_average([10, 20, 30, 40], 2)
    #
    # We need 2 values to compute each average (window=2)
    #
    # Position 0: Take items[0:2] = [10, 20]
    #   - Average: (10 + 20) / 2 = 15.0
    #
    # Position 1: Take items[1:3] = [20, 30]
    #   - Average: (20 + 30) / 2 = 25.0
    #
    # Position 2: Take items[2:4] = [30, 40]
    #   - Average: (30 + 40) / 2 = 35.0
    #
    # Result: [15.0, 25.0, 35.0]
    #
    # Another example: moving_average([5, 10, 15, 20, 25], 3)
    #
    # Position 0: [5, 10, 15] → (5+10+15)/3 = 10.0
    # Position 1: [10, 15, 20] → (10+15+20)/3 = 15.0
    # Position 2: [15, 20, 25] → (15+20+25)/3 = 20.0
    # Result: [10.0, 15.0, 20.0]
    #
    # Key insight: You need at least `window` values to compute one average.
    # If len(values) < window, return []
    #
    # Pattern:
    # - Loop from 0 to (len(values) - window + 1)
    # - For each position i, take slice values[i:i+window]
    # - Calculate: sum(slice) / window
    # - Round to 2 decimals
    return []


def calculate_metrics(grouped: dict[str, list[StockPrice]]) -> dict[str, dict[str, float]]:
    """Calculate metrics for each ticker."""
    # TODO: for each ticker, calculate:
    # - first_close
    # - last_close
    # - change_percent
    # - average_close
    # - latest_2_day_average
    
    # CONCEPT CLARIFICATION:
    # Aggregate statistics from a list of StockPrice objects per ticker.
    #
    # Input: {"AAPL": [price1, price2, price3, ...], "GOOGL": [...]}
    # Output: {
    #   "AAPL": {
    #     "first_close": 150.0,
    #     "last_close": 155.0,
    #     "change_percent": 3.33,
    #     "average_close": 152.5,
    #     "latest_2_day_average": 154.0
    #   },
    #   "GOOGL": {...}
    # }
    #
    # For each ticker's price list:
    # - first_close: prices[0].close
    # - last_close: prices[-1].close
    # - change_percent: use percentage_change(first, last)
    # - average_close: sum all closes / count, round to 2
    # - latest_2_day_average: use moving_average on all closes, take last value
    #
    # Pattern: Loop through grouped.items(), build metrics dict for each ticker
    return {}


def stream_summary_lines(metrics: dict[str, dict[str, float]]):
    """Yield one human-readable summary line per ticker."""
    # TODO: yield one line per ticker with:
    # ticker, last close to 2 decimals, change percent to 2 decimals,
    # and latest 2-day average to 2 decimals.
    
    # CONCEPT CLARIFICATION:
    # A generator function that produces formatted strings one at a time.
    #
    # Input: {"AAPL": {"last_close": 155.0, "change_percent": 3.33, "latest_2_day_average": 154.0}}
    # Output (via yield): "AAPL: $155.00 (3.33%) | 2-day avg: $154.00"
    #
    # Why yield instead of return?
    # - Memory efficient for large datasets
    # - Caller can process one line at a time
    # - Common pattern for pipelines and streaming
    #
    # Pattern:
    # - Loop through metrics.items()
    # - Format: f"{ticker}: ${last_close:.2f} ({change_percent:.2f}%) | 2-day avg: ${latest_2_day_average:.2f}"
    # - Use yield (not return!)
    #
    # Note: The `if False: yield ""` is just to make function valid without implementation
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
