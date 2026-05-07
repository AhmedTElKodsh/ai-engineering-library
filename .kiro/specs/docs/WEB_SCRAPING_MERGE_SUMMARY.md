# Web Scraping Curriculum → AI Engineering Curriculum Merge Summary

**Date**: 2026-05-05  
**Merged By**: Kiro AI Assistant  
**Source Spec**: `ai-engineering-library/.kiro/specs/web-scraping-curriculum`  
**Target Spec**: `.kiro/specs/ai-engineering-curriculum-implementation`

## Executive Summary

Successfully merged the Web Scraping Curriculum spec into the AI Engineering Curriculum Implementation spec by:
1. Extracting the **Socratic mentorship pedagogical pattern** as a universal teaching approach (Requirement 45)
2. Creating a **Specialization Track framework** for optional domain-specific content (Requirement 46)
3. Adding **Ethical Data Collection Practices** to professional workflow integration (Requirement 47)
4. Preserving the complete 5-project web scraping curriculum as the first specialization track

This approach integrates web scraping as **optional supplementary content** rather than core curriculum, making it accessible to both AI Engineers (who need data collection for agents) and Data Analysts (who need scraping for analysis workflows).

## What Was Merged

### Core Pedagogical Pattern: Discovery Exercises (Req 45)

The web scraping curriculum's **Socratic mentorship approach** has been extracted as a universal pedagogical pattern applicable across ALL modules:

**Discovery Exercise Pattern**:
- Conceptual explanations of the approach
- Architectural strategies (high-level design)
- Boilerplate code with TODO blocks
- Progressive hints without complete solutions
- Emphasis on problem-solving over code copying

**Why This Matters**:
- Complements existing patterns (Code Comprehension, Productive Failure, Scaffolding Progression)
- Develops problem-solving skills through guided discovery
- Applicable to tokenization, MCP, agentic workflows, deployment - not just web scraping
- Transforms learners from code copiers to problem solvers

**Example Application**:
- **Module 2 (Tokenization)**: Boilerplate BPE tokenizer with TODO blocks for merge logic
- **Module 3 (MCP)**: Boilerplate MCP server with TODO blocks for tool implementation
- **Module 4 (Agents)**: Boilerplate ReAct agent with TODO blocks for reasoning loop
- **Module 5 (Deployment)**: Boilerplate Docker setup with TODO blocks for configuration

### Specialization Track Framework (Req 46)

Created a framework for **optional domain-specific content** beyond core AI engineering:

**Specialization Tracks Supported**:
1. **Web Scraping** (5 projects) - Data collection for AI systems
2. **Data Visualization** (future) - Presenting AI insights
3. **MLOps** (future) - ML pipeline automation
4. **Cloud Deployment** (future) - AWS/Azure/GCP deployment
5. **Security** (future) - AI system security and adversarial robustness

**Track Structure**:
- 4-5 progressive projects per track
- Tool progression (fundamentals → advanced frameworks)
- Measurable success criteria
- Specialization badges upon completion
- Portfolio integration

**Why This Matters**:
- Career flexibility for diverse roles (AI Engineers, Data Analysts, Data Scientists)
- Domain expertise beyond core AI engineering
- Optional content doesn't block core curriculum progression
- Supports multiple learning paths and career goals

### Ethical Data Collection Practices (Req 47)

Integrated ethical scraping principles into professional workflow integration:

**Ethical Practices**:
- robots.txt compliance checking
- Rate limiting implementation (1-2 seconds between requests)
- Terms of service respect
- Official API preference over scraping
- Data privacy and GDPR compliance
- Proper attribution and citation
- Copyright and IP respect
- Legal review identification

**Why This Matters**:
- Develops responsible engineering habits
- Avoids legal issues and IP violations
- Applies to ALL data collection (APIs, databases, web scraping)
- Professional workflow integration (Requirement 41)

### Web Scraping Specialization Track

The complete 5-project web scraping curriculum has been preserved as the first specialization track:

**Project Progression**:
1. **Static Content Extraction** (requests + BeautifulSoup) - 6-8 hours
2. **Pagination Handling** (requests + BeautifulSoup) - 6-8 hours
3. **Dynamic Content Scraping** (Playwright/Selenium + Yellow Pages) - 10-12 hours
4. **Session Management** (requests sessions + authentication) - 6-8 hours
5. **Scalable Web Crawling** (Scrapy framework) - 12-15 hours

**Total Duration**: 40-60 hours (2-3 weeks)

**Key Features**:
- Discovery Exercises with TODO blocks (no complete solutions)
- Architectural guidance and progressive hints
- Measurable success criteria (CSV output with specific columns)
- Ethical scraping practices (robots.txt, rate limiting)
- Tool progression (fundamentals → advanced frameworks)
- Links to official docs and GitHub repos (1000+ stars)

## Integration Strategy

### Hybrid Approach: Core + Specializations

```
┌─────────────────────────────────────────────────────────────┐
│              AI Engineering Core Curriculum                  │
│  Module 0: Python Foundations                                │
│  Module 1: Whole Game (LangGraph multi-agent)                │
│  Module 2: First Principles (Tokenization, Transformers)     │
│  Module 3: MCP Integration                                   │
│  Module 4: Agentic Workflows                                 │
│  Module 5: Production & Verification                         │
│  Module 6: Capstone Projects                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├─────────────────────────────────┐
                            │                                 │
                ┌───────────▼──────────┐        ┌────────────▼─────────┐
                │  Specialization      │        │  Specialization      │
                │  Track: Web Scraping │        │  Track: Data Viz     │
                │  (5 projects)        │        │  (future)            │
                └──────────────────────┘        └──────────────────────┘
                            │
                ┌───────────▼──────────┐        ┌────────────┐
                │  Specialization      │        │  More      │
                │  Track: MLOps        │        │  Tracks... │
                │  (future)            │        │            │
                └──────────────────────┘        └────────────┘
```

### Target Audiences

**AI Engineers**:
- Complete core curriculum (Modules 0-6)
- Optional: Web Scraping specialization for building data collection agents
- Optional: MLOps specialization for production ML pipelines
- Optional: Cloud Deployment specialization for scalable systems

**Data Analysts**:
- Complete Module 0 (Python Foundations)
- **Required**: Web Scraping specialization for data collection
- Optional: Data Visualization specialization
- Optional: Core AI modules for AI-powered analysis

**Data Scientists**:
- Complete Modules 0-2 (Python, Whole Game, First Principles)
- Optional: Web Scraping for data collection
- Optional: MLOps for model deployment
- Optional: Full core curriculum for AI engineering skills

### Where Web Scraping Fits

**Integration Points**:

1. **Module 0 (Python Foundations)** → Web Scraping Specialization
   - Prerequisite: Python basics completed
   - Entry point for Data Analysts

2. **Module 4 (Agentic Workflows)** → Web Scraping Specialization
   - Build agents that use web scraping tools
   - Data collection for RAG systems
   - Multi-agent systems with scraping capabilities

3. **Module 5 (Production & Verification)** → Web Scraping Specialization
   - Deploy scrapers to production
   - Monitor scraping pipelines
   - Test and verify scraping reliability

## Implementation Impact

### New Requirements Added

**3 New Requirements (45-47)**:
- Req 45: Discovery Exercise Pattern (Socratic Mentorship)
- Req 46: Optional Specialization Tracks
- Req 47: Ethical Data Collection Practices

**Total Requirements**: 47 (up from 44)

### New Components Required

**Backend Services**:
- Discovery Exercise service (TODO block tracking, hint system)
- Specialization Track service (track management, project tracking)
- Ethical scraping checklist service

**Frontend Components**:
- Discovery Exercise interface (TODO block highlighting, hint display)
- Specialization Track browser (track selection, project navigation)
- Ethical scraping checklist UI
- Specialization badge display

**Database Schema Updates**:
- Discovery exercise completion tracking
- TODO block completion status
- Specialization track enrollment
- Specialization project completion
- Specialization badges earned
- Ethical checklist completion

**Content**:
- Web Scraping Specialization (5 projects with boilerplate code)
- Discovery Exercise templates for core modules
- Ethical scraping guidelines and checklists

### Estimated Effort

**Additional Implementation Time**: 50-80 hours (1-2 months with 3-4 engineers)

**Task Breakdown**:
- Discovery Exercise component: 15-20 hours
- Specialization Track framework: 20-30 hours
- Ethical scraping checklist: 5-10 hours
- Web Scraping content creation: 10-20 hours
- Testing and validation: 10-15 hours
- Documentation: 5-10 hours

**Compared to Previous Merges**:
- Teaching Methodology merge: 200-300 hours
- Web Scraping merge: 50-80 hours
- **Total additional effort**: 250-380 hours (2.5-4 months)

### Benefits vs Costs

**Benefits**:
- ✅ Universal Discovery Exercise pattern applicable to all modules
- ✅ Problem-solving skills through guided discovery
- ✅ Career flexibility with specialization tracks
- ✅ Domain expertise for diverse roles
- ✅ Ethical data collection practices
- ✅ Optional content doesn't block core progression
- ✅ Supports AI Engineers, Data Analysts, and Data Scientists
- ✅ Portfolio-ready specialization projects

**Costs**:
- ⚠️ 1-2 months additional development time
- ⚠️ Content creation for specialization tracks
- ⚠️ Increased system complexity (track management)
- ⚠️ Maintenance of multiple learning paths

**Recommendation**: **Proceed with merge**. The Discovery Exercise pattern is valuable across all modules, and the Specialization Track framework provides career flexibility. The web scraping content is complete and ready to integrate. The 1-2 month implementation time is reasonable for the benefits gained.

## Key Decisions Made

### Decision 1: Specialization Track vs Core Module

**Decision**: Integrate web scraping as optional specialization track, not core Module 7

**Rationale**:
- Web scraping is valuable but not essential for all AI Engineers
- Data Analysts need scraping; AI Engineers may not
- Keeps core curriculum focused on AI engineering fundamentals
- Allows flexibility for diverse career paths

**Alternatives Considered**:
- Add as Module 7 (too much scope, not core to AI engineering)
- Add as prerequisite to Module 0 (wrong order, not foundational)
- Skip entirely (loses valuable content for Data Analysts)

### Decision 2: Extract Socratic Mentorship as Universal Pattern

**Decision**: Make Discovery Exercises (Socratic mentorship) applicable to ALL modules

**Rationale**:
- Problem-solving skills are valuable across all domains
- TODO blocks work for tokenization, MCP, agents, deployment
- Complements existing pedagogical patterns
- Not specific to web scraping

**Alternatives Considered**:
- Keep Socratic approach only for web scraping (misses broader value)
- Replace existing patterns with Socratic approach (loses other pedagogical benefits)

### Decision 3: Preserve Complete Web Scraping Curriculum

**Decision**: Keep all 5 projects intact as specialization track content

**Rationale**:
- Content is well-designed and complete
- Tool progression is logical (requests → Playwright → Scrapy)
- Yellow Pages target is valuable for dynamic content practice
- Measurable success criteria are clear

**Alternatives Considered**:
- Condense to 2-3 projects (loses tool progression)
- Integrate projects into core modules (forces scraping on all learners)
- Discard web scraping entirely (loses value for Data Analysts)

### Decision 4: Ethical Practices as Universal Requirement

**Decision**: Make ethical data collection practices apply to ALL data collection, not just scraping

**Rationale**:
- APIs, databases, and web scraping all require ethical considerations
- Professional workflow integration (Req 41) should include ethics
- Responsible engineering is universal, not domain-specific

**Alternatives Considered**:
- Keep ethics only for web scraping (misses broader application)
- Skip ethics entirely (irresponsible, risks legal issues)

## Success Metrics

### Discovery Exercise Effectiveness

- **Completion Rate**: 80%+ of learners complete Discovery Exercises
- **Hint Usage**: Average 2-3 hints per exercise (not too easy, not too hard)
- **Time to Completion**: Within estimated time ranges
- **Problem-Solving Skills**: Learners report improved debugging and problem-solving confidence

### Specialization Track Adoption

- **Enrollment Rate**: 40%+ of learners enroll in at least one specialization track
- **Completion Rate**: 70%+ of enrolled learners complete their chosen track
- **Web Scraping Track**: 60%+ of Data Analysts complete web scraping track
- **Badge Display**: 80%+ of completers display specialization badges on profiles

### Ethical Practices Compliance

- **Checklist Completion**: 95%+ of data collection projects complete ethical checklist
- **robots.txt Compliance**: 100% of scraping projects check robots.txt
- **Rate Limiting**: 100% of scraping projects implement rate limiting
- **Legal Issues**: Zero legal issues arising from curriculum projects

### Career Outcomes

- **Portfolio Quality**: 90%+ of specialization projects are portfolio-ready
- **Career Flexibility**: Learners report increased confidence in diverse roles
- **Employer Feedback**: Employers value specialization expertise
- **Job Placement**: Specialization completers have higher placement rates

## Files Modified and Created

### Modified Files

1. **requirements.md**
   - Added Requirements 45-47 (3 new requirements)
   - Updated merge summary section
   - ~300 lines added

### Created Files

1. **web-scraping-specialization.md**
   - Complete 5-project web scraping curriculum
   - Discovery Exercises with TODO blocks
   - Architectural guidance and progressive hints
   - Ethical scraping practices
   - ~1200 lines

2. **WEB_SCRAPING_MERGE_SUMMARY.md** (this document)
   - Comprehensive merge documentation
   - Decisions, rationale, and impact analysis
   - ~800 lines

### Files Needing Updates

1. **design.md** - Add Discovery Exercise and Specialization Track components
2. **tasks.md** - Add implementation tasks for new requirements
3. **MERGE_SUMMARY.md** - Update with web scraping merge information

## Next Steps

### Immediate Actions

1. **Review and Approve**: Curriculum team reviews new requirements and specialization track
2. **Update Design Document**: Add Discovery Exercise and Specialization Track components
3. **Update Tasks Document**: Add implementation tasks for Requirements 45-47
4. **Content Review**: Review web-scraping-specialization.md for accuracy and completeness

### Phase 1: Discovery Exercise Implementation (Weeks 1-2)

- Design Discovery Exercise component interface
- Implement TODO block tracking system
- Build progressive hint system
- Create architectural guidance templates
- Test with sample exercises

### Phase 2: Specialization Track Framework (Weeks 3-4)

- Design Specialization Track data models
- Implement track enrollment and management
- Build project tracking system
- Create specialization badge system
- Integrate with portfolio system

### Phase 3: Ethical Practices Integration (Week 5)

- Create ethical data collection checklist
- Build checklist UI component
- Integrate with professional workflow tracking
- Add ethical guidance to relevant modules

### Phase 4: Web Scraping Content Integration (Week 6)

- Convert web-scraping-specialization.md to platform format
- Create boilerplate code templates
- Set up project success criteria validation
- Test all 5 projects for completeness

### Phase 5: Testing and Validation (Weeks 7-8)

- Unit tests for new components
- Integration tests for specialization tracks
- User acceptance testing with pilot learners
- Performance testing
- Documentation

### Future Specialization Tracks

**Planned Tracks**:
1. **Data Visualization** (Matplotlib, Seaborn, Plotly, D3.js)
2. **MLOps** (MLflow, Kubeflow, model deployment, monitoring)
3. **Cloud Deployment** (AWS, Azure, GCP, serverless, containers)
4. **Security** (Adversarial robustness, model security, data privacy)
5. **NLP Applications** (Text classification, NER, sentiment analysis)

**Timeline**: 1 new track every 2-3 months after initial framework launch

## Conclusion

This merge successfully integrates the Web Scraping Curriculum into the AI Engineering Curriculum by:

1. **Extracting universal pedagogical value**: Discovery Exercises applicable to all modules
2. **Creating flexible architecture**: Specialization Track framework for diverse career paths
3. **Preserving complete content**: All 5 web scraping projects intact and ready to use
4. **Adding ethical foundation**: Responsible data collection practices across all domains

The hybrid approach (core curriculum + optional specializations) provides:
- **AI Engineers**: Core skills + optional domain expertise
- **Data Analysts**: Python foundations + required web scraping + optional AI modules
- **Data Scientists**: Flexible path combining core AI and specializations

**Recommendation**: Proceed with implementation. The 1-2 month development time is justified by the career flexibility, problem-solving skills, and ethical practices gained. The Discovery Exercise pattern alone is valuable enough to warrant the merge, and the Specialization Track framework enables future growth.

---

**Questions or Concerns?**

Contact the AI Engineering Curriculum Team for clarification or discussion of any aspect of this merge.
