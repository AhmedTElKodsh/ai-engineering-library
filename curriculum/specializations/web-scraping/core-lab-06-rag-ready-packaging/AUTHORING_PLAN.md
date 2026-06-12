# Authoring Plan: Core Lab 6

## Scope

Create a fixture-first lab for converting reviewed web records into citation-ready chunks, refusal rules, and a package manifest.

## Acceptance Checks

- [x] `README.md` frames RAG packaging as the handoff from web data acquisition to Module 4.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define reviewed-record loading, chunk text, packaging, refusal rules, and manifest behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates scope, citation metadata, chunking, refusal rules, manifest quality, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: reviewed provenance records, data-quality issue categories, and a ready/not-ready gate from Core Lab 5.
- New capability added by this lesson: convert approved web records into citation-ready chunks, refusal rules, metadata, and a package manifest for downstream RAG.
- Failure mode the learner must reproduce, inspect, or prevent: failed or uncertain records become retrievable chunks without citations, freshness context, quality status, or refusal behavior.
- FinAgent or practical AI-system improvement: FinAgent can answer from packaged public context while refusing stale, missing-provenance, or advice-seeking requests.
- Explanation artifact the learner should leave with: a package manifest plus a short handoff note naming packaged records, citations, source URLs, refusal rules, and unresolved risks.

## Scope Boundary Enhancement

- Minimum required path: load reviewed records, build chunk text, skip failed records, preserve citation metadata, create refusal rules, and summarize package manifest counts.
- Optional enrichment only after the minimum path works: add one extra refusal rule for stale data, missing permissions, restricted source type, unsupported claim, or finance advice.
- Advanced doorway, named briefly but not required: vector database ingestion, embedding-model selection, reranking, GraphRAG, live refresh, and production access-control enforcement belong to later modules or specialization depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for reviewed-record loading, chunk text, packaged chunks, citation metadata, refusal rules, and manifest output.
- Failure evidence: failed records are skipped and uncertainty/advice cases are converted into refusal rules instead of retrievable claims.
- Explanation evidence: learner note explains what each manifest count proves and what the RAG system must still verify.
- Transfer evidence: FinAgent callback showing how web-data chunks become cited answer evidence or abstention/refusal triggers in Module 4.

## Source Evidence Enhancement

Use `../../../04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, B06 `RAG-Driven Generative AI`, B07 `RAG with Python Cookbook`, and B09 `Hands-On Large Language Models` provide indexed support for RAG grounding, metadata, citations, and retrieval quality.
- Local PDF `Principles of Building AI Agents`, p.88 and p.92-93 for preserving chunks and metadata before answer generation.
- Local PDF `Hands-On RAG for Production`, p.8-15 for grounding in external/private/fresh data and separating ingest from query flow.
- Local PDF `Hands-On RAG for Production`, p.20 and p.41-43 for missing-data, weak-retrieval, and hallucination failure categories.
- Local PDF `Hands-On RAG for Production`, p.47-50 and p.55 for access controls, privacy, audit trails, and prompt-injection mitigation when packaging retrieval data.
- Assessment conversion rule: each source insight must become a chunk metadata field, citation field, skipped-record rule, refusal rule, manifest count, or learner handoff note.
