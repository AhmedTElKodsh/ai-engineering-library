# Requirements Document: Capstone Pedagogical Enhancement

## Document Information

**Version**: 1.0  
**Last Updated**: 2026-05-02  
**Status**: Draft  
**Owner**: Curriculum Design Team

## Introduction

This feature updates the capstone project documentation (financial technology project guides) to incorporate evidence-based pedagogical improvements identified in the teaching methodology evaluation. The capstone consists of three financial technology documentation files that guide learners through building real-world fintech projects. These documents will be enhanced with pedagogical patterns proven to improve learning outcomes, technical interview readiness, and professional skill development.

The enhancement integrates six key pedagogical improvements from the teaching methodology evaluation:
1. Code Comprehension First (read → explain → modify → create progression)
2. Technical Interview Preparation (think-aloud practice, mock interviews, peer observation)
3. Professional Workflow Integration (Git, testing, deployment, portfolio-building)
4. Platform and Tooling (Git-native design, AI compatibility, reproducible execution)
5. Scaffolding Progression (worked example → partial example → independent problem)
6. Multi-Modal Learning (visual, hands-on, conversational)

## Goals and Success Criteria

### Primary Goals
1. **Evidence-Based Enhancement**: Ground all documentation improvements in pedagogical research from teaching methodology evaluation
2. **Interview Readiness**: Address the 54% technical interview pass rate problem through integrated practice
3. **Professional Workflow**: Ensure all projects teach industry-standard development practices
4. **Unified Template**: Create a reusable chapter template for future project documentation
5. **Comprehensive Coverage**: Update all three capstone documentation files systematically

### Success Criteria
- All six pedagogical improvements integrated into project guides
- Each project includes code comprehension exercises before code generation
- Technical interview preparation integrated throughout (not isolated)
- Professional workflow (Git, testing, deployment) emphasized in all projects
- Projects are deployable as portfolio pieces
- Platform recommendations support AI-era compatibility and Git-native design
- Unified chapter template created and applied to at least one project

## Glossary

### Documentation Components
- **Capstone_Documentation**: The three financial technology project guide files
- **Quick_Start_Guide**: docs/quick-start-financial-projects.md - Project ideas and quick start guide
- **Technology_Stack_Guide**: docs/technology-stack-comparison.md - Technology stack recommendations
- **Research_Report**: docs/financial-market-projects-research-2026.md - Comprehensive research report
- **Chapter_Template**: Unified structure for project documentation with pedagogical patterns
- **Project_Guide**: A complete guide for building a specific financial technology project

### Pedagogical Patterns
- **Code_Comprehension_First**: Pedagogical pattern emphasizing understanding existing code before writing new code
- **EiPE_Exercise**: "Explain in Plain English" exercise where students describe code purpose succinctly
- **Comprehension_Progression**: Structured sequence: read → explain → modify → create
- **Think_Aloud_Practice**: Explaining code and reasoning while solving problems (critical interview skill)
- **Mock_Interview**: Simulated technical interview with observers for authentic practice
- **Scaffolding_Progression**: Structured sequence from worked examples to independent problem-solving
- **Multi_Modal_Learning**: Supporting visual, hands-on, and conversational learning modalities

### Professional Skills
- **Professional_Workflow**: Industry-standard development practices (Git, testing, deployment, code review)
- **Git_Workflow**: Version control practices (commit, push, pull, branch, merge)
- **Portfolio_Project**: Deployable project demonstrating skills to potential employers
- **Technical_Interview_Preparation**: Practice and training for coding interviews including communication
- **Peer_Code_Review**: Collaborative code review and feedback mechanisms
- **Deployment_Practice**: Experience deploying projects to production environments

### Platform and Tooling
- **Git_Native_Platform**: Platform that stores content as plain text files compatible with version control
- **AI_Compatible_Platform**: Platform that works effectively with AI coding assistants
- **Reproducible_Execution**: Platform capability ensuring code runs reliably when shared
- **Reactive_Notebook**: Notebook environment that automatically updates dependent cells

### Enhancement Components
- **Documentation_Enhancer**: The system that updates capstone documentation with pedagogical patterns
- **Pattern_Integrator**: Component that integrates pedagogical patterns into project guides
- **Template_Generator**: Component that creates unified chapter template
- **Validation_Engine**: Component that verifies pedagogical pattern integration

## Requirements

### Requirements Overview

This system has 12 functional requirements organized into 4 categories:

**Documentation Analysis (Requirements 1-3)**
- Req 1: Analyze Existing Capstone Documentation
- Req 2: Map Pedagogical Patterns to Project Guides
- Req 3: Identify Enhancement Opportunities

**Pattern Integration (Requirements 4-9)**
- Req 4: Integrate Code Comprehension First Pattern
- Req 5: Integrate Technical Interview Preparation
- Req 6: Integrate Professional Workflow Practices
- Req 7: Integrate Platform and Tooling Recommendations
- Req 8: Integrate Scaffolding Progression
- Req 9: Integrate Multi-Modal Learning Support

**Template Creation (Requirements 10-11)**
- Req 10: Create Unified Chapter Template
- Req 11: Apply Template to Sample Project

**Validation (Requirement 12)**
- Req 12: Validate Pedagogical Pattern Integration

---

### Requirement 1: Analyze Existing Capstone Documentation

**Priority**: High  
**Category**: Documentation Analysis  
**User Story:** As a curriculum designer, I want to analyze the existing capstone documentation structure and content, so that I can identify where to integrate pedagogical patterns without disrupting existing valuable content.

#### Acceptance Criteria

1. THE Documentation_Enhancer SHALL parse all three capstone documentation files
2. THE Documentation_Enhancer SHALL extract the current structure of each document (sections, subsections, code examples)
3. THE Documentation_Enhancer SHALL identify existing pedagogical elements (if any) in current documentation
4. THE Documentation_Enhancer SHALL identify code examples and technical content in each document
5. THE Documentation_Enhancer SHALL identify project descriptions and implementation guidance
6. THE Documentation_Enhancer SHALL create a structural map of each document showing sections and content types
7. THE Documentation_Enhancer SHALL identify sections that are purely informational versus instructional
8. THE Documentation_Enhancer SHALL assess the current learning progression in each document

### Requirement 2: Map Pedagogical Patterns to Project Guides

**Priority**: High  
**Category**: Documentation Analysis  
**User Story:** As a curriculum designer, I want to map the six pedagogical improvements to specific sections of the project guides, so that I know exactly where each pattern should be integrated.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL identify sections in Quick_Start_Guide suitable for code comprehension exercises
2. THE Pattern_Integrator SHALL identify sections in Technology_Stack_Guide suitable for technical interview preparation
3. THE Pattern_Integrator SHALL identify sections in Research_Report suitable for professional workflow integration
4. THE Pattern_Integrator SHALL create a mapping document showing which patterns apply to which sections
5. FOR ALL six pedagogical patterns, THE Pattern_Integrator SHALL identify at least three integration points across the three documents
6. THE Pattern_Integrator SHALL prioritize integration points by impact on learning outcomes
7. THE Pattern_Integrator SHALL identify sections where multiple patterns can be integrated together
8. THE Pattern_Integrator SHALL verify that patterns are distributed throughout documents (not clustered in one section)

### Requirement 3: Identify Enhancement Opportunities

**Priority**: High  
**Category**: Documentation Analysis  
**User Story:** As a curriculum designer, I want to identify specific opportunities to enhance the documentation with pedagogical patterns, so that I can create a prioritized enhancement plan.

#### Acceptance Criteria

1. THE Documentation_Enhancer SHALL identify code examples that lack comprehension exercises
2. THE Documentation_Enhancer SHALL identify project descriptions that lack interview preparation guidance
3. THE Documentation_Enhancer SHALL identify technical content that lacks professional workflow context
4. THE Documentation_Enhancer SHALL identify platform recommendations that lack Git-native or AI-compatibility considerations
5. THE Documentation_Enhancer SHALL identify instructional content that lacks scaffolding progression
6. THE Documentation_Enhancer SHALL identify sections that could benefit from multi-modal learning support
7. FOR ALL identified opportunities, THE Documentation_Enhancer SHALL estimate the enhancement effort (low, medium, high)
8. FOR ALL identified opportunities, THE Documentation_Enhancer SHALL estimate the expected learning impact (low, medium, high)
9. THE Documentation_Enhancer SHALL prioritize opportunities by impact-to-effort ratio
10. THE Documentation_Enhancer SHALL create an enhancement roadmap organizing opportunities by priority

### Requirement 4: Integrate Code Comprehension First Pattern

**Priority**: High  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to integrate code comprehension exercises before code generation tasks, so that learners develop the critical skill of reading and understanding code before writing it.

#### Acceptance Criteria

1. FOR ALL code examples in capstone documentation, THE Pattern_Integrator SHALL add "Explain in Plain English" (EiPE) exercises
2. THE Pattern_Integrator SHALL structure code learning as: read → explain → modify → create
3. THE Pattern_Integrator SHALL add exercises asking learners to explain what existing code does before writing new code
4. THE Pattern_Integrator SHALL include exercises on evaluating and improving AI-generated code
5. THE Pattern_Integrator SHALL add comprehension questions for complex code examples
6. THE Pattern_Integrator SHALL provide sample answers or rubrics for comprehension exercises
7. THE Pattern_Integrator SHALL ensure comprehension exercises appear before generation exercises in all projects
8. THE Pattern_Integrator SHALL add guidance on reading and understanding codebases before modifying them
9. THE Pattern_Integrator SHALL reference 2024-2026 research on AI-era programming education where appropriate

### Requirement 5: Integrate Technical Interview Preparation

**Priority**: High  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to integrate technical interview preparation throughout the project guides, so that learners develop communication and problem-solving skills needed to pass technical interviews.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL add "explain your solution" exercises to all major project milestones
2. THE Pattern_Integrator SHALL add think-aloud practice opportunities (coding while explaining)
3. THE Pattern_Integrator SHALL add mock interview scenarios for key technical concepts
4. THE Pattern_Integrator SHALL add collaborative coding practice guidance (pair programming, peer observation)
5. THE Pattern_Integrator SHALL add peer code review mechanisms to project workflows
6. THE Pattern_Integrator SHALL integrate interview preparation throughout projects (not isolated to one section)
7. THE Pattern_Integrator SHALL add guidance on practicing coding with observers (authentic interview simulation)
8. THE Pattern_Integrator SHALL reference the 54% technical interview pass rate problem and how practice addresses it
9. THE Pattern_Integrator SHALL add communication skills practice to technical exercises
10. THE Pattern_Integrator SHALL ensure interview preparation is present in all three documentation files

### Requirement 6: Integrate Professional Workflow Practices

**Priority**: High  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to integrate professional workflow practices throughout the project guides, so that learners develop industry-standard development skills alongside technical knowledge.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL add Git workflow practice to all project guides (commit, push, pull, branch, merge)
2. THE Pattern_Integrator SHALL add testing practice guidance (unit tests, integration tests, TDD)
3. THE Pattern_Integrator SHALL add deployment guidance for all projects (make projects deployable as portfolio pieces)
4. THE Pattern_Integrator SHALL add code review practice to project workflows
5. THE Pattern_Integrator SHALL emphasize professional development workflows (not just coding in isolation)
6. THE Pattern_Integrator SHALL add guidance on creating portfolio-ready projects
7. THE Pattern_Integrator SHALL add CI/CD pipeline guidance where appropriate
8. THE Pattern_Integrator SHALL add documentation best practices to project guides
9. THE Pattern_Integrator SHALL ensure professional workflow is integrated throughout (not isolated to one section)
10. THE Pattern_Integrator SHALL reference 2024-2026 research on industry-aligned education where appropriate

### Requirement 7: Integrate Platform and Tooling Recommendations

**Priority**: High  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to update platform and tooling recommendations to support Git-native design and AI-era compatibility, so that learners use tools that support modern development practices.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL evaluate current platform recommendations against Git-native criteria (plain text, clean diffs)
2. THE Pattern_Integrator SHALL evaluate current platform recommendations against AI-compatibility criteria
3. THE Pattern_Integrator SHALL evaluate current platform recommendations against reproducible execution criteria
4. THE Pattern_Integrator SHALL add platform recommendations that support deployment as portfolio pieces
5. THE Pattern_Integrator SHALL add guidance on choosing platforms that support professional workflows
6. THE Pattern_Integrator SHALL update Technology_Stack_Guide with Git-native and AI-compatible platform options
7. THE Pattern_Integrator SHALL add reactive notebook recommendations (e.g., marimo) where appropriate
8. THE Pattern_Integrator SHALL add guidance on platform choices that support testing and modular code
9. THE Pattern_Integrator SHALL ensure platform recommendations support both learning and professional development
10. THE Pattern_Integrator SHALL reference 2024-2026 research on reproducibility and professional tooling

### Requirement 8: Integrate Scaffolding Progression

**Priority**: High  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to structure project learning with scaffolding progression, so that learners move from worked examples to independent problem-solving systematically.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL structure project learning as: worked example → partial example → independent problem
2. THE Pattern_Integrator SHALL ensure code comprehension exercises precede code generation exercises
3. THE Pattern_Integrator SHALL add worked examples for complex technical concepts
4. THE Pattern_Integrator SHALL add partial examples where learners complete missing sections
5. THE Pattern_Integrator SHALL add independent problems where learners apply concepts without scaffolding
6. THE Pattern_Integrator SHALL ensure progressive complexity layering throughout projects
7. THE Pattern_Integrator SHALL add guidance on when to provide scaffolding versus productive struggle
8. THE Pattern_Integrator SHALL ensure scaffolding progression is present in all three documentation files
9. THE Pattern_Integrator SHALL add clear transitions between scaffolding levels

### Requirement 9: Integrate Multi-Modal Learning Support

**Priority**: Medium  
**Category**: Pattern Integration  
**User Story:** As a curriculum designer, I want to add multi-modal learning support to project guides, so that learners with different learning preferences can engage effectively with the content.

#### Acceptance Criteria

1. THE Pattern_Integrator SHALL add visual explanations (diagrams, concept maps) for complex technical concepts
2. THE Pattern_Integrator SHALL ensure hands-on exercises are present for all major concepts (kinesthetic learning)
3. THE Pattern_Integrator SHALL maintain conversational tone throughout documentation (auditory learners)
4. THE Pattern_Integrator SHALL add architecture diagrams for system design concepts
5. THE Pattern_Integrator SHALL add flowcharts for process-oriented content
6. THE Pattern_Integrator SHALL add visual progress indicators for project milestones
7. THE Pattern_Integrator SHALL ensure multi-modal elements support rather than distract from learning
8. THE Pattern_Integrator SHALL add guidance on when to use different learning modalities

### Requirement 10: Create Unified Chapter Template

**Priority**: High  
**Category**: Template Creation  
**User Story:** As a curriculum designer, I want to create a unified chapter template incorporating all pedagogical patterns, so that future project documentation automatically follows evidence-based best practices.

#### Acceptance Criteria

1. THE Template_Generator SHALL create a unified chapter template incorporating all six pedagogical patterns
2. THE template SHALL include sections for code comprehension exercises
3. THE template SHALL include sections for technical interview preparation
4. THE template SHALL include sections for professional workflow guidance
5. THE template SHALL include sections for platform and tooling recommendations
6. THE template SHALL include scaffolding progression structure (worked → partial → independent)
7. THE template SHALL include multi-modal learning elements (visual, hands-on, conversational)
8. THE template SHALL include inline comments explaining pedagogical rationale for each section
9. THE template SHALL include an author checklist to verify all patterns are implemented
10. THE template SHALL include examples of common mistakes and how to avoid them
11. THE template SHALL specify platform format requirements (Git-native, AI-compatible, reproducible)
12. THE template SHALL include guidance on adapting the template for different project types
13. THE template SHALL be provided in Markdown format for easy reuse

### Requirement 11: Apply Template to Sample Project

**Priority**: High  
**Category**: Template Creation  
**User Story:** As a curriculum designer, I want to apply the unified chapter template to at least one sample project, so that I can validate the template works in practice and provide a concrete example.

#### Acceptance Criteria

1. THE Template_Generator SHALL select one project from the capstone documentation for template application
2. THE Template_Generator SHALL restructure the selected project using the unified chapter template
3. THE Template_Generator SHALL ensure all six pedagogical patterns are present in the restructured project
4. THE Template_Generator SHALL verify the restructured project maintains all original technical content
5. THE Template_Generator SHALL verify the restructured project improves learning progression
6. THE Template_Generator SHALL add all template-required sections to the project
7. THE Template_Generator SHALL provide before/after comparison showing template improvements
8. THE Template_Generator SHALL document any template adjustments needed during application
9. THE Template_Generator SHALL create a guide for applying the template to other projects

### Requirement 12: Validate Pedagogical Pattern Integration

**Priority**: High  
**Category**: Validation  
**User Story:** As a curriculum designer, I want to validate that all pedagogical patterns are correctly integrated into the capstone documentation, so that I can ensure the enhancement meets quality standards.

#### Acceptance Criteria

1. THE Validation_Engine SHALL verify all three capstone documentation files include code comprehension exercises
2. THE Validation_Engine SHALL verify all three files include technical interview preparation elements
3. THE Validation_Engine SHALL verify all three files include professional workflow guidance
4. THE Validation_Engine SHALL verify platform recommendations support Git-native design and AI compatibility
5. THE Validation_Engine SHALL verify scaffolding progression is present in all projects
6. THE Validation_Engine SHALL verify multi-modal learning support is present in all files
7. THE Validation_Engine SHALL verify pedagogical patterns are distributed throughout documents (not clustered)
8. THE Validation_Engine SHALL verify code comprehension exercises precede code generation exercises
9. THE Validation_Engine SHALL verify interview preparation is integrated throughout (not isolated)
10. THE Validation_Engine SHALL verify professional workflow is emphasized in all projects
11. THE Validation_Engine SHALL generate a validation report listing all checks and their pass/fail status
12. WHEN validation fails, THE Validation_Engine SHALL provide specific recommendations for corrections

---

## Requirements Summary

### By Priority

**High Priority (11 requirements)**:
- Req 1: Analyze Existing Capstone Documentation
- Req 2: Map Pedagogical Patterns to Project Guides
- Req 3: Identify Enhancement Opportunities
- Req 4: Integrate Code Comprehension First Pattern
- Req 5: Integrate Technical Interview Preparation
- Req 6: Integrate Professional Workflow Practices
- Req 7: Integrate Platform and Tooling Recommendations
- Req 8: Integrate Scaffolding Progression
- Req 10: Create Unified Chapter Template
- Req 11: Apply Template to Sample Project
- Req 12: Validate Pedagogical Pattern Integration

**Medium Priority (1 requirement)**:
- Req 9: Integrate Multi-Modal Learning Support

### By Category

**Documentation Analysis (3 requirements)**:
- Req 1, 2, 3

**Pattern Integration (6 requirements)**:
- Req 4, 5, 6, 7, 8, 9

**Template Creation (2 requirements)**:
- Req 10, 11

**Validation (1 requirement)**:
- Req 12

### Requirement Dependencies

**Foundation Requirements** (must be completed first):
- Req 1: Analyze Existing Capstone Documentation
- Req 2: Map Pedagogical Patterns to Project Guides
- Req 3: Identify Enhancement Opportunities

**Pattern Integration Requirements** (depend on foundation):
- Req 4, 5, 6, 7, 8, 9

**Template Requirements** (depend on pattern integration):
- Req 10: Create Unified Chapter Template
- Req 11: Apply Template to Sample Project

**Validation Requirements** (depend on all enhancements):
- Req 12: Validate Pedagogical Pattern Integration

### Traceability to Teaching Methodology Evaluation

| Capstone Requirement | Teaching Methodology Requirement | Pedagogical Pattern |
|---------------------|----------------------------------|---------------------|
| Req 4 | Req 2 (Criteria 10-14) | Code Comprehension First |
| Req 5 | Req 22 | Technical Interview Preparation |
| Req 6 | Req 12 (Criteria 9-14) | Professional Workflow Integration |
| Req 7 | Req 21 | Platform and Tooling |
| Req 8 | Req 9 (Criteria 15-16) | Scaffolding Progression |
| Req 9 | Req 13 | Multi-Modal Learning |

### Acceptance Criteria Summary

- **Total Acceptance Criteria**: 107 across 12 requirements
- **Average per Requirement**: 8.9 criteria
- **Most Complex**: Req 5 (10 criteria), Req 6 (10 criteria), Req 10 (13 criteria), Req 12 (12 criteria)
- **Least Complex**: Req 1 (8 criteria), Req 2 (8 criteria), Req 9 (8 criteria)

### Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-05-02 | Initial requirements document with 12 requirements | Curriculum Design Team |
