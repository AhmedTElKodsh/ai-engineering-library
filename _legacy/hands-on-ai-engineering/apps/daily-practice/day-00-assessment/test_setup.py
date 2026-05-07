"""Environment verification — run this first to confirm your setup works."""
import sys
import pytest


def test_python_version():
    """Verify Python 3.10+ is installed."""
    assert sys.version_info >= (3, 10), (
        f"Python 3.10+ required. "
        f"You have Python {sys.version_info.major}.{sys.version_info.minor}. "
        "Hint: Install Python 3.10 or later from python.org"
    )


def test_pytest_version():
    """Verify pytest 7+ is installed."""
    major = int(pytest.__version__.split(".")[0])
    assert major >= 7, (
        f"pytest 7+ required. "
        f"You have pytest {pytest.__version__}. "
        "Hint: Run 'pip install pytest>=7.0' to upgrade"
    )
