import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import build_error_response, handle_service_request, health_check, validate_service_request  # noqa: E402


def test_health_check_returns_service_metadata():
    health = health_check()

    assert health["status"] == "ok"
    assert "service" in health
    assert "version" in health


def test_validate_service_request_normalizes_ticker():
    req = validate_service_request({"ticker": " aapl ", "question": "What changed?"})

    assert req.ticker == "AAPL"
    assert req.question == "What changed?"


def test_validate_service_request_refuses_advice():
    try:
        validate_service_request({"ticker": "AAPL", "question": "Should I buy?"})
    except ValueError as exc:
        assert "advice" in str(exc).lower()
    else:
        raise AssertionError("investment advice request should be refused")


def test_build_error_response_is_structured():
    response = build_error_response("bad input", 422)

    assert response["ok"] is False
    assert response["status_code"] == 422
    assert response["error"] == "bad input"


def test_handle_service_request_returns_success_trace():
    response = handle_service_request({"ticker": "MSFT", "question": "Summarize risk"})

    assert response["ok"] is True
    assert response["ticker"] == "MSFT"
    assert response["trace"]["operation"] == "finagent.service_request"
