"""Data models for the Teaching Methodology Evaluator system."""

from .research import ResearchSource, ResearchFindings, Contradiction
from .content import (
    ContentModule,
    TeachingPattern,
    DeliveryMode,
    DeliveryMechanism,
    AdaptationPoint,
    Exercise,
    Assessment,
)
from .analysis import (
    EvidenceRating,
    QualityAssessment,
    ConsistencyReport,
    Deviation,
    MixedConcern,
    Duplication,
)
from .gaps import Gap, ImpactAssessment, DifficultyAssessment, Recommendation
from .output import (
    UnifiedFramework,
    ChapterTemplate,
    TemplateSection,
    PlatformRequirements,
    EvaluationReport,
    DecisionTree,
    ContentAnalysisSection,
    DeliveryAnalysisSection,
    SeparationAnalysisSection,
    GapAnalysisSection,
    RedundancyAnalysisSection,
    ImplementationRoadmap,
)
from .platform import (
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
)
from .interview_prep import (
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
    "DecisionTree",
    "ContentAnalysisSection",
    "DeliveryAnalysisSection",
    "SeparationAnalysisSection",
    "GapAnalysisSection",
    "RedundancyAnalysisSection",
    "ImplementationRoadmap",
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
