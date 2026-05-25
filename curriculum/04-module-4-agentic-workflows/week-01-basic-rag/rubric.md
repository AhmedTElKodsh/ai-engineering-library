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

