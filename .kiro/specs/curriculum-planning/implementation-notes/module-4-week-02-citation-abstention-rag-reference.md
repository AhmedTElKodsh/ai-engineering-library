# Module 4 Phase 2 Citation And Abstention RAG Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_bridge_chunks()` should return at least three `RagChunk` objects shaped like outputs from the web-data bridge and Phase 1 chunking work. Each chunk needs:

- `chunk_id`
- `record_id`
- `source_id`
- text
- `source_url` metadata

`normalize_terms()` should lowercase words, strip punctuation, and drop very short terms. The expected output for `Cloud revenue, and AI!` is `["cloud", "revenue"]`.

`retrieve()` should score chunks with simple keyword overlap, keep matched terms, filter below `min_score`, and sort by score descending.

`answer_with_citations()` should:

- retrieve evidence
- abstain with a reason containing `insufficient` when no result meets the threshold
- otherwise answer from the top chunk without inventing unsupported claims
- cite the selected chunk ID
- use `supported_by_retrieval` as the supported reason

`build_retrieval_trace()` should return query, result count, and per-result chunk IDs, scores, matched terms, and source IDs or URLs.
