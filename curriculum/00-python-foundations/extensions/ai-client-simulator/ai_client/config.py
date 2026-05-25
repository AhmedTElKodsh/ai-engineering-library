"""
ai_client/config.py - LLM Configuration

Implement LLMConfig: a validated configuration class for an LLM provider.

Concepts: OOP, @property, ValidationError, type hints, dicts
AI use: mirrors Pydantic config schemas and later LLM client setup.
"""


class ConfigError(Exception):
    """Raised when LLMConfig receives invalid parameters.

    Attributes:
        field (str): the invalid field name
        message (str): what's wrong
    """
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"Config error - {field}: {message}")


class LLMConfig:
    """Configuration for an LLM provider.

    Attributes (validated on set):
        provider (str): one of "openai", "anthropic", "cohere"
        model (str): non-empty model identifier
        temperature (float): 0.0 <= value <= 2.0
        max_tokens (int): 1 <= value <= 32768
        system_prompt (str): the system message (default: "You are a helpful assistant.")

    All attributes should be validated. Raise ConfigError with the field name if invalid.

    Methods:
        to_dict() -> dict: return all config as a plain dict
        __repr__() -> str: "LLMConfig(provider='openai', model='gpt-4', temp=0.7)"
        __str__() -> str: human-readable summary

    Class method:
        from_dict(d: dict) -> LLMConfig: construct from a dict

    Example:
        cfg = LLMConfig(provider="openai", model="gpt-4o", temperature=0.7, max_tokens=1024)
        cfg.to_dict()
        # {"provider": "openai", "model": "gpt-4o", "temperature": 0.7,
        #  "max_tokens": 1024, "system_prompt": "You are a helpful assistant."}
    """

    VALID_PROVIDERS = {"openai", "anthropic", "cohere"}

    def __init__(
        self,
        provider: str,
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 1024,
        system_prompt: str = "You are a helpful assistant.",
    ):
        pass  # YOUR CODE HERE - validate and store all fields

    @property
    def provider(self) -> str:
        pass  # YOUR CODE HERE

    @provider.setter
    def provider(self, value: str):
        pass  # YOUR CODE HERE - validate against VALID_PROVIDERS

    @property
    def temperature(self) -> float:
        pass  # YOUR CODE HERE

    @temperature.setter
    def temperature(self, value: float):
        pass  # YOUR CODE HERE - validate 0.0 <= value <= 2.0

    @property
    def max_tokens(self) -> int:
        pass  # YOUR CODE HERE

    @max_tokens.setter
    def max_tokens(self, value: int):
        pass  # YOUR CODE HERE - validate 1 <= value <= 32768

    def to_dict(self) -> dict:
        pass  # YOUR CODE HERE

    def __repr__(self) -> str:
        pass  # YOUR CODE HERE

    def __str__(self) -> str:
        pass  # YOUR CODE HERE

    @classmethod
    def from_dict(cls, d: dict) -> "LLMConfig":
        """Construct an LLMConfig from a dictionary.

        Example:
            cfg = LLMConfig.from_dict({"provider": "anthropic", "model": "claude-3-5-sonnet-20241022"})
        """
        pass  # YOUR CODE HERE
