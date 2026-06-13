# Day 9 - Prompt Templates And Structured Output

Deliverable: prompt templates, schema validation, and prompt regression tests

Calendar date: Monday 2026-06-22
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Treat prompts as software contracts. A prompt change is a code change: it needs
versioning, rendering tests, negative cases, and output validation.

## Read Or Trace

Required:

- `curriculum/main-track/03-module-3-mcp-integration/PROMPTOPS_EVIDENCE_CHECKLIST.md`
  Minimum Test Set section
- Module 3 context and structured-output notes

Optional if blocked or ahead:

- Module 3 security and injection notes

## Build

- prompt template file with name and version
- renderer with named variables
- structured answer schema
- parser or validator for model output
- normalized validation errors or refusal result

## Required Tests

- template render with expected variables
- missing variable fails clearly
- valid structured output passes
- invalid JSON or missing field fails safely
- one injection or unsafe-instruction negative case

## Minimum Path

- one prompt template
- one output schema
- four focused tests
- one negative case for unsafe user instruction, unsafe retrieved text, or
  instruction-in-source isolation

## Stretch

- prompt version trace field
- secret-safety test for logs or traces

## Before You Run

Which field must be present before downstream code may trust the answer?

## Evidence First

Inspect one rendered prompt and one invalid structured output before changing
the parser or schema.

## Smallest Change

Validate one required output field before adding optional fields, examples, or
prompt variants.

## Explain Like A Teammate

Why is a prompt change a software change that needs regression evidence?

## One Step Stronger

Add one invalid JSON, missing-field, unsafe-instruction, or source-instruction
case after the valid output path works.

## Evidence To Capture

- prompt template path
- schema fields
- valid structured output example
- invalid output failure example
- negative instruction case

## Done Criteria

Done when model output is accepted only after schema validation.

## Do Not Do Today

- keep production prompts only as inline strings
- trust fluent model output without validation
- let source text override system or developer instructions
