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

    assert validate_messages(messages) == messages, (
        "Valid system/user messages should pass through unchanged so the provider "
        "boundary preserves chat-role intent."
    )


def test_validate_messages_rejects_empty_or_unknown_roles():
    try:
        validate_messages([Message("tool", "hidden call")])
    except ValueError as error:
        assert "role" in str(error), (
            "The validation error should name the role problem so learners can "
            "debug malformed provider messages."
        )
    else:
        raise AssertionError("validate_messages should reject unknown roles")


def test_render_prompt_records_template_version_and_variables():
    template = PromptTemplate(
        name="risk-summary",
        version="v1",
        body="Summarize {ticker} risk using {source_count} sources.",
    )

    message = render_prompt(template, {"ticker": "AAPL", "source_count": "3"})

    assert message.role == "user", "Rendered prompts should enter the provider as user messages."
    assert "AAPL" in message.content, "Prompt rendering should substitute the ticker variable."
    assert "3 sources" in message.content, "Prompt rendering should substitute source_count."
    assert "risk-summary@v1" in message.content, (
        "Rendered prompts should include template identity so prompt regressions are traceable."
    )


def test_estimate_tokens_and_cost_are_deterministic():
    assert estimate_tokens("AAPL beats revenue estimates") == 4, (
        "Token estimates should be deterministic in this fake boundary."
    )
    assert estimate_tokens("   ") == 0, "Blank prompts should not produce phantom token counts."
    assert estimate_cost(250, price_per_1k_tokens=0.002) == 0.0005, (
        "Cost estimates should be inspectable before learners use real providers."
    )


def test_call_provider_validates_before_calling_and_records_trace():
    provider = FakeProvider("AAPL risk is revenue concentration.")
    messages = [Message("user", "Summarize AAPL risk.")]

    response = call_provider(messages, provider, model="fake-model", price_per_1k_tokens=0.002)

    assert response.content == "AAPL risk is revenue concentration.", (
        "The provider boundary should return the provider content without rewriting it."
    )
    assert provider.calls == [messages], "call_provider should validate and then call the provider once."
    assert response.trace["model"] == "fake-model", "Trace metadata should record the chosen model."
    assert response.trace["input_tokens"] > 0, (
        "Trace should record estimated input tokens so later production lessons can reason about cost."
    )
    assert response.trace["output_tokens"] > 0, (
        "Trace should record estimated output tokens so cost and verbosity can be inspected."
    )
    assert response.trace["estimated_cost"] > 0, (
        "Trace should include estimated cost even when the provider is fake."
    )
