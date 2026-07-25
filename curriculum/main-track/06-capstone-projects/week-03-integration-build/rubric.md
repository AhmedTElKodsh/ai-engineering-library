# Rubric

## How To Use This File

Use this before starting to understand what good work looks like, then use it after verification to check whether you have evidence, not just passing tests. The rubric is a review checklist, not extra scope.

| Category | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Deterministic Baseline | Produces a stable typed market summary with correct signed movement, timestamp, and safety wording before RAG | Produces the required deterministic summary | Requires retrieval/model behavior before the first useful output |
| Integration | Composes validation, fixtures, retrieval, safety, brief, and trace into one deterministic workflow | Connects the main workflow stages | Leaves disconnected helper functions |
| Model Boundary | Validates structured output, rejects invented citations, and proves bounded retry behavior | Uses the fixture provider through a validated boundary | Treats fixture output as trusted or retries without a ceiling |
| Evaluation | Runs all ten cases and reports diagnostic failure categories | Runs the required cases and reports pass/fail totals | Uses a demo prompt as evaluation or hides failed categories |
| Evidence And Citations | Briefs use only fixture evidence and preserve citation URLs | Includes basic citations | Makes uncited or invented claims |
| Safety Boundary | Refuses malformed, unsupported, or advice-seeking requests before answer composition | Handles main refusal cases | Answers unsafe requests |
| Tool Authority | Allows only the typed read-only quote tool, with approval and denial evidence | Implements the approved tool and one denial path | Executes unknown tools or exposes unrestricted data |
| Workflow Bounds | Stops on refusal/abstention, caps retry, and makes human approval visible | Has explicit order and termination behavior | Hides control flow or can retry/run tools indefinitely |
| Service Boundary | Proves health, success, and malformed input over real loopback HTTP | Exposes the local contract with focused tests | Tests only an in-process dictionary while claiming HTTP proof |
| Operations | Separates fixture/live evidence and records latency, tokens, cost, and limits | Records basic operational evidence | Omits evidence labels or presents estimates as measured live cost |
| Traceability | Records reviewable success and refusal traces with clear step names | Records a basic trace | Hides decision points |
| Explanation | Explains deterministic scope, future live extension points, and remaining limitations | Explains the main design choices | Oversells the milestone as a full product |

## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capstone capability, integration capability, failure caught, FinAgent transfer, and next advanced doorway | Explains the main milestone purpose and transfer | Treats integration as unrelated helper code |
| Failure Literacy | Reproduces and explains invalid input, advice refusal, missing citation, or trace failure | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the fixture-first minimum path and labels live systems as optional extension | Completes the core task with minor scope drift | Adds live APIs or product scope before the local gate works |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
| Independent Transfer | Adds one unfamiliar tested change and reruns the full eval without copying the reference | Completes a bounded transfer with some explanation | Repeats the guided implementation or skips regression evidence |

## Completion Rule

Passing tests are necessary but insufficient. Milestone 1 completion requires
the full eval report, one independent transfer change, evidence entries, and an
oral or written defense that distinguishes deterministic, fixture, live, and
production claims.
