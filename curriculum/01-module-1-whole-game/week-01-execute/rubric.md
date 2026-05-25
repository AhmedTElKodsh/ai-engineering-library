# Rubric: First FinAgent Stock Summary

| Category | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Correctness | All functions pass normal and edge-case tests | Core summary works | Core calculations are wrong |
| Reliability | Invalid prices and tickers raise clear `ValueError`s | Common invalid inputs are handled | Invalid inputs silently produce bad summaries |
| Explainability | Can explain why the deterministic baseline comes before LLMs | Can explain the main data flow | Cannot explain the role of each function |
| Source Grounding | Summary includes the provided source | Source is present but unclear | Source is missing |
| Safety | Summary includes an educational disclaimer | Disclaimer is present but vague | Output could be mistaken for financial advice |
| Maintainability | Functions are small and named clearly | Code is readable | Logic is tangled or duplicated |
| Test Coverage | Adds one meaningful extension test | Existing tests pass | Tests are ignored or changed to hide failures |
