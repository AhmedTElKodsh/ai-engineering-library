"""
ai_client/client.py - LLM Client

Implement LLMClient: a simulated LLM client with retry and streaming support.

Concepts: OOP, generators, error handling, retry pattern, context managers
AI use: this is the structure learners reuse for real provider boundaries.
"""

from functools import wraps
from .config import LLMConfig


class RateLimitError(Exception):
    """Raised when the API rate limit is exceeded.

    AI use: provider rate-limit errors use this retry shape.
    """
    pass


class LLMError(Exception):
    """General LLM API error.

    Attributes:
        message (str): error description
        retryable (bool): whether the caller should retry
    """
    def __init__(self, message: str, retryable: bool = False):
        self.message = message
        self.retryable = retryable
        super().__init__(message)


def with_retry(max_attempts: int = 3, delay: float = 0.0):
    """Decorator factory: retry on RateLimitError or retryable LLMError.

    Waits `delay` seconds between attempts.
    Re-raises on non-retryable errors immediately.
    Re-raises the last error after all attempts exhausted.

    AI use: @with_retry(max_attempts=3, delay=1.0) wraps every real LLM call.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            pass  # YOUR CODE HERE
        return wrapper
    return decorator


class LLMClient:
    """Simulated LLM client.

    In a later provider-boundary lesson this becomes a real OpenAI/Anthropic client with the same interface.

    Attributes:
        config (LLMConfig): the client configuration
        _call_count (int): total calls made (including retries)
        _total_tokens (int): simulated total tokens used

    Methods:
        call(prompt: str) -> str
            Send prompt, return simulated response.
            Uses @with_retry(max_attempts=3).
            Raises LLMError on failure.

        stream(prompt: str) -> generator[str]
            Yield response word by word (simulates token streaming).
            AI use: for chunk in client.stream(prompt): print(chunk, end="")

        batch(prompts: list[str]) -> list[str]
            Call each prompt; return list of responses.
            Collect failures as LLMError messages; do not let one failure abort all.
            Returns list where failed items are error message strings.

        get_stats() -> dict
            Return {"calls": int, "tokens": int, "model": str, "provider": str}

        __repr__() -> str
            "LLMClient(provider='openai', model='gpt-4', calls=0)"

    Simulated behavior:
        call():   return f"[Response to: {prompt[:50]}]"
        stream():  yield each word of f"Simulated streaming response for: {prompt[:30]}"
        tokens:   simulate 10 tokens per call (add to _total_tokens each call)

    Example:
        cfg = LLMConfig(provider="openai", model="gpt-4o")
        client = LLMClient(cfg)
        response = client.call("What is RAG?")
        # "[Response to: What is RAG?]"

        for token in client.stream("Explain embeddings"):
            print(token, end=" ")
        # "Simulated streaming response for: Explain embeddings"
    """

    def __init__(self, config: LLMConfig):
        pass  # YOUR CODE HERE

    @with_retry(max_attempts=3)
    def call(self, prompt: str) -> str:
        pass  # YOUR CODE HERE

    def stream(self, prompt: str):
        """Yield response tokens (words) one at a time.

        AI use: identical to:
            for chunk in openai_client.chat.completions.create(..., stream=True):
                yield chunk.choices[0].delta.content
        """
        pass  # YOUR CODE HERE

    def batch(self, prompts: list[str]) -> list[str]:
        """Call each prompt; collect results (failures -> error message strings).

        AI use: batch embedding/completion in provider or retrieval work.
        """
        pass  # YOUR CODE HERE

    def get_stats(self) -> dict:
        pass  # YOUR CODE HERE

    def __repr__(self) -> str:
        pass  # YOUR CODE HERE
