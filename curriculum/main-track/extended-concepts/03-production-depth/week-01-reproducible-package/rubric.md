# Rubric: Reproducible Package Boundary

| Criterion | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Contract correctness | Implements the required behavior for run metadata, required environment, artifact paths, Dockerfile notes, and clean-checkout commands with deterministic, reviewable outputs | Required tests pass for the core behavior | Outputs are incomplete, ad hoc, or depend on hidden assumptions |
| Failure handling | Handles invalid, unsafe, missing, or edge-case inputs with clear reasons | Covers the tested failure cases | Lets bad inputs pass through or fails without explanation |
| Trace and evidence | Produces enough trace, counts, statuses, or decision data for reviewer debugging | Required evidence fields exist | Evidence is missing, vague, or not connected to the behavior |
| Scope discipline | Solves the lesson with the intended local boundary and avoids unnecessary frameworks or live services | Mostly stays within the lesson scope | Adds complexity that hides the concept being practiced |
| FinAgent transfer | Explains how the work strengthens FinAgent or a practical AI system: FinAgent can be reviewed and rerun by another engineer from clear evidence | Gives a plausible transfer note | Cannot connect the lesson to a real system outcome |
| Reflection quality | Names the tradeoff, limitation, and next stronger check in 2-4 clear sentences | Gives a short explanation of the fix | Only states that tests pass |
