# Rubric: Local FinAgent Request Boundary

| Criterion | Strong | Developing | Needs Work |
| --- | --- | --- | --- |
| Boundary Design | Request validation, analysis, and response formatting are separate | Mostly separated with minor duplication | Validation and analysis are tangled |
| Correctness | Handles valid and invalid requests exactly as tests require | Happy path works but edge cases fail | Core functions return placeholders |
| Traceability | Response includes useful trace metadata | Trace exists but is vague | No debugging metadata |
| Safety | Disclaimer remains present and clear | Disclaimer present but easy to miss | Response reads like financial advice |
| Transfer | Learner can explain how this maps to CLI/API/MCP boundaries | Explains only this lesson | Cannot connect to later modules |
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
