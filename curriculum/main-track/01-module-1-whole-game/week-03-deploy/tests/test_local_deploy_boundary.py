import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    DeploymentRequest,
    analyze_move,
    build_response,
    handle_request,
    validate_request,
)


def test_validate_request_normalizes_payload():
    request = validate_request(
        {
            "ticker": " msft ",
            "previous_close": "100",
            "current_price": "102.5",
            "source": "lesson fixture",
        }
    )

    assert request == DeploymentRequest("MSFT", 100.0, 102.5, "lesson fixture")


def test_validate_request_rejects_bad_payloads():
    bad_payloads = [
        {},
        {"ticker": "TOOLONG", "previous_close": 100, "current_price": 101, "source": "x"},
        {"ticker": "AAPL", "previous_close": 0, "current_price": 101, "source": "x"},
        {"ticker": "AAPL", "previous_close": 100, "current_price": -1, "source": "x"},
        {"ticker": "AAPL", "previous_close": 100, "current_price": 101, "source": ""},
    ]

    for payload in bad_payloads:
        try:
            validate_request(payload)
        except ValueError:
            continue
        raise AssertionError(f"validate_request should reject {payload!r}")


def test_analyze_move_returns_direction_and_risk():
    analysis = analyze_move(DeploymentRequest("MSFT", 100.0, 106.0, "fixture"))

    assert analysis["change_percent"] == 6.0
    assert analysis["movement"] == "up"
    assert analysis["risk"] == "high volatility"


def test_build_response_is_structured_and_safe():
    request = DeploymentRequest("MSFT", 100.0, 102.5, "lesson fixture")
    analysis = {"change_percent": 2.5, "movement": "up", "risk": "watchlist"}

    response = build_response(request, analysis)

    assert response["ticker"] == "MSFT"
    assert response["analysis"] == analysis
    assert "MSFT" in response["summary"]
    assert "2.50%" in response["summary"]
    assert response["trace"]["operation"] == "finagent.local_analysis"
    assert response["trace"]["source"] == "lesson fixture"
    assert "not financial advice" in response["disclaimer"].lower()


def test_handle_request_composes_full_flow():
    response = handle_request(
        {
            "ticker": "aapl",
            "previous_close": 200,
            "current_price": 199,
            "source": "lesson fixture",
        }
    )

    assert response["ticker"] == "AAPL"
    assert response["analysis"]["movement"] == "flat"
    assert response["trace"]["status"] == "ok"
