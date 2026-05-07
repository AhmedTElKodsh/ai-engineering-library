# Requirements Document

## Introduction

The AI Engineering Library Curriculum is a comprehensive, self-paced educational platform designed to transform learners from "vibe coders" (those who rely on AI generation without understanding) into authoritative "Agentic Engineers" capable of architecting, deploying, and verifying production-grade AI systems. The curriculum implements a research-backed hybrid pedagogical approach combining top-down "Whole Game" learning with bottom-up "First Principles" mastery, delivered through interactive text-based learning, explorable explanations, visual storytelling, and scrollytelling techniques.

The system encompasses 7 modules (Module 0-6) spanning 28-30 weeks at 20 hours/week, with diagnostic-driven entry points, checkpoint-based progression, and portfolio-ready capstone projects. The curriculum covers the complete AI engineering stack from Python foundations through tokenization, transformers, MCP integration, agentic workflows, and production deployment with verification engineering practices.

## Glossary

- **Curriculum_Platform**: The complete educational system including all modules, content, exercises, assessments, and interactive elements
- **Learning_Module**: A major curriculum division (Module 0-6) containing weeks of structured content
- **Chapter**: A single lesson unit within a module covering specific concepts
- **Interactive_Element**: Explorable explanations, scrollytelling animations, or embedded code playgrounds
- **Checkpoint**: A mandatory assessment gate that verifies mastery before progression
- **Diagnostic_Assessment**: Entry-point evaluation determining learner's starting module
- **Golden_Dataset**: Human-verified input-output pairs used for evaluation and testing
- **MCP**: Model Context Protocol - standardized integration layer between AI models and enterprise systems
- **Agentic_Pattern**: Design pattern for orchestrating LLM behavior (ReAct, Reflection, Planning, etc.)
- **Explorable_Explanation**: Interactive narrative where learners manipulate parameters to observe real-time system changes
- **Scrollytelling**: Interactive format where scroll actions trigger animations and progressive diagram rendering
- **Progress_Tracker**: System for recording learner completion status and checkpoint achievements
- **Content_Generator**: System or process that creates chapter content following pedagogical standards
- **Portfolio_Project**: Capstone project demonstrating full-stack AI engineering mastery

## Requirements

### Requirement 1: Diagnostic Assessment System

**User Story:** As a learner, I want to take diagnostic assessments, so that I can start at the appropriate module based on my existing skills.

#### Acceptance Criteria

1. WHEN a learner accesses the curriculum, THE Diagnostic_Assessment SHALL present a Python foundations test
2. WHEN the Python test is completed, THE Diagnostic_Assessment SHALL calculate a score from 0-100%
3. IF the Python score is greater than 80%, THEN THE Diagnostic_Assessment SHALL present an AI engineering test
4. WHEN the AI engineering test is completed, THE Diagnostic_Assessment SHALL calculate a score from 0-5
5. WHEN both assessments are complete, THE Diagnostic_Assessment SHALL recommend an entry module based on scoring rules
6. THE Diagnostic_Assessment SHALL map Python score < 50% to Module 0 Week 1 (30 weeks total duration)
7. THE Diagnostic_Assessment SHALL map Python score 50-80% to Module 0 Week 2 (29 weeks total duration)
8. THE Diagnostic_Assessment SHALL map Python > 80% and AI 0-2/5 to Module 1 (28 weeks total duration)
9. THE Diagnostic_Assessment SHALL map Python > 80% and AI 3-4/5 to Module 2 (25 weeks total duration)
10. THE Diagnostic_Assessment SHALL map Python > 80% and AI 5/5 to Module 3 (19 weeks total duration)
11. THE Diagnostic_Assessment SHALL display the recommended entry point, estimated total weeks, and rationale to the learner
12. THE Diagnostic_Assessment SHALL allow learners to override the recommendation with a warning about prerequisite knowledge
13. THE Diagnostic_Assessment SHALL provide a breakdown of topic scores (e.g., Python OOP: 60%, Error Handling: 80%) to identify specific gaps

### Requirement 2: Module 0 - Python Foundations Content

**User Story:** As a beginner learner, I want comprehensive Python foundations content, so that I can build the prerequisite skills for AI engineering.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 0 with 2 weeks of content totaling 40 hours
2. THE Curriculum_Platform SHALL organize Week 1 into 7 days covering variables, strings, lists, dictionaries, control flow, functions, and a weekly project
3. THE Curriculum_Platform SHALL organize Week 2 into 7 days covering error handling, context managers, OOP, magic methods, comprehensions, generators, and a weekly project
4. WHEN a learner completes Module 0, THE Curriculum_Platform SHALL present a checkpoint requiring them to build a CLI tool with OOP and error handling
5. FOR ALL Python foundation chapters, THE Content_Generator SHALL include code examples, exercises, and interactive coding playgrounds
6. THE Content_Generator SHALL follow the 6-layer learning pattern for all Python chapters (Action → Text → Video → See → Build → Interview)
7. THE Content_Generator SHALL provide immediate hands-on execution in the "Action First" layer before explaining syntax

### Requirement 3: Module 1 - Whole Game Top-Down Content

**User Story:** As a learner, I want to execute a complete agentic system first, so that I understand the practical value before learning internals.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 1 with 3 weeks of content totaling 60 hours
2. THE Curriculum_Platform SHALL frame Module 1 with a narrative about fixing a chaotic customer support chatbot
3. WHEN a learner starts Week 1, THE Curriculum_Platform SHALL provide a complete LangGraph multi-agent system to execute
4. THE Curriculum_Platform SHALL guide learners to modify prompts, add tools, and change routing logic in Week 2
5. THE Curriculum_Platform SHALL guide learners to deploy locally and add observability in Week 3
6. WHEN a learner completes Module 1, THE Curriculum_Platform SHALL present a checkpoint requiring them to run, modify, and deploy a complete agent
7. FOR ALL Module 1 content, THE Content_Generator SHALL follow the "Whole Game" pedagogy showing complete systems before explaining internals
8. THE Content_Generator SHALL cast the learner as "AI Systems Architect" hired to fix the chaotic system
9. THE Content_Generator SHALL provide immediate hands-on execution in Week 1 Day 1 before any theoretical explanation
10. THE Content_Generator SHALL allow learners to observe utility and behavior of complete system before deconstructing components
11. THE Content_Generator SHALL debunk the myth that AI engineering requires genius-level math by showing immediate state-of-the-art results
12. THE Content_Generator SHALL encourage learners to break the code, experiment with parameters, and observe downstream effects
13. THE Content_Generator SHALL provide contextual anchors for subsequent deep dives by establishing working baseline first
14. THE Curriculum_Platform SHALL provide interactive logs showing execution flow, state transitions, and tool invocations in real-time

### Requirement 4: Module 2 - First Principles Bottom-Up Content

**User Story:** As a learner, I want to build LLM components from scratch, so that I deeply understand how they work internally.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 2 with 6 weeks of content totaling 120 hours
2. THE Curriculum_Platform SHALL frame Module 2 with a narrative about understanding the "brain" that processes text
3. THE Curriculum_Platform SHALL guide learners to implement BPE tokenization from scratch in Weeks 1-2
4. THE Curriculum_Platform SHALL guide learners to implement vector embeddings and attention mechanisms in Weeks 3-4
5. THE Curriculum_Platform SHALL guide learners to implement a mini transformer and backpropagation in Weeks 5-6
6. WHEN a learner completes Module 2, THE Curriculum_Platform SHALL present a checkpoint requiring them to explain LLM internals from bytes to probabilities
7. FOR ALL Module 2 content, THE Content_Generator SHALL prohibit use of high-level APIs and require manual implementation
8. THE Curriculum_Platform SHALL include explorable explanations with sliders for temperature, top-p, and learning rate parameters
9. THE Curriculum_Platform SHALL include visual simulations showing BPE token merging and attention weight flow
10. THE Content_Generator SHALL require learners to manually code forward pass, loss function, and backpropagation without automated tools (no PyTorch autograd or loss.backward())
11. THE Content_Generator SHALL require learners to implement BPE parser and pretty printer with round-trip property tests
12. THE Content_Generator SHALL require learners to manually code scaled dot-product attention equation from simple for loops to optimized matrix multiplications
13. THE Content_Generator SHALL teach learners to track specific dimensions of multidimensional tensors through operations to build intuitive "muscle memory"
14. THE Content_Generator SHALL emphasize that understanding tokenization explains many "weird behaviors" and logical failures in LLMs

### Requirement 5: Module 3 - MCP Integration Content

**User Story:** As a learner, I want to master the Model Context Protocol, so that I can connect AI systems to enterprise infrastructure securely.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 3 with 4 weeks of content totaling 80 hours
2. THE Curriculum_Platform SHALL frame Module 3 with a narrative about connecting isolated AI to enterprise systems (the "USB-C for AI" metaphor)
3. THE Curriculum_Platform SHALL teach MCP fundamentals (Resources, Tools, Prompts) in Week 1
4. THE Curriculum_Platform SHALL guide learners to build an MCP server from scratch using FastMCP in Week 2
5. THE Curriculum_Platform SHALL teach context engineering and schema validation in Week 3
6. THE Curriculum_Platform SHALL teach security patterns (RBAC, OAuth 2.1, threat modeling) in Week 4
7. WHEN a learner completes Module 3, THE Curriculum_Platform SHALL present a checkpoint requiring them to build a secure MCP server with OAuth
8. THE Curriculum_Platform SHALL include diagrams showing MCP architecture (Host, Client, Server, Response flow)
9. THE Content_Generator SHALL explain the precise information flow: Host receives input → Client negotiates protocol → Server exposes tools/data → Response routes back
10. THE Content_Generator SHALL teach learners to implement MCP Resources (passive, read-only context via custom URIs)
11. THE Content_Generator SHALL teach learners to implement MCP Tools (active API endpoints accepting structured arguments)
12. THE Content_Generator SHALL teach learners to implement MCP Prompts (reusable instruction templates)
13. THE Content_Generator SHALL emphasize context engineering: pre-processing and simplifying massive JSON payloads before sending to LLM to prevent hallucinations
14. THE Content_Generator SHALL teach learners to implement continuous telemetry logging every MCP tool invocation for audit trails
15. THE Curriculum_Platform SHALL provide hands-on exercises building MCP servers for databases, file systems, and external APIs

### Requirement 6: Module 4 - Agentic Workflows Content

**User Story:** As a learner, I want to master agentic design patterns, so that I can orchestrate production-grade multi-agent systems.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 4 with 8 weeks of content totaling 160 hours
2. THE Curriculum_Platform SHALL frame Module 4 with a narrative about preventing infinite loops in agent execution
3. THE Curriculum_Platform SHALL teach RAG systems (chunking, retrieval, evaluation) in Weeks 1-2
4. THE Curriculum_Platform SHALL teach advanced RAG (Self-RAG, CRAG, RAPTOR, Adaptive Retrieval) in Week 3
5. THE Curriculum_Platform SHALL teach agent patterns (ReAct, Reflection, Planning, HITL) in Weeks 4-5
6. THE Curriculum_Platform SHALL teach LangGraph orchestration (state machines, routing, checkpoints) in Weeks 6-7
7. THE Curriculum_Platform SHALL teach multi-agent collaboration (Supervisor, Swarm patterns) in Week 8
8. WHEN a learner completes Module 4, THE Curriculum_Platform SHALL present a checkpoint requiring them to orchestrate a multi-agent system with LangGraph
9. THE Curriculum_Platform SHALL include a production readiness matrix showing risk levels for each agentic pattern
10. THE Curriculum_Platform SHALL include scrollytelling visualizations of LangGraph DAG execution paths
11. THE Content_Generator SHALL teach the ReAct pattern (interleaving reasoning traces with actionable steps)
12. THE Content_Generator SHALL teach the Reflection pattern (Generator agent → Critic agent → refinement loop for self-correction)
13. THE Content_Generator SHALL teach the Planning pattern (decompose large objectives into sequential steps before execution)
14. THE Content_Generator SHALL teach Human-in-the-Loop pattern (pause autonomous execution for explicit human authorization before high-stakes actions)
15. THE Content_Generator SHALL provide production readiness assessment: Tool Use (Low Risk), ReAct (Medium Risk), Reflection (Medium Risk), Multi-Agent (High Risk)
16. THE Content_Generator SHALL teach when to use each pattern based on enterprise value vs operational risk tradeoffs
17. THE Curriculum_Platform SHALL provide exercises building agents with strict guardrails to prevent infinite loops and cascading failures

### Requirement 7: Module 5 - Production & Verification Content

**User Story:** As a learner, I want to learn verification engineering and deployment practices, so that I can deploy reliable production AI systems.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 5 with 7 weeks of content totaling 140 hours
2. THE Curriculum_Platform SHALL frame Module 5 with a narrative about CISO requiring proof of reliability before cloud deployment
3. THE Curriculum_Platform SHALL teach golden datasets and evaluation frameworks in Week 1
4. THE Curriculum_Platform SHALL teach regression testing and CI/CD pipelines in Week 2
5. THE Curriculum_Platform SHALL teach FastAPI for AI services (async endpoints, SSE streaming) in Week 3
6. THE Curriculum_Platform SHALL teach Docker containerization and multi-service orchestration in Week 4
7. THE Curriculum_Platform SHALL teach observability (LangSmith, Arize Phoenix, distributed tracing) in Week 5
8. THE Curriculum_Platform SHALL teach production guardrails (NeMo, content filtering, rate limiting) in Week 6
9. THE Curriculum_Platform SHALL teach fine-tuning essentials (Unsloth, DPO, GGUF deployment) in Week 7
10. WHEN a learner completes Module 5, THE Curriculum_Platform SHALL present a checkpoint requiring them to deploy a containerized system with observability
11. THE Curriculum_Platform SHALL emphasize the "Hardware Verification Engineer" mindset throughout Module 5
12. THE Content_Generator SHALL teach learners to curate golden sets (small, human-verified input-output pairs for evaluation)
13. THE Content_Generator SHALL teach learners to implement regression discipline (never deploy without testing against golden set in CI/CD)
14. THE Content_Generator SHALL teach learners that verification engineers spend 70% of time building testbenches, not writing logic
15. THE Content_Generator SHALL teach learners to log every tool invocation, token consumption, and reasoning trace for audit trails
16. THE Content_Generator SHALL teach learners to implement semantic caching for 30-60% cost reduction
17. THE Curriculum_Platform SHALL provide exercises building comprehensive test suites for LLM outputs with quantitative metrics

### Requirement 8: Module 6 - Capstone Projects Content

**User Story:** As a learner, I want to build a portfolio-ready capstone project, so that I can demonstrate full-stack AI engineering mastery with evidence-based pedagogical practices.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Module 6 with 2 weeks of content totaling 40 hours
2. THE Curriculum_Platform SHALL offer 5 domain options: Civil Engineering AI, Healthcare AI, Legal AI, Financial AI, and Custom Domain
3. THE Curriculum_Platform SHALL require capstone projects to include FastAPI, LangGraph, MCP, and RAG components
4. THE Curriculum_Platform SHALL require capstone projects to include a comprehensive test suite with golden datasets
5. THE Curriculum_Platform SHALL require capstone projects to include Docker deployment with docker-compose
6. THE Curriculum_Platform SHALL require capstone projects to include production observability with LangSmith integration
7. THE Curriculum_Platform SHALL require capstone projects to include security audit demonstrating MCP threat model compliance
8. THE Curriculum_Platform SHALL require capstone projects to include documentation (architecture diagrams, API docs, deployment guide)
9. WHEN a learner completes Module 6, THE Curriculum_Platform SHALL present a final checkpoint verifying portfolio-ready project quality

#### Pedagogical Enhancement (from Capstone Pedagogical Enhancement Spec)

**Pattern 1: Code Comprehension First**
- THE Curriculum_Platform SHALL add "Explain in Plain English" (EiPE) exercises before all code examples in capstone projects
- THE Curriculum_Platform SHALL structure code learning as: read → explain → modify → create progression
- THE Curriculum_Platform SHALL include exercises on evaluating and improving AI-generated code in capstone projects
- THE Curriculum_Platform SHALL add comprehension questions for complex code examples in capstone projects

**Pattern 2: Technical Interview Preparation**
- THE Curriculum_Platform SHALL add "explain your solution" exercises at all capstone project milestones
- THE Curriculum_Platform SHALL add think-aloud practice opportunities (coding while explaining) in capstone projects
- THE Curriculum_Platform SHALL add mock interview scenarios for capstone project technical concepts
- THE Curriculum_Platform SHALL integrate interview preparation throughout capstone (not isolated to one section)

**Pattern 3: Professional Workflow Integration**
- THE Curriculum_Platform SHALL add Git workflow practice to all capstone projects (commit, push, pull, branch, merge)
- THE Curriculum_Platform SHALL add testing practice guidance (unit tests, integration tests, TDD) to capstone projects
- THE Curriculum_Platform SHALL add deployment guidance for all capstone projects (make projects deployable as portfolio pieces)
- THE Curriculum_Platform SHALL add code review practice to capstone project workflows

**Pattern 4: Platform and Tooling**
- THE Curriculum_Platform SHALL evaluate capstone platform recommendations against Git-native criteria (plain text, clean diffs)
- THE Curriculum_Platform SHALL evaluate capstone platform recommendations against AI-compatibility criteria
- THE Curriculum_Platform SHALL add platform recommendations that support deployment as portfolio pieces for capstone projects
- THE Curriculum_Platform SHALL update Technology_Stack_Guide with Git-native and AI-compatible platform options for capstone projects

**Pattern 5: Scaffolding Progression**
- THE Curriculum_Platform SHALL structure capstone project learning as: worked example → partial example → independent problem
- THE Curriculum_Platform SHALL ensure code comprehension exercises precede code generation exercises in capstone projects
- THE Curriculum_Platform SHALL add worked examples for complex technical concepts in capstone projects
- THE Curriculum_Platform SHALL add partial examples where learners complete missing sections in capstone projects
- THE Curriculum_Platform SHALL add independent problems where learners apply concepts without scaffolding in capstone projects

**Pattern 6: Multi-Modal Learning Support**
- THE Curriculum_Platform SHALL add visual explanations (diagrams, concept maps) for complex technical concepts in capstone projects
- THE Curriculum_Platform SHALL ensure hands-on exercises are present for all major concepts in capstone projects (kinesthetic learning)
- THE Curriculum_Platform SHALL maintain conversational tone throughout capstone project documentation (auditory learners)
- THE Curriculum_Platform SHALL add architecture diagrams for system design concepts in capstone projects

### Requirement 9: Interactive Learning Elements

**User Story:** As a learner, I want interactive explorable explanations and scrollytelling, so that I can actively engage with complex concepts.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide explorable explanations with interactive sliders for adjustable parameters (temperature, learning rate, top-p, attention weights)
2. WHEN a learner adjusts a temperature slider, THE Interactive_Element SHALL update the probability distribution visualization in real-time within 200ms
3. WHEN a learner adjusts a learning rate slider, THE Interactive_Element SHALL update the gradient flow visualization in real-time within 200ms
4. THE Curriculum_Platform SHALL provide scrollytelling animations for complex flows (BPE tokenization step-by-step, attention mechanism data flow, LangGraph DAG execution paths)
5. WHEN a learner scrolls through a scrollytelling section, THE Interactive_Element SHALL trigger progressive diagram rendering synchronized with narrative text position
6. THE Curriculum_Platform SHALL provide in-browser coding playgrounds for all code examples with syntax highlighting
7. WHEN a learner writes code in a playground, THE Interactive_Element SHALL execute the code in an isolated sandbox and display results without leaving the browser
8. THE Curriculum_Platform SHALL provide hidden test suites that validate learner code implementations against expected behavior
9. WHEN a learner submits code, THE Interactive_Element SHALL run tests and provide immediate, context-aware feedback within 5 seconds
10. THE Curriculum_Platform SHALL provide visual simulations showing BPE token merging, attention weight flow, and vector embedding spaces
11. THE Interactive_Element SHALL allow learners to manipulate parameters and observe systemic changes, transforming passive reading into active participation

### Requirement 10: Chapter Structure and Pedagogy

**User Story:** As a learner, I want consistently structured chapters following proven pedagogical patterns, so that I can learn effectively.

#### Acceptance Criteria

1. THE Content_Generator SHALL structure every chapter using the 6-layer learning pattern: Action → Text → Video → See → Build → Interview
2. THE Content_Generator SHALL begin each chapter with "Action First" layer (narrative hook casting learner as architect, immediate hands-on execution of complete system)
3. THE Content_Generator SHALL follow with "Text" layer (conceptual explanation with maximum 5-6 curated analogies, avoiding "elementitis")
4. THE Content_Generator SHALL include "Video" layer (3+ diagrams per chapter using Mermaid and architecture diagrams)
5. THE Content_Generator SHALL include "See" layer (code walkthrough with explorable explanations and interactive parameter manipulation)
6. THE Content_Generator SHALL include "Build" layer (hands-on projects with scaffolded TODOs requiring learner implementation, not complete solutions)
7. THE Content_Generator SHALL conclude with "Interview" layer (4-6 assessment questions: 2-3 conceptual, 1-2 design, 1 coding challenge)
8. THE Content_Generator SHALL use consistent color-coding in diagrams: Blue for input, Green for LLM, Orange for storage, Purple for tools, Red for errors
9. THE Content_Generator SHALL include time estimates in format "(~X min)" after every H2 heading
10. THE Content_Generator SHALL include cognitive pause checkpoints every approximately 500 lines of content
11. THE Content_Generator SHALL include "Before" self-assessment after Part 1 of each chapter
12. THE Content_Generator SHALL include "After" self-assessment in chapter Summary for confidence calibration

### Requirement 11: Progress Tracking System

**User Story:** As a learner, I want to track my progress through the curriculum, so that I can see what I've completed and what remains.

#### Acceptance Criteria

1. THE Progress_Tracker SHALL record completion status for every day, week, and module
2. THE Progress_Tracker SHALL record timestamps for when each unit was completed
3. THE Progress_Tracker SHALL display visual indicators (checkboxes) for completed units
4. THE Progress_Tracker SHALL calculate total hours completed and remaining
5. THE Progress_Tracker SHALL display current module and week
6. WHEN a learner completes a checkpoint, THE Progress_Tracker SHALL record the checkpoint achievement
7. THE Progress_Tracker SHALL prevent progression to the next module until the current module's checkpoint is passed
8. THE Progress_Tracker SHALL export progress data in markdown format
9. THE Progress_Tracker SHALL record weekId and dayNumber for each completed chapter (integration with Requirement 34)
10. WHEN a learner completes all chapters in a module, THE Progress_Tracker SHALL trigger milestone unlock checks (integration with Requirement 35)
11. WHEN a learner completes a checkpoint, THE Progress_Tracker SHALL trigger milestone unlock checks (integration with Requirement 35)
12. WHEN progress is updated, THE Progress_Tracker SHALL trigger duration recalculation (integration with Requirement 36)
13. THE Progress_Tracker SHALL display current day within current week prominently on dashboard
14. THE Progress_Tracker SHALL integrate milestone achievements in progress dashboard
15. THE Progress_Tracker SHALL integrate duration estimates in progress dashboard

### Requirement 12: Checkpoint Assessment System

**User Story:** As a learner, I want mandatory checkpoint assessments, so that I verify my mastery before progressing to advanced content.

#### Acceptance Criteria

1. THE Checkpoint SHALL be presented at the end of each module
2. THE Checkpoint SHALL require practical demonstration of skills, not multiple-choice questions
3. THE Checkpoint SHALL provide clear success criteria for passing
4. WHEN a learner fails a checkpoint, THE Checkpoint SHALL provide specific feedback on gaps
5. WHEN a learner fails a checkpoint, THE Checkpoint SHALL recommend specific chapters to review
6. THE Checkpoint SHALL allow unlimited retake attempts
7. WHEN a learner passes a checkpoint, THE Checkpoint SHALL unlock the next module
8. THE Checkpoint SHALL record the passing timestamp in the Progress_Tracker

### Requirement 13: Content Quality Standards

**User Story:** As a curriculum maintainer, I want all content to meet quality standards, so that learners receive consistent, high-quality education.

#### Acceptance Criteria

1. THE Content_Generator SHALL ensure every chapter includes narrative framing casting learner as architect solving realistic business crisis
2. THE Content_Generator SHALL ensure every chapter includes at least 3 diagrams with consistent color-coding
3. THE Content_Generator SHALL ensure every chapter includes hands-on exercises requiring learner implementation
4. THE Content_Generator SHALL ensure every chapter includes 4-6 assessment questions (2-3 conceptual, 1-2 design, 1 coding)
5. THE Content_Generator SHALL limit analogies to 5-6 per chapter to prevent cognitive overload
6. THE Content_Generator SHALL include collapsible blocks using details tags for advanced content and war stories
7. THE Content_Generator SHALL alternate between dense sections (code/theory) and light sections (analogy/story) for texture variation
8. THE Content_Generator SHALL include "Before" self-assessment after Part 1 and "After" assessment in Summary for confidence calibration
9. THE Content_Generator SHALL ensure all code examples are tested, functional, and executable in provided playgrounds
10. THE Content_Generator SHALL ensure all interactive elements (explorable explanations, scrollytelling) are accessible and responsive
11. THE Content_Generator SHALL use the "dancing technique" interplaying conflict (system failure) and context (technical environment) throughout narrative
12. THE Content_Generator SHALL resolve narrative conflicts by end of module, maintaining storytelling continuity

### Requirement 14: Visual Diagram System

**User Story:** As a learner, I want rich visual diagrams, so that I can understand complex architectures and data flows.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide Mermaid diagrams for all system architectures
2. THE Curriculum_Platform SHALL provide sequence diagrams for all interaction flows
3. THE Curriculum_Platform SHALL provide state diagrams for all state machines
4. THE Curriculum_Platform SHALL use consistent color-coding across all diagrams
5. THE Curriculum_Platform SHALL provide animated diagrams for scrollytelling sections
6. THE Curriculum_Platform SHALL provide interactive diagrams where learners can click nodes to see details
7. THE Curriculum_Platform SHALL provide architecture diagrams showing component relationships
8. THE Curriculum_Platform SHALL provide data flow diagrams showing information movement through systems

### Requirement 15: Code Playground Infrastructure

**User Story:** As a learner, I want in-browser code execution environments, so that I can practice without local setup friction.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide containerized Python environments running in the browser
2. THE Curriculum_Platform SHALL pre-configure all necessary dependencies in playground environments
3. THE Curriculum_Platform SHALL provide API keys for required services (LLM APIs, vector databases) in playground environments
4. WHEN a learner executes code, THE Curriculum_Platform SHALL display output within 5 seconds
5. WHEN a learner's code produces an error, THE Curriculum_Platform SHALL display the full error message and stack trace
6. THE Curriculum_Platform SHALL provide code templates with TODO comments for scaffolded exercises
7. THE Curriculum_Platform SHALL provide a "Reset" button to restore original template code
8. THE Curriculum_Platform SHALL provide a "Solution" button that reveals reference implementation after learner attempts
9. THE Curriculum_Platform SHALL save learner's code automatically to prevent data loss
10. THE Curriculum_Platform SHALL maintain version history for project code
11. THE Curriculum_Platform SHALL allow learners to view previous versions of their code
12. THE Curriculum_Platform SHALL allow learners to revert to previous versions if needed
13. THE Curriculum_Platform SHALL display timestamps for each saved version
14. THE Curriculum_Platform SHALL track project completion status (not started, in progress, completed)

### Requirement 16: Assessment and Evaluation System

**User Story:** As a learner, I want comprehensive assessments, so that I can verify my understanding and identify knowledge gaps.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide 4-6 assessment questions at the end of every chapter
2. THE Curriculum_Platform SHALL include 2-3 conceptual questions testing understanding
3. THE Curriculum_Platform SHALL include 1-2 design questions testing architectural thinking
4. THE Curriculum_Platform SHALL include 1 coding challenge testing implementation skills
5. WHEN a learner answers incorrectly, THE Curriculum_Platform SHALL provide explanatory feedback
6. WHEN a learner answers incorrectly, THE Curriculum_Platform SHALL reference specific chapter sections to review
7. THE Curriculum_Platform SHALL track assessment scores in the Progress_Tracker
8. THE Curriculum_Platform SHALL provide a "Before" self-assessment after Part 1 of each chapter
9. THE Curriculum_Platform SHALL provide an "After" self-assessment in the chapter Summary
10. THE Curriculum_Platform SHALL calculate confidence calibration by comparing Before and After scores

### Requirement 17: Learning Path Customization

**User Story:** As a learner, I want customized learning paths based on my diagnostic results, so that I don't waste time on content I already know.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL generate a personalized learning path based on diagnostic scores
2. THE Curriculum_Platform SHALL display the recommended entry module prominently
3. THE Curriculum_Platform SHALL display the estimated total weeks to completion (see Requirement 36 for detailed duration calculation)
4. THE Curriculum_Platform SHALL allow learners to override the recommendation and choose a different entry point
5. WHEN a learner overrides the recommendation, THE Curriculum_Platform SHALL display a warning about prerequisite knowledge
6. THE Curriculum_Platform SHALL display a visual roadmap showing all modules and the learner's current position
7. THE Curriculum_Platform SHALL highlight completed modules in green and future modules in gray
8. THE Curriculum_Platform SHALL display the current module in blue with a progress indicator
9. WHEN a learner changes their entry point after starting, THE Curriculum_Platform SHALL recalculate total weeks and estimated completion date
10. WHEN a learner changes their entry point after starting, THE Curriculum_Platform SHALL preserve all completed progress
11. WHEN a learner changes their entry point after starting, THE Curriculum_Platform SHALL display a confirmation dialog explaining the impact on duration estimates

### Requirement 18: Daily Rhythm and Scheduling

**User Story:** As a learner, I want a structured daily rhythm, so that I can effectively allocate my study sessions.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL recommend a daily study rhythm: 80 min Learn, 120 min Build, 40 min Document (applies within each day's allocated hours from Requirement 34)
2. THE Curriculum_Platform SHALL provide a timer for each daily section
3. WHEN a timer completes, THE Curriculum_Platform SHALL display a notification suggesting a break
4. THE Curriculum_Platform SHALL recommend a 10-minute break after Learn and Build sections
5. THE Curriculum_Platform SHALL organize content into Monday-Thursday new content and Friday mini-projects (aligned with Requirement 34 Day 5 mini-projects)
6. THE Curriculum_Platform SHALL mark Saturday-Sunday as optional catch-up days
7. THE Curriculum_Platform SHALL display the current day's objectives at the start of each session (integrated with Requirement 34 daily content structure)
8. THE Curriculum_Platform SHALL display the current week's objectives in a sidebar
9. THE Curriculum_Platform SHALL clarify that the 80/120/40 rhythm is a suggested breakdown within each day's total hours (e.g., within a 3-hour day or 4-hour day)

### Requirement 19: Narrative Framing System

**User Story:** As a learner, I want engaging narrative framing, so that I stay motivated and understand the practical context of concepts.

#### Acceptance Criteria

1. THE Content_Generator SHALL frame every module with a narrative conflict (system failure or business crisis)
2. THE Content_Generator SHALL cast the learner as the lead architect tasked with resolving the conflict
3. THE Content_Generator SHALL use the "dancing technique" interplaying conflict and context throughout the narrative
4. THE Content_Generator SHALL resolve the narrative conflict by the end of the module
5. THE Content_Generator SHALL use realistic but fictional business scenarios
6. THE Content_Generator SHALL avoid sterile technical titles in favor of narrative-driven titles
7. THE Content_Generator SHALL maintain narrative continuity across chapters within a module
8. THE Content_Generator SHALL use visual storytelling techniques to enhance narrative engagement

### Requirement 20: Resource Library and References

**User Story:** As a learner, I want access to curated resources and references, so that I can explore topics in greater depth.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a resource library with curated articles, papers, and videos
2. THE Curriculum_Platform SHALL organize resources by module and topic
3. THE Curriculum_Platform SHALL mark resources as "Essential", "Recommended", or "Advanced"
4. THE Curriculum_Platform SHALL provide direct links to official documentation for all frameworks and tools
5. THE Curriculum_Platform SHALL provide links to research papers for advanced concepts
6. THE Curriculum_Platform SHALL provide links to community forums and Discord servers
7. THE Curriculum_Platform SHALL provide a glossary of all technical terms with definitions
8. THE Curriculum_Platform SHALL provide a FAQ section addressing common learner questions

### Requirement 21: Community and Support Features

**User Story:** As a learner, I want access to community support, so that I can get help when stuck and learn from peers.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a discussion forum for each module
2. THE Curriculum_Platform SHALL allow learners to post questions and receive answers
3. THE Curriculum_Platform SHALL allow learners to upvote helpful answers
4. THE Curriculum_Platform SHALL display the most popular questions prominently
5. THE Curriculum_Platform SHALL provide a "Get Help" button on every chapter page
6. WHEN a learner clicks "Get Help", THE Curriculum_Platform SHALL display relevant forum discussions and FAQ entries
7. THE Curriculum_Platform SHALL provide links to external community resources (Reddit, Discord, Twitter)
8. THE Curriculum_Platform SHALL provide office hours schedule if live support is available

### Requirement 22: Mobile Responsiveness

**User Story:** As a learner, I want to access the curriculum on mobile devices, so that I can learn on-the-go.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL render correctly on screens from 320px to 2560px width
2. THE Curriculum_Platform SHALL provide touch-friendly interactive elements on mobile devices
3. THE Curriculum_Platform SHALL adapt diagram sizes for mobile viewing
4. THE Curriculum_Platform SHALL provide mobile-optimized code playgrounds with syntax highlighting
5. THE Curriculum_Platform SHALL save scroll position when switching between mobile and desktop
6. THE Curriculum_Platform SHALL provide a mobile-friendly navigation menu
7. THE Curriculum_Platform SHALL load interactive elements progressively to optimize mobile performance
8. THE Curriculum_Platform SHALL provide offline access to previously viewed chapters on mobile

### Requirement 23: Accessibility Compliance

**User Story:** As a learner with disabilities, I want accessible content, so that I can learn effectively regardless of my abilities.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide alt text for all images and diagrams
2. THE Curriculum_Platform SHALL provide keyboard navigation for all interactive elements
3. THE Curriculum_Platform SHALL provide screen reader compatibility for all content
4. THE Curriculum_Platform SHALL provide high-contrast mode for visually impaired learners
5. THE Curriculum_Platform SHALL provide closed captions for all video content
6. THE Curriculum_Platform SHALL provide text transcripts for all audio content
7. THE Curriculum_Platform SHALL ensure all interactive elements have ARIA labels
8. THE Curriculum_Platform SHALL meet WCAG 2.1 Level AA compliance standards

### Requirement 24: Performance and Scalability

**User Story:** As a learner, I want fast page loads and responsive interactions, so that my learning experience is smooth.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL load chapter pages within 2 seconds on broadband connections
2. THE Curriculum_Platform SHALL load interactive elements within 3 seconds
3. THE Curriculum_Platform SHALL execute code playground submissions within 5 seconds
4. THE Curriculum_Platform SHALL cache static assets for faster subsequent loads
5. THE Curriculum_Platform SHALL lazy-load images and diagrams as they enter the viewport
6. THE Curriculum_Platform SHALL support concurrent access by 10,000+ learners
7. THE Curriculum_Platform SHALL maintain 99.9% uptime
8. THE Curriculum_Platform SHALL scale horizontally to handle traffic spikes

### Requirement 25: Analytics and Insights

**User Story:** As a curriculum maintainer, I want analytics on learner behavior, so that I can identify content that needs improvement.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL track completion rates for every chapter
2. THE Curriculum_Platform SHALL track average time spent on every chapter
3. THE Curriculum_Platform SHALL track checkpoint pass rates
4. THE Curriculum_Platform SHALL track assessment question accuracy rates
5. THE Curriculum_Platform SHALL identify chapters with high dropout rates
6. THE Curriculum_Platform SHALL identify chapters with low assessment scores
7. THE Curriculum_Platform SHALL provide a dashboard displaying all analytics metrics
8. THE Curriculum_Platform SHALL export analytics data in CSV format
9. THE Curriculum_Platform SHALL anonymize learner data in analytics reports
10. THE Curriculum_Platform SHALL comply with GDPR and data privacy regulations
11. THE Curriculum_Platform SHALL track daily completion rates (integration with Requirement 34)
12. THE Curriculum_Platform SHALL track milestone achievement rates by module (integration with Requirement 35)
13. THE Curriculum_Platform SHALL track learner pace trends showing weekly hours completed vs committed (integration with Requirement 36)
14. THE Curriculum_Platform SHALL identify learners at risk of falling behind schedule based on pace tracking
15. THE Curriculum_Platform SHALL track mini-project completion rates (Day 5 projects)
16. THE Curriculum_Platform SHALL track flagship project completion rates (final week projects)

### Requirement 26: Content Versioning and Updates

**User Story:** As a curriculum maintainer, I want version control for content, so that I can update curriculum while preserving learner progress.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL version all content using semantic versioning (major.minor.patch)
2. WHEN content is updated, THE Curriculum_Platform SHALL preserve learner progress on the previous version
3. WHEN content is updated, THE Curriculum_Platform SHALL notify learners of available updates
4. WHEN a learner views updated content, THE Curriculum_Platform SHALL highlight changes since the previous version
5. THE Curriculum_Platform SHALL allow learners to choose whether to migrate to updated content or continue with current version
6. THE Curriculum_Platform SHALL maintain a changelog documenting all content updates
7. THE Curriculum_Platform SHALL archive deprecated content for reference
8. THE Curriculum_Platform SHALL provide a content review workflow for maintainers before publishing updates
9. THE Curriculum_Platform SHALL provide authoring tools for creating week structures with daily content organization
10. THE Curriculum_Platform SHALL provide authoring tools for defining daily content with topic, hours, type (content/mini-project/flagship-project), and chapter associations
11. THE Curriculum_Platform SHALL provide authoring tools for defining milestones with unlock criteria (module-completion, checkpoint-pass, or custom)
12. THE Curriculum_Platform SHALL validate that daily content hours sum to weekly hour allocations
13. THE Curriculum_Platform SHALL validate that milestone unlock criteria reference valid modules and checkpoints
14. WHEN new features are deployed, THE Curriculum_Platform SHALL migrate existing learner data to new structures (weeks, daily content, milestones)
15. WHEN new features are deployed, THE Curriculum_Platform SHALL calculate initial duration estimates for existing learners based on their current progress
16. WHEN new features are deployed, THE Curriculum_Platform SHALL notify existing learners of new features (daily schedules, milestones, duration tracking)

### Requirement 27: Certificate and Credential System

**User Story:** As a learner, I want to earn certificates upon completion, so that I can demonstrate my skills to employers.

#### Acceptance Criteria

1. WHEN a learner completes all modules and passes all checkpoints, THE Curriculum_Platform SHALL generate a completion certificate
2. THE Curriculum_Platform SHALL include the learner's name, completion date, and total hours on the certificate
3. THE Curriculum_Platform SHALL provide a unique verification code on each certificate
4. THE Curriculum_Platform SHALL provide a public verification page where employers can validate certificates
5. THE Curriculum_Platform SHALL generate module-specific certificates for learners who complete individual modules
6. THE Curriculum_Platform SHALL provide digital badges for specific achievements (e.g., "MCP Master", "Agentic Architect")
7. THE Curriculum_Platform SHALL allow learners to share certificates on LinkedIn and other platforms
8. THE Curriculum_Platform SHALL provide a downloadable PDF version of all certificates

### Requirement 28: Search and Navigation

**User Story:** As a learner, I want powerful search and navigation, so that I can quickly find specific topics and concepts.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a global search bar accessible from every page
2. WHEN a learner searches, THE Curriculum_Platform SHALL return results from chapter content, code examples, and glossary
3. THE Curriculum_Platform SHALL highlight search terms in results
4. THE Curriculum_Platform SHALL provide filters to narrow search results by module or content type
5. THE Curriculum_Platform SHALL provide a hierarchical navigation menu showing all modules, weeks, and chapters
6. THE Curriculum_Platform SHALL highlight the current chapter in the navigation menu
7. THE Curriculum_Platform SHALL provide breadcrumb navigation showing the current location
8. THE Curriculum_Platform SHALL provide "Previous" and "Next" buttons for sequential navigation
9. THE Curriculum_Platform SHALL provide a table of contents for each chapter with anchor links
10. THE Curriculum_Platform SHALL provide a "Jump to Section" dropdown for quick navigation within long chapters

### Requirement 29: Export and Offline Access

**User Story:** As a learner, I want to export content for offline access, so that I can learn without internet connectivity.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a "Download for Offline" button on each chapter
2. WHEN a learner downloads a chapter, THE Curriculum_Platform SHALL generate a self-contained HTML file with embedded assets
3. THE Curriculum_Platform SHALL provide a "Download Module" button to download all chapters in a module
4. THE Curriculum_Platform SHALL provide a "Download All" button to download the entire curriculum
5. THE Curriculum_Platform SHALL include all diagrams, code examples, and text in offline downloads
6. THE Curriculum_Platform SHALL provide a PDF export option for each chapter
7. THE Curriculum_Platform SHALL maintain formatting and syntax highlighting in PDF exports
8. THE Curriculum_Platform SHALL include a note in offline content indicating interactive elements require internet connectivity

### Requirement 30: Feedback and Improvement System

**User Story:** As a learner, I want to provide feedback on content, so that the curriculum can be continuously improved.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a "Was this helpful?" button at the end of every chapter
2. WHEN a learner clicks "Not Helpful", THE Curriculum_Platform SHALL display a feedback form
3. THE Curriculum_Platform SHALL allow learners to report errors, typos, or broken links
4. THE Curriculum_Platform SHALL allow learners to suggest improvements or additional topics
5. THE Curriculum_Platform SHALL display a "Report Issue" button on every page
6. WHEN a learner reports an issue, THE Curriculum_Platform SHALL create a ticket in the maintainer's issue tracking system
7. THE Curriculum_Platform SHALL allow learners to upvote existing feedback submissions
8. THE Curriculum_Platform SHALL display a public roadmap showing planned improvements
9. THE Curriculum_Platform SHALL notify learners when their feedback is addressed
10. THE Curriculum_Platform SHALL display aggregate helpfulness scores for each chapter in the maintainer dashboard

### Requirement 31: Parser and Serializer Implementation Standards

**User Story:** As a curriculum developer, I want explicit requirements for all parsers and serializers, so that learners build robust, testable parsing systems.

#### Acceptance Criteria

1. THE Content_Generator SHALL identify and document ALL parsers and serializers as explicit requirements in curriculum content
2. WHEN a parser is required, THE Content_Generator SHALL reference the grammar being parsed
3. WHEN a parser is required, THE Content_Generator SHALL include a corresponding pretty printer requirement
4. WHEN a parser is required, THE Content_Generator SHALL include a round-trip property requirement (parse → print → parse produces equivalent object)
5. THE Curriculum_Platform SHALL provide parser exercises in Module 2 (tokenization), Module 3 (MCP schema validation), and Module 4 (structured output parsing)
6. FOR ALL parser implementations, THE Content_Generator SHALL require learners to implement both parser and pretty printer functions
7. FOR ALL parser implementations, THE Content_Generator SHALL require learners to write round-trip property tests verifying parse(print(x)) == x
8. THE Content_Generator SHALL emphasize that parsers are tricky to implement correctly and round-trip testing is ESSENTIAL for catching bugs
9. THE Curriculum_Platform SHALL provide example grammars (BPE token rules, JSON schema, MCP protocol specifications) for parser exercises
10. THE Content_Generator SHALL teach learners to test parser edge cases (empty input, malformed input, boundary conditions)

### Requirement 32: Cognitive Load Management

**User Story:** As a learner, I want cognitive load management mechanisms, so that I can absorb complex material without becoming overwhelmed.

#### Acceptance Criteria

1. THE Content_Generator SHALL include section time estimates in format "(~X min)" after every H2 heading
2. THE Content_Generator SHALL alternate between dense sections (code/theory) and light sections (analogy/story) for texture variation
3. THE Content_Generator SHALL use collapsible details blocks for advanced content, war stories, and optional deep dives
4. THE Content_Generator SHALL include cognitive pause checkpoints every approximately 500 lines with self-assessment questions
5. THE Content_Generator SHALL limit analogies to 5-6 per chapter to prevent analogy overload
6. THE Curriculum_Platform SHALL provide "Before" self-assessment after Part 1 of each chapter
7. THE Curriculum_Platform SHALL provide "After" self-assessment in chapter Summary
8. THE Curriculum_Platform SHALL calculate confidence calibration by comparing Before and After assessment scores
9. THE Content_Generator SHALL break complex topics into digestible chunks with clear progression markers
10. THE Content_Generator SHALL provide visual breaks using diagrams, code examples, and interactive elements between dense text sections

### Requirement 33: Hybrid Pedagogy Cycle

**User Story:** As a learner, I want a structured cycle between top-down and bottom-up learning, so that I gain both practical context and deep understanding.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL implement the hybrid pedagogy cycle: Execute (Top-Down) → Observe → Deconstruct (Bottom-Up) → Synthesize → Verify
2. THE Curriculum_Platform SHALL begin with Module 1 using pure top-down "Whole Game" approach (execute complete system first)
3. THE Curriculum_Platform SHALL follow with Module 2 using pure bottom-up "First Principles" approach (build from scratch)
4. FOR ALL subsequent modules (3-6), THE Content_Generator SHALL weave top-down and bottom-up methodologies in continuous cycles
5. WHEN introducing a new concept, THE Content_Generator SHALL first show the high-level tool execution (top-down)
6. WHEN the learner observes utility, THE Content_Generator SHALL immediately pivot to manual implementation (bottom-up)
7. THE Content_Generator SHALL ensure learners remain engaged by macro-utility while developing micro-competence
8. THE Content_Generator SHALL prevent "elementitis" by always contextualizing isolated elements within complete working systems
9. THE Content_Generator SHALL use top-down approach to provide motivation and debunk complexity myths
10. THE Content_Generator SHALL use bottom-up approach to build debugging competence and eliminate vibe-coding reliance
11. THE Curriculum_Platform SHALL explicitly label sections as "Top-Down: Execute First" or "Bottom-Up: Build from Scratch" for learner awareness
12. THE Content_Generator SHALL ensure every bottom-up implementation references the top-down system it deconstructs

### Requirement 34: Daily Content Structure and Scheduling

**User Story:** As a learner, I want detailed daily content breakdowns with specific topics and time allocations, so that I can plan my study sessions effectively.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL organize each week into 7 days with specific topic assignments for each day
2. THE Curriculum_Platform SHALL provide time estimates in hours for each daily topic (e.g., "Day 1: Variables & Types (3h)")
3. THE Curriculum_Platform SHALL allocate Day 5 of each week to a mini-project synthesizing that week's concepts
4. THE Curriculum_Platform SHALL allocate the final week of each module to a flagship project demonstrating module mastery
5. FOR Module 0 Week 1, THE Curriculum_Platform SHALL organize days as: Day 1 Variables & Types (3h), Day 2 Strings & F-strings (3h), Day 3 Lists & Tuples (3h), Day 4 Dictionaries & Sets (3h), Day 5 Control Flow (3h), Day 6 Functions & Closures (3h), Day 7 Weekly Project (2h)
6. FOR Module 0 Week 2, THE Curriculum_Platform SHALL organize days as: Day 8 Error Handling (3h), Day 9 Context Managers (3h), Day 10 OOP & Inheritance (3h), Day 11 Magic Methods (3h), Day 12 Comprehensions & Generators (3h), Day 13 Unpacking & Patterns (3h), Day 14 Weekly Project (2h)
7. FOR Module 1, THE Curriculum_Platform SHALL organize 3 weeks with daily 4-hour activities covering system execution, modification, and deployment
8. FOR Module 2, THE Curriculum_Platform SHALL organize 6 weeks with daily activities covering tokenization, embeddings, attention, transformers, and backpropagation
9. FOR Module 3, THE Curriculum_Platform SHALL organize 4 weeks with daily activities covering MCP fundamentals, server implementation, context engineering, and security
10. FOR Module 4, THE Curriculum_Platform SHALL organize 8 weeks with daily activities covering RAG systems, agent patterns, LangGraph orchestration, and multi-agent systems
11. FOR Module 5, THE Curriculum_Platform SHALL organize 7 weeks with daily activities covering testing, deployment, observability, optimization, and fine-tuning
12. FOR Module 6, THE Curriculum_Platform SHALL organize 2 weeks with daily activities covering capstone project architecture, implementation, testing, deployment, and documentation
13. THE Curriculum_Platform SHALL display the current day's topic and time estimate prominently at the start of each learning session
14. THE Curriculum_Platform SHALL mark Day 5 mini-projects with a distinct visual indicator (e.g., project icon)
15. THE Curriculum_Platform SHALL mark flagship projects with a distinct visual indicator (e.g., trophy icon)
16. THE Curriculum_Platform SHALL calculate the learner's current day based on completed chapters within the current week
17. THE Curriculum_Platform SHALL display the current day prominently when the learner accesses the curriculum
18. THE Curriculum_Platform SHALL provide a "Continue Learning" button that navigates to the current day's content
19. THE Curriculum_Platform SHALL allow learners to access any day within the current week (no strict day-by-day gating)
20. THE Curriculum_Platform SHALL mark Days 6-7 as optional catch-up days that don't block progression to the next week

### Requirement 35: Success Milestones and Achievement Tracking

**User Story:** As a learner, I want to see explicit success milestones after completing each module, so that I can understand what skills I've gained.

#### Acceptance Criteria

1. WHEN a learner completes Module 0, THE Curriculum_Platform SHALL display milestone: "You can build CLI tools with OOP and error handling"
2. WHEN a learner completes Module 1, THE Curriculum_Platform SHALL display milestones: "You can run and modify production-grade agentic systems", "You understand the role of LLMs, vector stores, tools, state", "You're confident that complex AI systems are accessible"
3. WHEN a learner completes Module 2, THE Curriculum_Platform SHALL display milestones: "You can explain LLM tokenization from raw bytes to tokens", "You can manually code attention mechanisms", "You understand why LLMs behave strangely with certain inputs", "You're no longer a vibe coder"
4. WHEN a learner completes Module 3, THE Curriculum_Platform SHALL display milestones: "You can build secure MCP servers with OAuth 2.1", "You understand the 'USB-C for AI' protocol", "You can connect any LLM to any enterprise system"
5. WHEN a learner completes Module 4, THE Curriculum_Platform SHALL display milestones: "You can implement Self-RAG, CRAG, RAPTOR", "You can orchestrate multi-agent systems with LangGraph", "You master 7 core agentic design patterns"
6. WHEN a learner completes Module 5, THE Curriculum_Platform SHALL display milestones: "You can deploy containerized AI systems", "You can monitor production systems with distributed tracing", "You can build golden datasets and regression tests", "You're a Verification Engineer, not a vibe coder"
7. WHEN a learner completes Module 6, THE Curriculum_Platform SHALL display milestones: "You have 3 portfolio-ready projects", "You can pass AI engineering interviews", "You're an authoritative architect of autonomous systems"
8. THE Curriculum_Platform SHALL display all achieved milestones in the learner's profile page
9. THE Curriculum_Platform SHALL provide visual badges for each milestone achievement
10. THE Curriculum_Platform SHALL allow learners to share milestone achievements on social media platforms
11. THE Curriculum_Platform SHALL check for milestone unlocking when a learner completes all chapters in a module
12. THE Curriculum_Platform SHALL check for milestone unlocking when a learner passes a module checkpoint
13. THE Curriculum_Platform SHALL automatically unlock milestones without requiring user action
14. THE Curriculum_Platform SHALL display a celebration notification when new milestones are unlocked
15. WHEN social sharing fails, THE Curriculum_Platform SHALL display an error message and allow retry
16. THE Curriculum_Platform SHALL track sharing attempts and success rates for analytics purposes
17. THE Curriculum_Platform SHALL support milestone unlock criteria types: module-completion, checkpoint-pass, and custom criteria

### Requirement 36: Learning Path Duration Calculation and Display

**User Story:** As a learner, I want to see my total estimated duration and remaining weeks, so that I can plan my learning journey.

#### Acceptance Criteria

1. WHEN a learner is assigned Path A (Module 0 Week 1 entry), THE Curriculum_Platform SHALL calculate and display total duration as 30 weeks
2. WHEN a learner is assigned Path B (Module 0 Week 2 entry), THE Curriculum_Platform SHALL calculate and display total duration as 29 weeks
3. WHEN a learner is assigned Path C (Module 1 entry), THE Curriculum_Platform SHALL calculate and display total duration as 28 weeks
4. WHEN a learner is assigned Path D (Module 2 entry), THE Curriculum_Platform SHALL calculate and display total duration as 25 weeks
5. WHEN a learner is assigned Path E (Module 3 entry), THE Curriculum_Platform SHALL calculate and display total duration as 19 weeks
6. THE Curriculum_Platform SHALL display remaining weeks to completion based on current progress
7. THE Curriculum_Platform SHALL display estimated completion date based on 20 hours/week pace
8. THE Curriculum_Platform SHALL recalculate estimated completion date when learner's pace deviates from 20 hours/week
9. THE Curriculum_Platform SHALL display a progress bar showing percentage of total curriculum completed
10. THE Curriculum_Platform SHALL display weeks completed and weeks remaining in the current module
11. THE Curriculum_Platform SHALL provide a visual timeline showing all modules with current position highlighted
12. THE Curriculum_Platform SHALL allow learners to adjust their weekly hour commitment and recalculate estimated completion date
13. THE Curriculum_Platform SHALL display pace status indicators: "On track", "Behind schedule", or "Ahead of schedule"
14. WHEN a learner is behind schedule, THE Curriculum_Platform SHALL display the number of hours behind (e.g., "8 hours behind schedule")
15. WHEN a learner is ahead of schedule, THE Curriculum_Platform SHALL display the number of hours ahead (e.g., "5 hours ahead of schedule")
16. THE Curriculum_Platform SHALL provide recommendations for adjusting weekly hours to get back on track
17. THE Curriculum_Platform SHALL track hours completed in the current week and compare against weekly commitment
18. THE Curriculum_Platform SHALL calculate progress percentage as: (completed chapters / total chapters in learning path) × 100

### Requirement 37: Code Comprehension Exercise Integration

**User Story:** As a learner, I want to practice understanding existing code before writing new code, so that I develop strong code comprehension skills essential for the AI era.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL include "Explain in Plain English" (EiPE) exercises where learners describe code purpose succinctly
2. THE Curriculum_Platform SHALL follow comprehension-first progression: read code → explain code → modify code → create code
3. FOR ALL major concepts, THE Curriculum_Platform SHALL provide existing code examples to analyze before asking learners to write similar code
4. THE Curriculum_Platform SHALL include exercises where learners trace execution flow through existing code
5. THE Curriculum_Platform SHALL include exercises where learners identify bugs in existing code
6. THE Curriculum_Platform SHALL include exercises where learners refactor existing code for clarity or performance
7. THE Curriculum_Platform SHALL provide assessment questions testing code comprehension (e.g., "What does this function return when X?")
8. THE Curriculum_Platform SHALL emphasize that understanding AI-generated code is more important than generating code from scratch
9. THE Curriculum_Platform SHALL include exercises evaluating and improving AI-generated code
10. THE Curriculum_Platform SHALL track learner performance on comprehension exercises separately from generation exercises
11. THE Content_Generator SHALL ensure comprehension exercises precede generation exercises in every chapter
12. THE Content_Generator SHALL provide rubrics for evaluating code explanations (clarity, accuracy, conciseness)

### Requirement 38: Productive Failure Pattern Implementation

**User Story:** As a learner, I want to struggle with problems before receiving instruction, so that I develop deeper understanding through productive failure.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL present challenging problems before providing full instruction on the solution approach
2. THE Curriculum_Platform SHALL allow learners to attempt problems multiple times before revealing hints
3. THE Curriculum_Platform SHALL provide progressive hints that guide without giving away the solution
4. WHEN a learner struggles appropriately (2-3 attempts), THE Curriculum_Platform SHALL provide consolidation instruction explaining the concept
5. THE Curriculum_Platform SHALL include reflection prompts after productive failure experiences
6. THE Curriculum_Platform SHALL distinguish between productive struggle (learning) and unproductive frustration (stuck)
7. WHEN a learner shows signs of unproductive frustration, THE Curriculum_Platform SHALL provide scaffolding to re-engage
8. THE Curriculum_Platform SHALL include "desirable difficulties" that enhance long-term retention
9. THE Content_Generator SHALL design problems that are challenging but solvable with existing knowledge
10. THE Content_Generator SHALL provide consolidation phases after struggle periods to solidify learning
11. THE Curriculum_Platform SHALL track time spent on productive failure exercises to optimize difficulty
12. THE Curriculum_Platform SHALL provide feedback emphasizing that struggle is a sign of learning, not failure

### Requirement 39: Scaffolding Progression Structure

**User Story:** As a learner, I want structured progression from worked examples to independent problem-solving, so that I build competence gradually.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL implement scaffolding progression: worked example → partial example → independent problem
2. FOR ALL major concepts, THE Curriculum_Platform SHALL provide at least one fully worked example with detailed explanation
3. FOR ALL major concepts, THE Curriculum_Platform SHALL provide at least one partial example with TODO comments for learner completion
4. FOR ALL major concepts, THE Curriculum_Platform SHALL provide at least one independent problem requiring full implementation
5. THE Curriculum_Platform SHALL gradually reduce scaffolding as learners progress through a module
6. THE Curriculum_Platform SHALL provide "faded worked examples" where more details are omitted in each successive example
7. THE Curriculum_Platform SHALL include completion guidance showing which parts learners must implement in partial examples
8. THE Curriculum_Platform SHALL provide solution comparisons after learners complete independent problems
9. THE Curriculum_Platform SHALL track learner performance across scaffolding levels to identify when more support is needed
10. THE Content_Generator SHALL ensure scaffolding progression is consistent across all chapters
11. THE Curriculum_Platform SHALL allow learners to request additional scaffolding if they're struggling
12. THE Curriculum_Platform SHALL provide "challenge problems" with no scaffolding for advanced learners

### Requirement 40: Technical Interview Preparation Integration

**User Story:** As a learner, I want integrated technical interview preparation throughout the curriculum, so that I develop communication and problem-solving skills needed for career success.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL include "think-aloud" exercises where learners explain their reasoning while solving problems
2. THE Curriculum_Platform SHALL provide mock interview practice opportunities in each module
3. THE Curriculum_Platform SHALL include peer observation exercises where learners code while others watch (simulating interview conditions)
4. THE Curriculum_Platform SHALL provide rubrics for evaluating technical communication during problem-solving
5. THE Curriculum_Platform SHALL include exercises where learners explain their solution approach before coding
6. THE Curriculum_Platform SHALL include exercises where learners explain their code after writing it
7. THE Curriculum_Platform SHALL provide feedback on communication clarity, not just code correctness
8. THE Curriculum_Platform SHALL include collaborative coding exercises (pair programming, peer code review)
9. THE Curriculum_Platform SHALL track interview preparation practice frequency and provide recommendations
10. THE Curriculum_Platform SHALL provide resources on common interview question patterns and approaches
11. THE Curriculum_Platform SHALL include timed coding challenges simulating interview time pressure
12. THE Curriculum_Platform SHALL provide video examples of strong technical communication during problem-solving
13. THE Content_Generator SHALL integrate interview preparation throughout curriculum, not isolate it to specific modules
14. THE Curriculum_Platform SHALL provide mock interview scheduling and peer matching features (optional for intensive mode)

### Requirement 41: Professional Workflow Integration

**User Story:** As a learner, I want to practice professional development workflows throughout the curriculum, so that I develop industry-ready skills beyond just coding.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL integrate Git workflow practice into all coding exercises
2. THE Curriculum_Platform SHALL require learners to commit code changes with meaningful commit messages
3. THE Curriculum_Platform SHALL include exercises requiring learners to create branches, merge code, and resolve conflicts
4. THE Curriculum_Platform SHALL integrate testing practice into all projects (unit tests, integration tests)
5. THE Curriculum_Platform SHALL require learners to write tests before or alongside implementation code
6. THE Curriculum_Platform SHALL include code review exercises where learners review peer code and provide feedback
7. THE Curriculum_Platform SHALL include deployment exercises where learners deploy projects to production-like environments
8. THE Curriculum_Platform SHALL provide CI/CD pipeline examples and require learners to set up automated testing
9. THE Curriculum_Platform SHALL include documentation exercises where learners write README files and API documentation
10. THE Curriculum_Platform SHALL track professional workflow practice and provide feedback on Git commit quality, test coverage, etc.
11. THE Curriculum_Platform SHALL provide portfolio-building guidance showing how to present projects professionally
12. THE Curriculum_Platform SHALL integrate professional workflows from Module 0 onward, not defer to later modules
13. THE Content_Generator SHALL design projects that are deployable as portfolio pieces
14. THE Curriculum_Platform SHALL provide templates for professional project structure (folder organization, configuration files, etc.)
15. THE Curriculum_Platform SHALL provide project submission functionality for instructor or peer review (integration with Requirement 48)
16. THE Curriculum_Platform SHALL provide a review interface for instructors and peers to evaluate submitted projects
17. THE Curriculum_Platform SHALL provide structured feedback forms based on review rubrics (code quality, documentation, testing, deployment)
18. THE Curriculum_Platform SHALL allow reviewers to provide line-by-line code comments on submitted projects
19. THE Curriculum_Platform SHALL notify learners when their projects receive feedback
20. THE Curriculum_Platform SHALL track project revision cycles (submission → feedback → revision → resubmission)
21. THE Curriculum_Platform SHALL provide feedback templates for common project issues (missing tests, poor documentation, deployment errors)
22. THE Curriculum_Platform SHALL allow learners to respond to feedback and ask clarifying questions
23. THE Curriculum_Platform SHALL display feedback history and revision notes for each project
24. THE Curriculum_Platform SHALL integrate project submission status with portfolio system (Requirement 48)

### Requirement 42: Content Delivery Platform Evaluation

**User Story:** As a curriculum maintainer, I want to evaluate interactive content delivery platforms, so that I can select tools that support reproducibility, version control, and professional workflows.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL evaluate content delivery options including embedded notebooks (Jupyter, marimo), interactive code environments, and custom playgrounds
2. THE Curriculum_Platform SHALL assess platform Git integration and version control friendliness (plain text vs JSON formats)
3. THE Curriculum_Platform SHALL assess platform compatibility with AI coding assistants (Claude, GitHub Copilot, Cursor)
4. THE Curriculum_Platform SHALL assess platform reproducibility rates (can code run reliably when shared?)
5. THE Curriculum_Platform SHALL assess platform support for professional workflows (testing, modular imports, deployment)
6. THE Curriculum_Platform SHALL assess platform support for reactive execution and explicit dependency visualization
7. THE Curriculum_Platform SHALL assess platform deployment capabilities (can notebooks become web apps?)
8. THE Curriculum_Platform SHALL compare platforms based on: reproducibility, Git-friendliness, AI compatibility, professional workflow support, deployment capability
9. THE Curriculum_Platform SHALL provide integration points for embedding external interactive content (marimo notebooks, Jupyter notebooks, etc.)
10. THE Curriculum_Platform SHALL support hybrid approach: web platform for progress tracking and assessments, embedded interactive content for hands-on learning
11. THE Curriculum_Platform SHALL provide content authoring guidelines specifying preferred platform for different content types
12. THE Curriculum_Platform SHALL track content platform usage and learner satisfaction with different interactive environments

### Requirement 43: Parser and Serializer Exercise Requirements

**User Story:** As a learner, I want explicit parser and serializer exercises with round-trip property testing, so that I build robust parsing systems.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL identify all parsers and serializers as explicit exercise requirements
2. WHEN a parser is required, THE Curriculum_Platform SHALL reference the grammar being parsed
3. WHEN a parser is required, THE Curriculum_Platform SHALL require a corresponding pretty printer implementation
4. WHEN a parser is required, THE Curriculum_Platform SHALL require round-trip property tests verifying parse(print(x)) == x
5. THE Curriculum_Platform SHALL provide parser exercises in Module 2 (tokenization), Module 3 (MCP schema validation), and Module 4 (structured output parsing)
6. THE Curriculum_Platform SHALL provide example grammars (BPE token rules, JSON schema, MCP protocol specifications)
7. THE Curriculum_Platform SHALL emphasize that parsers are tricky and round-trip testing is ESSENTIAL for catching bugs
8. THE Curriculum_Platform SHALL provide test frameworks for property-based testing of parsers
9. THE Curriculum_Platform SHALL include exercises testing parser edge cases (empty input, malformed input, boundary conditions)
10. THE Curriculum_Platform SHALL provide feedback on parser correctness based on round-trip property test results
11. THE Content_Generator SHALL include parser/pretty printer pairs in all relevant modules
12. THE Content_Generator SHALL provide rubrics for evaluating parser quality (correctness, error handling, edge case coverage)

### Requirement 44: Delivery Mode Configuration (Optional Enhancement)

**User Story:** As a curriculum administrator, I want to configure the platform for different delivery modes, so that I can support both self-paced and intensive bootcamp learning experiences.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL support configuration for self-paced delivery mode (default)
2. THE Curriculum_Platform SHALL optionally support configuration for intensive bootcamp delivery mode (40-day cohort-based)
3. WHEN intensive mode is enabled, THE Curriculum_Platform SHALL provide cohort management features
4. WHEN intensive mode is enabled, THE Curriculum_Platform SHALL provide daily sprint tracking and accountability mechanisms
5. WHEN intensive mode is enabled, THE Curriculum_Platform SHALL provide synchronous session scheduling and attendance tracking
6. WHEN intensive mode is enabled, THE Curriculum_Platform SHALL provide peer accountability features (group milestones, peer check-ins)
7. THE Curriculum_Platform SHALL use the same unified content modules for both delivery modes
8. THE Curriculum_Platform SHALL adapt pacing and scaffolding based on delivery mode configuration
9. THE Curriculum_Platform SHALL provide delivery mode selection during platform setup
10. THE Curriculum_Platform SHALL allow administrators to switch delivery modes with appropriate data migration
11. THE Curriculum_Platform SHALL provide analytics comparing learner outcomes across delivery modes
12. THE Content_Generator SHALL design content to be delivery-mode-agnostic, with adaptation points for mode-specific customization

### Requirement 45: Discovery Exercise Pattern (Socratic Mentorship)

**User Story:** As a learner, I want exercises that guide me toward solutions without giving them away, so that I develop problem-solving skills through discovery.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL support "Discovery Exercises" that provide guidance without complete solutions
2. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL provide conceptual explanations of the approach
3. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL provide architectural strategies explaining the high-level design
4. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL provide boilerplate code with TODO blocks indicating where learner implementation is required
5. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL include function signatures or class structures
6. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL include import statements for required libraries
7. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL include comments explaining the purpose of each section
8. FOR ALL Discovery Exercises, THE Curriculum_Platform SHALL NOT include complete logic for core operations
9. THE Curriculum_Platform SHALL provide progressive hints that guide without revealing the solution
10. THE Curriculum_Platform SHALL explain why specific tools or approaches are chosen for each exercise
11. THE Curriculum_Platform SHALL identify key challenges learners will encounter and suggest approaches without complete solutions
12. THE Curriculum_Platform SHALL track TODO block completion and provide feedback on implementation approach
13. THE Content_Generator SHALL use Discovery Exercises to complement worked examples and independent problems in scaffolding progression
14. THE Curriculum_Platform SHALL provide solution comparisons after learners complete Discovery Exercises, highlighting different valid approaches

### Requirement 46: Optional Specialization Tracks

**User Story:** As a learner, I want access to optional specialization tracks, so that I can develop domain-specific skills relevant to my career goals.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL support optional specialization tracks as supplementary content
2. THE Curriculum_Platform SHALL provide a specialization track framework for organizing domain-specific projects
3. THE Curriculum_Platform SHALL offer specialization tracks including: Web Scraping, Data Visualization, MLOps, Cloud Deployment, and Security
4. FOR ALL specialization tracks, THE Curriculum_Platform SHALL define 4-5 progressive projects building from fundamentals to advanced techniques
5. FOR ALL specialization tracks, THE Curriculum_Platform SHALL specify prerequisite modules required before starting the track
6. FOR ALL specialization tracks, THE Curriculum_Platform SHALL provide tool progression introducing new libraries and frameworks across projects
7. FOR ALL specialization tracks, THE Curriculum_Platform SHALL define measurable success criteria for each project
8. FOR ALL specialization tracks, THE Curriculum_Platform SHALL provide links to official documentation and high-quality resources (GitHub repos with 1000+ stars)
9. THE Curriculum_Platform SHALL track specialization track completion separately from core module completion
10. THE Curriculum_Platform SHALL award specialization badges upon track completion
11. THE Curriculum_Platform SHALL allow learners to pursue multiple specialization tracks
12. THE Curriculum_Platform SHALL integrate specialization track projects into the portfolio system
13. THE Content_Generator SHALL design specialization tracks to be accessible to both AI Engineers and adjacent roles (Data Analysts, Data Scientists, etc.)
14. THE Curriculum_Platform SHALL provide specialization track recommendations based on learner goals and completed modules

### Requirement 47: Ethical Data Collection Practices

**User Story:** As a learner, I want to learn ethical and legal data collection practices, so that I develop responsible engineering habits.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL include guidance on checking robots.txt files before web scraping
2. THE Curriculum_Platform SHALL include guidance on implementing rate limiting to avoid overwhelming servers
3. THE Curriculum_Platform SHALL include guidance on respecting website terms of service
4. THE Curriculum_Platform SHALL include guidance on identifying when authentication bypass or terms violations are required (and avoiding such targets)
5. THE Curriculum_Platform SHALL provide examples of legal and ethical data collection targets
6. THE Curriculum_Platform SHALL include guidance on data privacy and GDPR compliance when collecting personal data
7. THE Curriculum_Platform SHALL include guidance on proper attribution and citation when using scraped data
8. THE Curriculum_Platform SHALL include guidance on identifying and respecting copyright and intellectual property
9. THE Curriculum_Platform SHALL integrate ethical data collection practices into professional workflow integration (Requirement 41)
10. THE Content_Generator SHALL include ethical considerations in all projects involving external data collection
11. THE Curriculum_Platform SHALL provide a checklist for ethical data collection before starting any scraping or API integration project
12. THE Curriculum_Platform SHALL include case studies of legal issues arising from unethical scraping practices
13. THE Curriculum_Platform SHALL teach learners to use official APIs when available rather than scraping
14. THE Curriculum_Platform SHALL teach learners to identify when data collection requires legal review or permission

### Requirement 48: Project Portfolio System

**User Story:** As a learner, I want to manage and showcase my completed projects in a portfolio, so that I can demonstrate my skills to employers and track my learning journey.

#### Acceptance Criteria

1. THE Curriculum_Platform SHALL provide a project portfolio dashboard displaying all completed projects
2. THE Curriculum_Platform SHALL organize portfolio projects by module and specialization track
3. THE Curriculum_Platform SHALL display project metadata including: title, description, technologies used, completion date, and project type (mini-project, flagship project, capstone, specialization)
4. THE Curriculum_Platform SHALL allow learners to mark projects as "portfolio-ready" after completing quality checks
5. THE Curriculum_Platform SHALL provide a public portfolio URL that learners can share with employers
6. THE Curriculum_Platform SHALL allow learners to customize portfolio visibility (public, private, or unlisted)
7. THE Curriculum_Platform SHALL display project source code with syntax highlighting in the portfolio view
8. THE Curriculum_Platform SHALL display project README files and documentation in the portfolio view
9. THE Curriculum_Platform SHALL allow learners to upload project screenshots and demo videos
10. THE Curriculum_Platform SHALL provide GitHub integration to link portfolio projects to learner's GitHub repositories
11. THE Curriculum_Platform SHALL allow learners to submit projects for instructor or peer review (integration with Requirement 41)
12. WHEN a project is submitted for review, THE Curriculum_Platform SHALL notify reviewers and provide a review interface
13. WHEN a project receives feedback, THE Curriculum_Platform SHALL notify the learner and display feedback in the project view
14. THE Curriculum_Platform SHALL track project submission status: not submitted, pending review, reviewed, revision requested, approved
15. THE Curriculum_Platform SHALL allow learners to resubmit projects after addressing feedback
16. THE Curriculum_Platform SHALL provide a review rubric for evaluating projects based on: code quality, documentation, testing, deployment, and professional workflow practices
17. THE Curriculum_Platform SHALL display review scores and feedback history for each project
18. THE Curriculum_Platform SHALL allow learners to add custom projects (outside curriculum) to their portfolio
19. THE Curriculum_Platform SHALL provide portfolio export functionality (PDF, HTML, or JSON format)
20. THE Curriculum_Platform SHALL track portfolio completeness percentage based on required projects per module
21. THE Curriculum_Platform SHALL provide portfolio templates for different career goals (AI Engineer, Data Scientist, Full-Stack Developer)
22. THE Curriculum_Platform SHALL integrate portfolio projects with certificate generation (Requirement 27)
23. THE Curriculum_Platform SHALL display portfolio-ready project count on learner profile and progress dashboard



## Requirements Update Summary

### Gap Analysis and Integration Updates (2026-05-05)

**Date**: 2026-05-05  
**Source**: Gap analysis comparing requirements, design, and tasks documents  
**Updated By**: AI Engineering Curriculum Team

This requirements document has been updated to address 9 critical gaps identified during comprehensive gap analysis. The updates ensure consistency across requirements, design, and tasks documents, and clarify the platform's role as a **curriculum delivery platform** (not implementing curriculum content itself).

#### Critical Gaps Addressed

**Gap 1: Integration Requirements Missing**
- **Issue**: Requirements 11, 17 lacked integration points with new features (daily content, milestones, duration tracking)
- **Resolution**: Updated Requirement 11 (Progress Tracking System) with 5 new acceptance criteria (AC 9-13) integrating daily content structure, milestone unlocking, and duration recalculation
- **Resolution**: Updated Requirement 17 (Learning Path Customization) with 3 new acceptance criteria (AC 9-11) integrating duration calculation and recalculation on entry point changes

**Gap 2: Inconsistency Between Req 18 and Req 34 on Daily Time Allocations**
- **Issue**: Requirement 18 specified fixed 80/120/40 rhythm without clarifying it applies within each day's allocated hours from Requirement 34
- **Resolution**: Updated Requirement 18 AC 1 to clarify: "80 min Learn, 120 min Build, 40 min Document (applies within each day's allocated hours from Requirement 34)"
- **Resolution**: Added Requirement 18 AC 9 to clarify the rhythm is a suggested breakdown within each day's total hours

**Gap 3: Milestone Unlock Triggers Not Specified in Req 35**
- **Issue**: Requirement 35 didn't specify when milestones should be unlocked (module completion vs checkpoint pass)
- **Resolution**: Added Requirement 35 AC 11-14 specifying unlock triggers: module completion, checkpoint pass, automatic unlocking, and celebration notifications
- **Resolution**: Added Requirement 35 AC 17 specifying supported unlock criteria types: module-completion, checkpoint-pass, and custom criteria

**Gap 4: Current Day Calculation Not Required in Req 34**
- **Issue**: Design document specified current day calculation, but Requirement 34 didn't require it
- **Resolution**: Added Requirement 34 AC 16-20 requiring current day calculation, display, "Continue Learning" button, flexible day access, and optional catch-up days

**Gap 5: Pace Tracking Feedback Mechanism Missing in Req 36**
- **Issue**: Requirement 36 lacked feedback mechanisms for learners behind or ahead of schedule
- **Resolution**: Added Requirement 36 AC 13-17 requiring pace status indicators, hours behind/ahead display, and recommendations for adjusting weekly hours

**Gap 6: Content Authoring Tools Not Specified in Req 26**
- **Issue**: Requirement 26 lacked authoring tools for creating daily content structures and milestones
- **Resolution**: Added Requirement 26 AC 9-16 requiring authoring tools for week structures, daily content, milestones, validation, data migration, and learner notifications

**Gap 7: Analytics for New Features Missing in Req 25**
- **Issue**: Requirement 25 lacked analytics for daily completion rates, milestone achievements, and pace tracking
- **Resolution**: Added Requirement 25 AC 11-16 requiring analytics for daily completion, milestone achievements, pace trends, at-risk learners, mini-projects, and flagship projects

**Gap 8: Project Portfolio Management (NEW REQUIREMENT)**
- **Issue**: Platform lacked comprehensive project portfolio system for showcasing completed work
- **Resolution**: Added new Requirement 48 (Project Portfolio System) with 23 acceptance criteria covering:
  * Portfolio dashboard and organization by module/track
  * Project metadata and visibility controls
  * Public portfolio URLs for employer sharing
  * GitHub integration and custom project support
  * Portfolio export functionality (PDF, HTML, JSON)
  * Portfolio templates for different career goals
  * Integration with certificate generation (Requirement 27)

**Gap 9: Project Submission and Feedback (REQUIREMENT EXTENSION)**
- **Issue**: Platform lacked structured project submission and feedback mechanisms
- **Resolution**: Extended Requirement 41 (Professional Workflow Integration) with 10 new acceptance criteria (AC 15-24) covering:
  * Project submission functionality for instructor/peer review
  * Review interface with structured feedback forms
  * Line-by-line code comments on submitted projects
  * Notification system for feedback
  * Project revision cycle tracking (submission → feedback → revision → resubmission)
  * Feedback templates for common issues
  * Learner response and clarification mechanisms
  * Integration with portfolio system (Requirement 48)

#### Updated Requirements Summary

**Requirement 11 (Progress Tracking System)**
- Added 5 new acceptance criteria (AC 9-13) for integration with daily content, milestones, and duration tracking
- Total acceptance criteria: 15 (was 8)

**Requirement 17 (Learning Path Customization)**
- Added 3 new acceptance criteria (AC 9-11) for duration recalculation on entry point changes
- Total acceptance criteria: 11 (was 8)

**Requirement 18 (Daily Rhythm and Scheduling)**
- Updated AC 1 to clarify 80/120/40 rhythm applies within each day's allocated hours
- Added AC 9 to clarify rhythm is a suggested breakdown
- Total acceptance criteria: 9 (was 8)

**Requirement 25 (Analytics and Insights)**
- Added 6 new acceptance criteria (AC 11-16) for analytics on daily completion, milestones, and pace tracking
- Total acceptance criteria: 16 (was 10)

**Requirement 26 (Content Versioning and Updates)**
- Added 8 new acceptance criteria (AC 9-16) for content authoring tools and data migration
- Total acceptance criteria: 16 (was 8)

**Requirement 34 (Daily Content Structure and Scheduling)**
- Added 5 new acceptance criteria (AC 16-20) for current day calculation and display
- Total acceptance criteria: 20 (was 15)

**Requirement 35 (Success Milestones and Achievement Tracking)**
- Added 7 new acceptance criteria (AC 11-17) for milestone unlock triggers and social sharing
- Total acceptance criteria: 17 (was 10)

**Requirement 36 (Learning Path Duration Calculation and Display)**
- Added 5 new acceptance criteria (AC 13-18) for pace tracking feedback mechanisms
- Total acceptance criteria: 18 (was 12)

**Requirement 41 (Professional Workflow Integration)**
- Added 10 new acceptance criteria (AC 15-24) for project submission and feedback
- Total acceptance criteria: 24 (was 14)

**Requirement 48 (Project Portfolio System) - NEW**
- Added new requirement with 23 acceptance criteria
- Covers portfolio management, project showcase, GitHub integration, submission/feedback, and employer sharing

#### Platform Clarification

**This is a curriculum delivery platform** that guides learners through building projects. The platform:
- **DOES**: Deliver content, track progress, provide interactive elements, manage daily schedules, track milestones, calculate durations, manage project portfolios, facilitate project submission and feedback
- **DOES NOT**: Implement the curriculum content itself (e.g., not building MCP servers or LangGraph agents)

All requirements focus on platform functionality for delivering and managing curriculum content, not the AI engineering concepts being taught.

#### Total Requirements

- **Before Gap Analysis**: 47 requirements
- **Added**: 1 new requirement (Requirement 48)
- **Updated**: 9 existing requirements (11, 17, 18, 25, 26, 34, 35, 36, 41)
- **Total**: 48 requirements

#### Implementation Impact

**Estimated Additional Effort**: 80-120 hours (1-1.5 months with 2-3 engineers)

**New Components Required**:
- Project portfolio dashboard and management system
- Project submission and review interface
- Feedback system with line-by-line commenting
- Portfolio export functionality (PDF, HTML, JSON)
- GitHub integration for portfolio projects
- Portfolio templates for different career goals
- Enhanced analytics for daily completion, milestones, and pace tracking
- Content authoring tools for daily content and milestones
- Data migration tools for existing learners

**Benefits**:
- Consistent integration across all platform features
- Clear platform role as curriculum delivery system
- Comprehensive project portfolio for employer showcase
- Structured project submission and feedback workflow
- Enhanced analytics for content improvement
- Improved content authoring and maintenance tools
- Better learner experience with pace tracking feedback

### Merge from Teaching Methodology Evaluation Spec

**Date**: 2026-05-05  
**Source**: `ai-engineering-library/.kiro/specs/teaching-methodology-evaluation`  
**Merged By**: AI Engineering Curriculum Team

This requirements document has been enhanced with evidence-based pedagogical insights from the Teaching Methodology Evaluation spec. The following 8 new requirements (37-44) have been added to incorporate 2024-2026 research on effective teaching practices:

#### New Requirements Added (Teaching Methodology Evaluation)

**Requirement 37: Code Comprehension Exercise Integration**
- **Rationale**: 2024-2026 research emphasizes code comprehension before generation in the AI era
- **Key Features**: EiPE exercises, read-explain-modify-create progression, AI code evaluation
- **Impact**: Transforms learners from "vibe coders" to engineers who understand code deeply

**Requirement 38: Productive Failure Pattern Implementation**
- **Rationale**: Research shows struggle before instruction enhances long-term retention
- **Key Features**: Desirable difficulties, progressive hints, consolidation phases
- **Impact**: Builds deeper understanding through productive struggle

**Requirement 39: Scaffolding Progression Structure**
- **Rationale**: Evidence-based progression from worked examples to independent problem-solving
- **Key Features**: Worked example → partial example → independent problem progression
- **Impact**: Gradual competence building with appropriate support

**Requirement 40: Technical Interview Preparation Integration**
- **Rationale**: 2025 Virginia Tech research shows 54% technical interview pass rate; communication practice is critical
- **Key Features**: Think-aloud practice, mock interviews, peer observation, timed challenges
- **Impact**: Career readiness through integrated interview preparation

**Requirement 41: Professional Workflow Integration**
- **Rationale**: Industry-aligned education requires professional development practices
- **Key Features**: Git workflows, testing, code review, deployment, CI/CD, documentation
- **Impact**: Portfolio-ready projects and industry-ready skills

**Requirement 42: Content Delivery Platform Evaluation**
- **Rationale**: Platform choice affects reproducibility, version control, and professional workflows
- **Key Features**: Evaluation of Jupyter, marimo, and alternatives; Git-native and AI-compatible platforms
- **Impact**: Optimal platform selection for learning effectiveness

**Requirement 43: Parser and Serializer Exercise Requirements**
- **Rationale**: Parsers are tricky; round-trip property testing is essential for correctness
- **Key Features**: Parser/pretty printer pairs, round-trip tests, edge case coverage
- **Impact**: Robust parsing systems with verified correctness

**Requirement 44: Delivery Mode Configuration (Optional Enhancement)**
- **Rationale**: Unified content with differentiated delivery supports both self-paced and intensive learning
- **Key Features**: Self-paced (default) and intensive bootcamp (40-day cohort) modes
- **Impact**: Flexibility to support different learning contexts with same content

### Merge from Web Scraping Curriculum Spec

**Date**: 2026-05-05  
**Source**: `ai-engineering-library/.kiro/specs/web-scraping-curriculum`  
**Merged By**: AI Engineering Curriculum Team

This requirements document has been enhanced with pedagogical patterns and specialization track framework from the Web Scraping Curriculum spec. The following 3 new requirements (45-47) have been added:

#### New Requirements Added (Web Scraping Curriculum)

**Requirement 45: Discovery Exercise Pattern (Socratic Mentorship)**
- **Rationale**: Socratic mentorship approach develops problem-solving skills through guided discovery
- **Key Features**: Boilerplate code with TODO blocks, architectural guidance, progressive hints, no complete solutions
- **Impact**: Learners develop problem-solving skills rather than just copying code
- **Applicability**: Useful across ALL modules, not just web scraping

**Requirement 46: Optional Specialization Tracks**
- **Rationale**: Learners need domain-specific skills beyond core AI engineering (web scraping, data viz, MLOps, etc.)
- **Key Features**: 4-5 progressive projects per track, tool progression, measurable success criteria, specialization badges
- **Tracks Included**: Web Scraping, Data Visualization, MLOps, Cloud Deployment, Security
- **Impact**: Career flexibility and domain expertise for diverse roles (AI Engineers, Data Analysts, Data Scientists)

**Requirement 47: Ethical Data Collection Practices**
- **Rationale**: Responsible engineering requires understanding legal and ethical data collection
- **Key Features**: robots.txt checking, rate limiting, terms of service compliance, privacy considerations
- **Impact**: Develops responsible engineering habits and avoids legal issues
- **Integration**: Enhances professional workflow integration (Requirement 41)

#### Enhanced Existing Requirements

The following existing requirements have been conceptually enhanced by the pedagogical insights, though their text remains unchanged:

- **Requirement 15 (Code Playground Infrastructure)**: Now informed by code comprehension-first approach
- **Requirement 16 (Assessment and Evaluation)**: Now includes comprehension vs generation tracking
- **Requirement 10 (Chapter Structure)**: Now informed by scaffolding progression and productive failure patterns
- **Requirement 13 (Content Quality Standards)**: Now includes professional workflow and interview prep integration
- **Requirement 39 (Scaffolding Progression)**: Now complemented by Discovery Exercise pattern

#### Total Requirements

- **Original**: 36 requirements
- **Added from Teaching Methodology**: 8 requirements (37-44)
- **Added from Web Scraping**: 3 requirements (45-47)
- **Total**: 47 requirements

#### Implementation Impact

**Estimated Additional Effort**: 250-350 hours (2.5-3.5 months with 3-4 engineers)

**New Components Required**:
- Code comprehension exercise types and assessment
- Productive failure hint system and struggle tracking
- Scaffolding progression tracking
- Interview preparation tracking and mock interview scheduling
- Professional workflow integration (Git, testing, deployment)
- Content delivery platform integration (marimo/Jupyter embedding)
- Parser exercise validation with property-based testing
- **Discovery exercise component with TODO block tracking**
- **Specialization track framework and project management**
- **Ethical data collection checklist and guidance system**
- Optional: Intensive mode cohort management

**Benefits**:
- Evidence-based pedagogical practices from 2024-2026 research
- Stronger code comprehension skills (critical for AI era)
- Better interview preparation and career readiness
- Professional workflow integration from day one
- Platform flexibility for optimal learning experience
- Unified content architecture supporting multiple delivery modes
- **Problem-solving skills through Socratic mentorship**
- **Domain-specific expertise through specialization tracks**
- **Responsible engineering practices for data collection**
- **Career flexibility for AI Engineers, Data Analysts, and Data Scientists**

#### Specialization Track: Web Scraping

The web scraping curriculum has been integrated as the first specialization track. See `web-scraping-specialization.md` for the complete 4-5 project curriculum including:

- **Project 1**: Static content extraction with requests and BeautifulSoup
- **Project 2**: Pagination handling
- **Project 3**: Dynamic content with Playwright/Selenium (Yellow Pages target)
- **Project 4**: Session management and cookies
- **Project 5**: Spidering and crawling with Scrapy

Each project includes:
- Tool progression (requests/BeautifulSoup → Playwright/Selenium → Scrapy)
- Socratic guidance (architectural strategies, pseudocode, boilerplate with TODOs)
- Measurable success criteria (CSV output with specific columns)
- Ethical scraping practices (robots.txt, rate limiting)
- Links to official documentation and GitHub repos (1000+ stars)

#### References

- Teaching Methodology Evaluation Spec: `ai-engineering-library/.kiro/specs/teaching-methodology-evaluation`
- Web Scraping Curriculum Spec: `ai-engineering-library/.kiro/specs/web-scraping-curriculum`
- Capstone Pedagogical Enhancement Spec: `ai-engineering-library/.kiro/specs/capstone-pedagogical-enhancement`
- 2024-2026 Pedagogical Research: Code comprehension, productive failure, scaffolding, interview preparation
- 2025 Virginia Tech Research: Technical interview preparation and communication skills
- Platform Research: Git-native platforms (marimo), reproducibility, AI compatibility
- Socratic Mentorship: Discovery-based learning without complete solutions

### Merge from Capstone Pedagogical Enhancement Spec

**Date**: 2026-05-05  
**Source**: `ai-engineering-library/.kiro/specs/capstone-pedagogical-enhancement` (12 requirements)  
**Merged By**: AI Engineering Curriculum Team

This requirements document has been enhanced with 6 pedagogical patterns integrated into Requirement 8 (Capstone Projects Content). The full 12 requirements from the source spec have been reviewed and relevant content merged.

#### Capstone Pedagogical Patterns Added to Req 8

**Pattern 1: Code Comprehension First**
- **Rationale**: 2024-2026 research emphasizes code comprehension before generation in the AI era
- **Key Features**: EiPE exercises, read-explain-modify-create progression, AI code evaluation
- **Impact**: Transforms learners from "vibe coders" to engineers who understand code deeply
- **Source Req**: Req 4 (Integrate Code Comprehension First Pattern)

**Pattern 2: Technical Interview Preparation**
- **Rationale**: 2025 Virginia Tech research shows 54% technical interview pass rate; communication practice is critical
- **Key Features**: Think-aloud practice, mock interviews, peer observation, timed challenges
- **Impact**: Career readiness through integrated interview preparation
- **Source Req**: Req 5 (Integrate Technical Interview Preparation)

**Pattern 3: Professional Workflow Integration**
- **Rationale**: Industry-aligned education requires professional development practices
- **Key Features**: Git workflows, testing, code review, deployment, CI/CD, documentation
- **Impact**: Portfolio-ready projects and industry-ready skills
- **Source Req**: Req 6 (Integrate Professional Workflow Practices)

**Pattern 4: Platform and Tooling**
- **Rationale**: Platform choice affects reproducibility, version control, and professional workflows
- **Key Features**: Git-native design, AI compatibility, reproducible execution, deployment capability
- **Impact**: Optimal platform selection for learning effectiveness
- **Source Req**: Req 7 (Integrate Platform and Tooling Recommendations)

**Pattern 5: Scaffolding Progression**
- **Rationale**: Evidence-based progression from worked examples to independent problem-solving
- **Key Features**: Worked example → partial example → independent problem progression
- **Impact**: Gradual competence building with appropriate support
- **Source Req**: Req 8 (Integrate Scaffolding Progression)

**Pattern 6: Multi-Modal Learning Support**
- **Rationale**: Different learning styles require multiple modalities for effective engagement
- **Key Features**: Visual explanations, hands-on exercises, conversational tone
- **Impact**: Inclusive learning experience for diverse preferences
- **Source Req**: Req 9 (Integrate Multi-Modal Learning Support)

#### Additional Requirements Reviewed (Not Directly Merged)

The following requirements from the Capstone Pedagogical Enhancement spec were reviewed but deemed more appropriate for the separate Capstone Documentation Enhancer system (not the core curriculum platform):

- **Req 1**: Analyze Existing Capstone Documentation (belongs to Documentation Analyzer component)
- **Req 2**: Map Pedagogical Patterns to Project Guides (belongs to Pattern Mapper component)
- **Req 3**: Identify Enhancement Opportunities (belongs to Enhancement Engine component)
- **Req 10**: Create Unified Chapter Template (belongs to Template Generator component)
- **Req 11**: Apply Template to Sample Project (belongs to Template Generator component)
- **Req 12**: Validate Pedagogical Pattern Integration (belongs to Validation Engine component)

These requirements remain in the source spec for the standalone Capstone Documentation Enhancer system.

---

**Next Steps**:
1. Update design document with new components and data models
2. Add implementation tasks for new requirements
3. Update content authoring guidelines with new pedagogical patterns
4. Evaluate content delivery platforms (marimo vs Jupyter vs alternatives)
5. Design code comprehension exercise types and assessment rubrics
6. Design interview preparation tracking and mock interview features
7. Design professional workflow integration points
8. **Design Discovery Exercise component with TODO block tracking**
9. **Design specialization track framework and project structure**
10. **Create web-scraping-specialization.md with 4-5 projects**
11. **Design ethical data collection checklist and guidance**
12. Plan optional intensive mode features for future enhancement

**Next Steps**:
1. Update design document with new components and data models
2. Add implementation tasks for new requirements
3. Update content authoring guidelines with new pedagogical patterns
4. Evaluate content delivery platforms (marimo vs Jupyter vs alternatives)
5. Design code comprehension exercise types and assessment rubrics
6. Design interview preparation tracking and mock interview features
7. Design professional workflow integration points
8. **Design Discovery Exercise component with TODO block tracking**
9. **Design specialization track framework and project structure**
10. **Create web-scraping-specialization.md with 4-5 projects**
11. **Design ethical data collection checklist and guidance**
12. Plan optional intensive mode features for future enhancement
