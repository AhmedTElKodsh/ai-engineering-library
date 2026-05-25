# Hints: LLM Provider Boundary Lab

## Hint 1: Start With The Contract

List the required message fields before writing provider code. A fake provider should receive the same shape that a real provider would receive.

## Hint 2: Refuse Bad Input Early

Validate roles, content, and model configuration before calling a provider. A boundary is useful only if it blocks malformed requests.

## Hint 3: Trace The Call

A useful trace includes provider name, model label, prompt version, token estimate, cost estimate, elapsed time, and normalized status.

## Hint 4: Keep Secrets Out

Configuration may name an environment variable, but learner-facing code should not contain real keys or logged key values.
