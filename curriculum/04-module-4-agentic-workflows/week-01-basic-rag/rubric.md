# Rubric: AI-Ready Ingestion And Chunking Lab

## Runs Correctly

- Fixture records load without network access.
- Valid records become clean records.
- Invalid records appear in `failed_records` with useful reasons.
- Chunks are generated with stable IDs and source metadata.
- The report counts raw, clean, failed, and chunked records.

## Shows The Core Concept

- Raw, clean, failed, and chunked layers are separate.
- Metadata is treated as retrieval infrastructure, not decoration.
- Failed records are visible and reviewable.
- Chunk output is ready for later citation and abstention tests.

## Explains The Reasoning

- The learner can explain why RAG quality starts before embeddings.
- The learner can explain why dropped source metadata creates unsupported answers.
- The learner can name what this phase does not prove yet: relevance, ranking, citations, or answer quality.

## Handles Edge Cases

- Missing IDs, source IDs, timestamps, titles, and bodies are refused.
- Blank text does not become a clean record.
- Metadata keys and values are normalized without fabricating new facts.
- Chunking handles short records and multi-chunk records.

## Code Is Readable

- Uses small functions with clear inputs and outputs.
- Uses dataclasses to make record states explicit.
- Avoids framework code before the data contract is trustworthy.
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
