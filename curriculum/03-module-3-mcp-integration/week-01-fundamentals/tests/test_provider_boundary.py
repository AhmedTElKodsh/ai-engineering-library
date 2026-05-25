import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    FakeProvider,
    Message,
    PromptTemplate,
    call_provider,
    estimate_cost,
    estimate_tokens,
    render_prompt,
    validate_messages,
)


def test_validate_messages_accepts_chat_roles():
    messages = [
        Message("system", "Answer with structured JSON."),
        Message("user", "Summarize AAPL risk."),
    ]

    assert validate_messages(messages) == messages


def test_validate_messages_rejects_empty_or_unknown_roles():
    try:
        validate_messages([Message("tool", "hidden call")])
    except ValueError as error:
        assert "role" in str(error)
    else:
        raise AssertionError("validate_messages should reject unknown roles")


def test_render_prompt_records_template_version_and_variables():
    template = PromptTemplate(
        name="risk-summary",
        version="v1",
        body="Summarize {ticker} risk using {source_count} sources.",
    )

    message = render_prompt(template, {"ticker": "AAPL", "source_count": "3"})

    assert message.role == "user"
    assert "AAPL" in message.content
    assert "3 sources" in message.content
    assert "risk-summary@v1" in message.content


def test_estimate_tokens_and_cost_are_deterministic():
    assert estimate_tokens("AAPL beats revenue estimates") == 4
    assert estimate_tokens("   ") == 0
    assert estimate_cost(250, price_per_1k_tokens=0.002) == 0.0005


def test_call_provider_validates_before_calling_and_records_trace():
    provider = FakeProvider("AAPL risk is revenue concentration.")
    messages = [Message("user", "Summarize AAPL risk.")]

    response = call_provider(messages, provider, model="fake-model", price_per_1k_tokens=0.002)

    assert response.content == "AAPL risk is revenue concentration."
    assert provider.calls == [messages]
    assert response.trace["model"] == "fake-model"
    assert response.trace["input_tokens"] > 0
    assert response.trace["output_tokens"] > 0
    assert response.trace["estimated_cost"] > 0
