# Requirements Update Summary

**Date**: 2024
**Spec**: AI Engineering Curriculum Implementation
**Action**: Updated requirements.md based on pedagogical framework alignment

## Overview

Updated the requirements document to strengthen alignment with the research-backed hybrid pedagogical approach (Top-Down "Whole Game" + Bottom-Up "First Principles") and ensure all critical curriculum elements are explicitly captured.

## Changes Made

### 1. Enhanced Requirement 1: Diagnostic Assessment System
**Added:**
- Total duration estimates for each entry path (30, 29, 28, 25, 19 weeks)
- Requirement to display recommended entry point with rationale
- Requirement to allow override with warning
- Requirement to provide topic score breakdown for gap identification

**Rationale:** Provides clearer guidance for learners and ensures diagnostic system is actionable.

---

### 2. Enhanced Requirement 2: Module 0 - Python Foundations Content
**Added:**
- Requirement to follow 6-layer learning pattern for all Python chapters
- Requirement to provide immediate hands-on execution before explaining syntax

**Rationale:** Ensures Python foundations follow same pedagogical rigor as AI modules.

---

### 3. Enhanced Requirement 3: Module 1 - Whole Game Top-Down Content
**Added:**
- Requirement to cast learner as "AI Systems Architect"
- Requirement to provide immediate hands-on execution in Week 1 Day 1
- Requirement to allow observation of utility before deconstructing components
- Requirement to debunk complexity myths by showing immediate results
- Requirement to encourage experimentation and parameter manipulation
- Requirement to provide contextual anchors for subsequent deep dives
- Requirement to provide interactive logs showing execution flow in real-time

**Rationale:** Explicitly captures the "Whole Game" pedagogy principles from the pedagogical framework, ensuring Module 1 properly implements top-down learning.

---

### 4. Enhanced Requirement 4: Module 2 - First Principles Bottom-Up Content
**Added:**
- Requirement to manually code forward pass, loss function, and backpropagation without automated tools
- Requirement to implement BPE parser and pretty printer with round-trip property tests
- Requirement to manually code scaled dot-product attention from for loops to matrix multiplications
- Requirement to teach tensor dimension tracking for intuitive "muscle memory"
- Requirement to emphasize tokenization's role in explaining LLM "weird behaviors"

**Rationale:** Explicitly captures the "First Principles" pedagogy requiring manual implementation without high-level APIs, ensuring deep understanding.

---

### 5. Enhanced Requirement 5: Module 3 - MCP Integration Content
**Added:**
- Requirement to explain precise information flow (Host → Client → Server → Response)
- Requirement to teach MCP Resources (passive, read-only context)
- Requirement to teach MCP Tools (active API endpoints)
- Requirement to teach MCP Prompts (reusable templates)
- Requirement to emphasize context engineering (pre-processing JSON payloads)
- Requirement to teach continuous telemetry logging for audit trails
- Requirement to provide hands-on exercises for databases, file systems, and external APIs

**Rationale:** MCP is critical missing concept from pre-2024 curricula; requirements now capture all MCP primitives and security patterns.

---

### 6. Enhanced Requirement 6: Module 4 - Agentic Workflows Content
**Added:**
- Requirement to teach ReAct pattern (interleaving reasoning and action)
- Requirement to teach Reflection pattern (Generator → Critic → refinement)
- Requirement to teach Planning pattern (decompose before execution)
- Requirement to teach Human-in-the-Loop pattern (pause for authorization)
- Requirement to provide production readiness assessment (Low/Medium/High Risk)
- Requirement to teach pattern selection based on enterprise value vs risk tradeoffs
- Requirement to provide exercises with strict guardrails

**Rationale:** Ensures all 7 core agentic design patterns are explicitly covered with production readiness guidance.

---

### 7. Enhanced Requirement 7: Module 5 - Production & Verification Content
**Added:**
- Requirement to teach golden set curation (human-verified input-output pairs)
- Requirement to teach regression discipline (never deploy without testing)
- Requirement to teach verification engineer mindset (70% time on testbenches)
- Requirement to teach comprehensive logging (tool invocations, tokens, reasoning traces)
- Requirement to teach semantic caching for cost reduction
- Requirement to provide exercises building comprehensive test suites

**Rationale:** Verification engineering is the critical differentiator between "vibe coding" and "agentic engineering"; requirements now capture this mindset explicitly.

---

### 8. Enhanced Requirement 9: Interactive Learning Elements
**Added:**
- Specific parameters for explorable explanations (temperature, learning rate, top-p, attention weights)
- Performance requirement (200ms response time for slider updates)
- Specific examples of scrollytelling content (BPE step-by-step, attention flow, DAG execution)
- Requirement for visual simulations (token merging, weight flow, embedding spaces)
- Requirement that interactive elements transform passive reading into active participation

**Rationale:** Explorable explanations are core to the pedagogical approach; requirements now specify what must be interactive and performance expectations.

---

### 9. Enhanced Requirement 10: Chapter Structure and Pedagogy
**Added:**
- Explicit 6-layer pattern: Action → Text → Video → See → Build → Interview
- Detailed description of "Action First" layer (narrative hook, immediate execution)
- Requirement to avoid "elementitis" in "Text" layer
- Requirement for interactive parameter manipulation in "See" layer
- Requirement for scaffolded TODOs (not complete solutions) in "Build" layer
- Requirement for "Before" and "After" self-assessments for confidence calibration

**Rationale:** The 6-layer learning pattern is the structural foundation; requirements now explicitly define each layer's purpose and implementation.

---

### 10. Enhanced Requirement 13: Content Quality Standards
**Added:**
- Requirement for narrative framing casting learner as architect
- Requirement for consistent color-coding in diagrams
- Requirement for specific assessment question breakdown (2-3 conceptual, 1-2 design, 1 coding)
- Requirement to use "dancing technique" (conflict + context interplay)
- Requirement to resolve narrative conflicts by module end
- Requirement to maintain storytelling continuity

**Rationale:** Visual storytelling and narrative framing are critical for engagement; requirements now capture specific techniques from pedagogical framework.

---

### 11. NEW Requirement 31: Parser and Serializer Implementation Standards
**Added entirely new requirement covering:**
- Requirement to identify ALL parsers and serializers explicitly
- Requirement to reference grammar being parsed
- Requirement to include pretty printer for every parser
- Requirement to include round-trip property tests (parse → print → parse)
- Requirement to provide parser exercises in Modules 2, 3, and 4
- Requirement to emphasize parsers are tricky and round-trip testing is ESSENTIAL
- Requirement to provide example grammars (BPE, JSON schema, MCP protocol)
- Requirement to test parser edge cases

**Rationale:** Per workflow instructions, parsers are critical and frequently buggy; round-trip testing is essential but often omitted. This requirement ensures parsers are treated with appropriate rigor.

---

### 12. NEW Requirement 32: Cognitive Load Management
**Added entirely new requirement covering:**
- Requirement for time estimates after every H2 heading
- Requirement to alternate dense and light sections
- Requirement for collapsible blocks for advanced content
- Requirement for cognitive pause checkpoints every ~500 lines
- Requirement to limit analogies to 5-6 per chapter
- Requirement for "Before" and "After" self-assessments
- Requirement to calculate confidence calibration
- Requirement to break complex topics into digestible chunks
- Requirement for visual breaks between dense text sections

**Rationale:** Cognitive load management is explicitly called out in pedagogical framework as critical for learning effectiveness. This requirement captures all 5 cognitive load mechanisms.

---

### 13. NEW Requirement 33: Hybrid Pedagogy Cycle
**Added entirely new requirement covering:**
- Requirement to implement Execute → Observe → Deconstruct → Synthesize → Verify cycle
- Requirement for Module 1 to use pure top-down approach
- Requirement for Module 2 to use pure bottom-up approach
- Requirement for Modules 3-6 to weave both methodologies
- Requirement to show high-level tool execution before manual implementation
- Requirement to prevent "elementitis" by contextualizing within complete systems
- Requirement to use top-down for motivation, bottom-up for competence
- Requirement to explicitly label sections as "Top-Down" or "Bottom-Up"
- Requirement to reference top-down system when doing bottom-up implementation

**Rationale:** The hybrid pedagogy is the core innovation of this curriculum. This requirement ensures the top-down/bottom-up cycle is explicitly implemented and not left implicit.

---

## Summary Statistics

- **Total Requirements**: 33 (was 30)
- **Requirements Enhanced**: 10
- **Requirements Added**: 3
- **Total Acceptance Criteria**: 380+ (was 310+)

## Key Improvements

1. **Pedagogical Alignment**: All module requirements now explicitly reference the hybrid top-down/bottom-up pedagogy
2. **Interactive Elements**: Specific performance requirements and examples for explorable explanations and scrollytelling
3. **Parser Standards**: New requirement ensures parsers are implemented with round-trip testing
4. **Cognitive Load**: New requirement captures all 5 cognitive load management mechanisms
5. **Hybrid Cycle**: New requirement makes the pedagogical cycle explicit and measurable
6. **MCP Coverage**: Enhanced MCP requirements capture all primitives (Resources, Tools, Prompts)
7. **Verification Engineering**: Enhanced Module 5 requirements emphasize the verification mindset
8. **Agentic Patterns**: Enhanced Module 4 requirements cover all 7 patterns with risk assessment
9. **Diagnostic Clarity**: Enhanced diagnostic requirements provide clear entry path guidance
10. **6-Layer Pattern**: Enhanced chapter structure requirements explicitly define each layer

## Alignment with Pedagogical Framework

The updated requirements now fully align with the pedagogical framework document:

✅ **Top-Down "Whole Game"**: Explicitly captured in Requirements 3, 33
✅ **Bottom-Up "First Principles"**: Explicitly captured in Requirements 4, 33
✅ **6-Layer Learning Pattern**: Explicitly captured in Requirements 10, 13
✅ **Explorable Explanations**: Explicitly captured in Requirement 9
✅ **Scrollytelling**: Explicitly captured in Requirement 9
✅ **Visual Storytelling**: Explicitly captured in Requirement 13
✅ **Cognitive Load Management**: Explicitly captured in Requirement 32
✅ **MCP as Core Competency**: Explicitly captured in Requirement 5
✅ **Verification Engineering**: Explicitly captured in Requirement 7
✅ **Agentic Design Patterns**: Explicitly captured in Requirement 6
✅ **Parser/Serializer Rigor**: Explicitly captured in Requirement 31

## Next Steps

The requirements document is now ready for:
1. Design document review to ensure technical architecture supports all requirements
2. Task breakdown to implement the curriculum platform
3. Content generation following the enhanced pedagogical standards
4. Quality checklist validation against the 96-item standard

---

**Document Status**: ✅ Complete
**Requirements Status**: ✅ Ready for Design Review
