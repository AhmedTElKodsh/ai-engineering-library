import pytest

def pytest_configure(config):
    config.addinivalue_line(
        "markers", "weekly_project: marks tests as part of a weekly cumulative project"
    )
