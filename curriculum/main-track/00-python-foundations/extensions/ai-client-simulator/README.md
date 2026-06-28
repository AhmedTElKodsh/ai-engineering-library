# Extension: AI Client Simulator

## How To Use This File

Read this file first. It defines the lesson objective, the minimum path, the expected evidence, and the verification command. Treat the local tests as the exact contract when implementation details feel unclear.

This optional project prepares you for later LLM API modules after you complete Module 1 and the Week 03 stock pipeline bridge.

It practices:

- configuration validation
- prompt construction
- retry behavior
- streaming responses
- batch processing
- response parsing

Run from `curriculum/main-track/00-python-foundations`:

```powershell
python -m pytest extensions/ai-client-simulator/ai_client/client_checks.py -v
```

Treat this as extra reps. The required bridge after Module 1 is the stock pipeline in `week-03-stock-pipeline`.
