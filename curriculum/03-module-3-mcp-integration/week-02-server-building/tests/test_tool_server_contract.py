import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    ToolRequest,
    ToolResponse,
    dispatch_tool,
    list_tools,
    moving_average,
    quote_lookup,
)


def test_list_tools_exposes_only_named_contracts():
    specs = list_tools()

    assert [spec.name for spec in specs] == ["quote_lookup", "moving_average"]
    assert specs[0].required_arguments == ("ticker",)


def test_quote_lookup_requires_ticker_and_returns_structured_quote():
    quote = quote_lookup({"ticker": "AAPL"})

    assert quote["ticker"] == "AAPL"
    assert quote["price"] > 0
    assert quote["currency"] == "USD"


def test_moving_average_uses_latest_window():
    result = moving_average({"prices": [10, 20, 30, 40], "window": 3})

    assert result["window"] == 3
    assert result["average"] == 30.0


def test_dispatch_tool_returns_structured_success_with_trace():
    response = dispatch_tool(ToolRequest("quote_lookup", {"ticker": "MSFT"}))

    assert isinstance(response, ToolResponse)
    assert response.ok is True
    assert response.error is None
    assert response.data["ticker"] == "MSFT"
    assert response.trace["tool_name"] == "quote_lookup"
    assert response.trace["allowed"] is True


def test_dispatch_tool_refuses_unknown_tool_without_executing():
    response = dispatch_tool(ToolRequest("read_env", {"name": "API_KEY"}))

    assert response.ok is False
    assert "unknown" in response.error.lower()
    assert response.trace["allowed"] is False


def test_dispatch_tool_refuses_missing_required_argument():
    response = dispatch_tool(ToolRequest("quote_lookup", {}))

    assert response.ok is False
    assert "ticker" in response.error
