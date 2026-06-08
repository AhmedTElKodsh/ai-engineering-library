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
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
