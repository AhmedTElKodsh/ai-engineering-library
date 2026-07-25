"""Local service boundary workbench for Module 5 Week 3."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ServiceRequest:
    ticker: str
    question: str


def health_check() -> dict[str, str]:
    """Return service health metadata."""
    # Hint reference: hints.md#health_check
    # TODO: Return status, service, and version.
    # Hint: health data should be small, stable, and safe to expose.
    return {}


def validate_service_request(payload: dict) -> ServiceRequest:
    """Validate a local API-style request payload."""
    # Hint reference: hints.md#validate_service_request
    # TODO: Require ticker and question, normalize ticker, and reject advice requests.
    # Hint: this is the API trust boundary; normalize only after required fields exist.
    return ServiceRequest("", "")


def handle_service_request(payload: dict) -> dict[str, object]:
    """Return a structured success or error response."""
    # Hint reference: hints.md#handle_service_request
    # TODO: Validate, return success with trace, or error with safe status code.
    # Hint: success and failure should have predictable shapes for clients.
    # Think of this as the later FastAPI route body without importing FastAPI yet:
    # validate first, then return either ok data or the same error shape every time.
    return {}


def build_error_response(message: str, status_code: int = 400) -> dict[str, object]:
    """Return a consistent error response."""
    # Hint reference: hints.md#build_error_response
    # TODO: Include ok=False, status_code, error, and trace.
    # Hint: error responses should be useful without leaking internals.
    # The caller should never need to parse message text to know this failed.
    return {}
