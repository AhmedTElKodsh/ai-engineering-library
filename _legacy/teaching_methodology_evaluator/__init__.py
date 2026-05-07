"""Teaching Methodology Evaluator - A systematic tool for evaluating and improving teaching methodologies.

This package provides tools to research current pedagogical best practices, analyze existing
curriculum architecture, identify gaps and redundancies, and synthesize evidence-based
recommendations for improvement.
"""

__version__ = "1.0.0"
__author__ = "Curriculum Design Team"

from .models import (
    # Research domain models
    ResearchSource,
    ResearchFindings,
    Contradiction,
    # Content and delivery models
    ContentModule,
    TeachingPattern,
    DeliveryMode,
    DeliveryMechanism,
    AdaptationPoint,
    Exercise,
    Assessment,
    # Analysis models
    EvidenceRating,
    QualityAssessment,
    ConsistencyReport,
    Deviation,
    MixedConcern,
    Duplication,
    # Gap and recommendation models
    Gap,
    ImpactAssessment,
    DifficultyAssessment,
    Recommendation,
    # Output models
    UnifiedFramework,
    ChapterTemplate,
    TemplateSection,
    PlatformRequirements,
    EvaluationReport,
    # Platform evaluation models
    Platform,
    PlatformEvaluation,
    GitIntegrationAssessment,
    AICompatibilityAssessment,
    WorkflowSupportAssessment,
    ReproducibilityAssessment,
    DeploymentAssessment,
    PlatformComparison,
    MigrationGuidance,
    PlatformEvaluationSection,
    # Interview preparation models
    ExplanationExerciseAssessment,
    ThinkAloudAssessment,
    MockInterviewAssessment,
    CollaborativeCodingAssessment,
    ObserverPracticeAssessment,
    ResearchComparisonReport,
    IntegrationDistributionReport,
    PeerReviewAssessment,
    InterviewPrepSection,
)

__all__ = [
    # Research domain models
    "ResearchSource",
    "ResearchFindings",
    "Contradiction",
    # Content and delivery models
    "ContentModule",
    "TeachingPattern",
    "DeliveryMode",
    "DeliveryMechanism",
    "AdaptationPoint",
    "Exercise",
    "Assessment",
    # Analysis models
    "EvidenceRating",
    "QualityAssessment",
    "ConsistencyReport",
    "Deviation",
    "MixedConcern",
    "Duplication",
    # Gap and recommendation models
    "Gap",
    "ImpactAssessment",
    "DifficultyAssessment",
    "Recommendation",
    # Output models
    "UnifiedFramework",
    "ChapterTemplate",
    "TemplateSection",
    "PlatformRequirements",
    "EvaluationReport",
    # Platform evaluation models
    "Platform",
    "PlatformEvaluation",
    "GitIntegrationAssessment",
    "AICompatibilityAssessment",
    "WorkflowSupportAssessment",
    "ReproducibilityAssessment",
    "DeploymentAssessment",
    "PlatformComparison",
    "MigrationGuidance",
    "PlatformEvaluationSection",
    # Interview preparation models
    "ExplanationExerciseAssessment",
    "ThinkAloudAssessment",
    "MockInterviewAssessment",
    "CollaborativeCodingAssessment",
    "ObserverPracticeAssessment",
    "ResearchComparisonReport",
    "IntegrationDistributionReport",
    "PeerReviewAssessment",
    "InterviewPrepSection",
]
