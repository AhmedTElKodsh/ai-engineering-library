import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_optimization_report,
    choose_retry_policy,
    estimate_batch_latency,
    estimate_call_cost,
    should_cache,
)


def test_estimate_call_cost_rounds_to_six_decimals():
    assert estimate_call_cost(1000, 500, 0.01) == 0.015


def test_estimate_batch_latency_counts_batches():
    assert estimate_batch_latency(11, batch_size=5, per_batch_ms=100) == 300


def test_should_cache_only_deterministic_meaningful_prompts():
    assert should_cache("same prompt", 0.02, True) is True
    assert should_cache("", 0.02, True) is False
    assert should_cache("creative answer", 0.02, False) is False


def test_choose_retry_policy_retries_transient_errors():
    assert choose_retry_policy("rate_limit", 1)["retry"] is True
    assert choose_retry_policy("validation", 1)["retry"] is False


def test_build_optimization_report_names_budget_actions():
    report = build_optimization_report({"cost": 12.0, "cost_budget": 10.0, "latency_ms": 900, "latency_budget_ms": 500})

    assert "reduce cost" in report["recommendations"]
    assert "reduce latency" in report["recommendations"]
