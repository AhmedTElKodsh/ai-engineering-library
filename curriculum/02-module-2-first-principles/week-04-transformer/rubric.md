# Rubric: Tiny Transformer Block Lab

## Correctness

- Adds equal-length vectors and rejects mismatched vector dimensions.
- Normalizes vectors into stable centered values.
- Handles all-equal vectors without divide-by-zero behavior.
- Looks up embeddings in token order.
- Reports missing token IDs clearly.
- Projects vectors with deterministic matrix-row behavior.
- Runs self-attention once per input token.
- Produces one contextual vector per token.
- Applies residual addition before normalization.
- Applies the feed-forward step after normalization.
- Returns final outputs and trace metadata.

## Learning Process

- Runs the tests before editing.
- Implements helpers before the full block.
- Uses one failing test at a time as the next task.
- Inspects intermediate shapes and values instead of guessing.
- Explains residuals, normalization, and feed-forward behavior in plain language.

## FinAgent Connection

- Connects contextual vectors to market-text reasoning.
- Explains why transformer intuition helps before using real model APIs.
- Avoids claiming this toy block can make financial predictions.
- Names what real providers and libraries still handle in production.

## Code Quality

- Uses plain Python lists and `math`.
- Avoids NumPy, PyTorch, transformer libraries, model downloads, and API calls.
- Keeps validation errors specific.
- Keeps ordering deterministic and traceable.
- Does not hide meaningful logic behind unexplained helpers.

## Verification

- Runs `python -m pytest tests -v`.
- Reviews expected TODO failures before coding.
- Adds one extension test for empty input or projection shape errors.
- Writes a short transformer trace artifact after passing the tests.
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
