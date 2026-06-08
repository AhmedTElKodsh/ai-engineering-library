"""Root pytest configuration for Module 0 Python Foundations."""


def pytest_configure(config):
    """Register custom markers."""
    config.addinivalue_line(
        "markers", "weekly_project: marks tests as part of a weekly cumulative project"
    )
