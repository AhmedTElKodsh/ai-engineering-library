# Teaching Methodology Evaluator

A systematic tool for evaluating and improving teaching methodologies in AI engineering curricula.

## Overview

The Teaching Methodology Evaluator provides a comprehensive framework for:
- Researching current pedagogical best practices (2024-2026)
- Analyzing existing curriculum architecture
- Identifying gaps and redundancies
- Synthesizing evidence-based recommendations for improvement

## Architecture

The system follows a unified content base with differentiated delivery modes approach:
- **Content Layer**: 72 modular chapters with shared pedagogical patterns
- **Delivery Layer**: Two distinct modes (Intensive and Self-Paced)

## Data Models

All data models are defined as Python dataclasses with:
- Type hints for all fields
- Validation logic for required fields
- JSON serialization/deserialization support
- Comprehensive docstrings

### Model Categories

1. **Research Domain Models** (`models/research.py`)
   - `ResearchSource`: Research publication metadata
   - `ResearchFindings`: Extracted findings from research
   - `Contradiction`: Contradictory findings across sources

2. **Content and Delivery Models** (`models/content.py`)
   - `ContentModule`: Unified content module
   - `TeachingPattern`: Pedagogical pattern in content layer
   - `DeliveryMode`: Delivery mode (Intensive or Self-Paced)
   - `DeliveryMechanism`: Delivery-specific mechanism
   - `AdaptationPoint`: Delivery mode customization point
   - `Exercise`: Learning exercise
   - `Assessment`: Learning assessment

3. **Analysis Models** (`models/analysis.py`)
   - `EvidenceRating`: Pattern/mechanism evidence rating
   - `QualityAssessment`: Implementation quality assessment
   - `ConsistencyReport`: Pattern consistency report
   - `Deviation`: Pattern implementation deviation
   - `MixedConcern`: Inappropriate content-delivery mixing
   - `Duplication`: Duplicated content between modes

4. **Gap and Recommendation Models** (`models/gaps.py`)
   - `Gap`: Missing pattern or mechanism
   - `ImpactAssessment`: Potential impact assessment
   - `DifficultyAssessment`: Implementation difficulty assessment
   - `Recommendation`: Actionable improvement recommendation

5. **Output Models** (`models/output.py`)
   - `UnifiedFramework`: Unified teaching methodology framework
   - `ChapterTemplate`: Unified chapter template
   - `TemplateSection`: Chapter template section
   - `PlatformRequirements`: Platform and tooling requirements
   - `EvaluationReport`: Comprehensive evaluation report
   - Various report section models

6. **Platform Evaluation Models** (`models/platform.py`)
   - `Platform`: Interactive learning platform
   - `PlatformEvaluation`: Platform evaluation results
   - `GitIntegrationAssessment`: Version control assessment
   - `AICompatibilityAssessment`: AI tool compatibility assessment
   - `WorkflowSupportAssessment`: Professional workflow assessment
   - `ReproducibilityAssessment`: Reproducibility assessment
   - `DeploymentAssessment`: Deployment capability assessment
   - `PlatformComparison`: Multi-platform comparison
   - `MigrationGuidance`: Platform migration guidance

7. **Interview Preparation Models** (`models/interview_prep.py`)
   - `ExplanationExerciseAssessment`: Explanation exercise assessment
   - `ThinkAloudAssessment`: Think-aloud practice assessment
   - `MockInterviewAssessment`: Mock interview assessment
   - `CollaborativeCodingAssessment`: Collaborative coding assessment
   - `ObserverPracticeAssessment`: Observer practice assessment
   - `ResearchComparisonReport`: Research comparison report
   - `IntegrationDistributionReport`: Integration distribution report
   - `PeerReviewAssessment`: Peer review assessment
   - `InterviewPrepSection`: Interview preparation section

## Usage

```python
from teaching_methodology_evaluator import (
    ResearchSource,
    ContentModule,
    TeachingPattern,
    EvaluationReport,
)

# Create a research source
source = ResearchSource(
    title="Effective Teaching Strategies in 2024",
    authors=["Smith, J.", "Doe, A."],
    publication_date="2024-03-15",
    source_type="peer-reviewed",
    url="https://example.com/paper",
    citation="Smith, J., & Doe, A. (2024). Effective Teaching Strategies...",
    abstract="This study examines...",
)

# Serialize to JSON
json_str = source.to_json()

# Deserialize from dictionary
source_dict = source.to_dict()
source_copy = ResearchSource.from_dict(source_dict)
```

## Validation

All models include validation logic:
- Required fields are checked in `__post_init__`
- Enum-like fields are validated against allowed values
- Numeric ranges are validated (e.g., scores between 0.0 and 1.0)
- Relationships between fields are validated

## JSON Serialization

All models support JSON serialization:
- `to_dict()`: Convert to dictionary
- `to_json()`: Convert to JSON string
- `from_dict()`: Create instance from dictionary (where applicable)

## Development

### Requirements
- Python 3.11+
- No external dependencies for core models

### Testing
```bash
python -m pytest tests/
```

## License

See LICENSE file for details.
