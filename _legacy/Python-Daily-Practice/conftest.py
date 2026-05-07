"""Root conftest.py for Python Daily Practice curriculum."""
import pytest


def pytest_configure(config):
    """Register custom markers."""
    config.addinivalue_line(
        "markers", "weekly_project: marks tests as part of a weekly cumulative project"
    )
