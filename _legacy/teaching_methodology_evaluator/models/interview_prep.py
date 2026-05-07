"""Interview preparation assessment data models.

This module defines data models for evaluating technical interview preparation
integration throughout the curriculum.
"""

from dataclasses import dataclass, field
from typing import List
import json


@dataclass
class ExplanationExerciseAssessment:
    """Assessment of 'explain your solution' exercises.
    
    Attributes:
        total_modules: Total number of modules analyzed
        modules_with_explanation_exercises: Number of modules with explanation exercises
        coverage_percentage: Percentage of modules with explanation exercises
        exercise_quality: Quality of exercises ("excellent", "good", "fair", "poor")
        frequency_per_module: Average frequency of exercises per module
        examples: List of example exercises
        gaps: List of identified gaps
    """
    total_modules: int
    modules_with_explanation_exercises: int
    coverage_percentage: float
    exercise_quality: str
    frequency_per_module: float
    examples: List[str]
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.total_modules <= 0:
            raise ValueError("total_modules must be positive")
        if not 0.0 <= self.coverage_percentage <= 100.0:
            raise ValueError("coverage_percentage must be between 0.0 and 100.0")
        if self.exercise_quality not in ["excellent", "good", "fair", "poor"]:
            raise ValueError(f"Invalid exercise_quality: {self.exercise_quality}")
        if self.frequency_per_module < 0:
            raise ValueError("frequency_per_module must be non-negative")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "total_modules": self.total_modules,
            "modules_with_explanation_exercises": self.modules_with_explanation_exercises,
            "coverage_percentage": self.coverage_percentage,
            "exercise_quality": self.exercise_quality,
            "frequency_per_module": self.frequency_per_module,
            "examples": self.examples,
            "gaps": self.gaps,
        }


@dataclass
class ThinkAloudAssessment:
    """Assessment of think-aloud practice opportunities.
    
    Attributes:
        content_coverage: Percentage of modules with think-aloud practice
        intensive_mode_coverage: Whether Intensive Mode includes think-aloud practice
        self_paced_mode_coverage: Whether Self-Paced Mode includes think-aloud practice
        practice_frequency: Practice frequency ("frequent", "moderate", "rare", "absent")
        quality_assessment: Quality assessment description
        examples: List of example practices
        gaps: List of identified gaps
    """
    content_coverage: float
    intensive_mode_coverage: bool
    self_paced_mode_coverage: bool
    practice_frequency: str
    quality_assessment: str
    examples: List[str]
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.content_coverage <= 100.0:
            raise ValueError("content_coverage must be between 0.0 and 100.0")
        if self.practice_frequency not in ["frequent", "moderate", "rare", "absent"]:
            raise ValueError(f"Invalid practice_frequency: {self.practice_frequency}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "content_coverage": self.content_coverage,
            "intensive_mode_coverage": self.intensive_mode_coverage,
            "self_paced_mode_coverage": self.self_paced_mode_coverage,
            "practice_frequency": self.practice_frequency,
            "quality_assessment": self.quality_assessment,
            "examples": self.examples,
            "gaps": self.gaps,
        }


@dataclass
class MockInterviewAssessment:
    """Assessment of mock interview practice.
    
    Attributes:
        intensive_mode_mock_count: Number of mock interviews in Intensive Mode
        self_paced_mode_mock_count: Number of mock interviews in Self-Paced Mode
        mock_interview_quality: Quality of mock interviews ("authentic", "partial", "absent")
        includes_peer_observation: Whether peer observation is included
        includes_feedback_mechanisms: Whether feedback mechanisms are included
        alignment_with_research: Alignment with research ("strong", "moderate", "weak")
        gaps: List of identified gaps
    """
    intensive_mode_mock_count: int
    self_paced_mode_mock_count: int
    mock_interview_quality: str
    includes_peer_observation: bool
    includes_feedback_mechanisms: bool
    alignment_with_research: str
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.intensive_mode_mock_count < 0:
            raise ValueError("intensive_mode_mock_count must be non-negative")
        if self.self_paced_mode_mock_count < 0:
            raise ValueError("self_paced_mode_mock_count must be non-negative")
        if self.mock_interview_quality not in ["authentic", "partial", "absent"]:
            raise ValueError(f"Invalid mock_interview_quality: {self.mock_interview_quality}")
        if self.alignment_with_research not in ["strong", "moderate", "weak"]:
            raise ValueError(f"Invalid alignment_with_research: {self.alignment_with_research}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "intensive_mode_mock_count": self.intensive_mode_mock_count,
            "self_paced_mode_mock_count": self.self_paced_mode_mock_count,
            "mock_interview_quality": self.mock_interview_quality,
            "includes_peer_observation": self.includes_peer_observation,
            "includes_feedback_mechanisms": self.includes_feedback_mechanisms,
            "alignment_with_research": self.alignment_with_research,
            "gaps": self.gaps,
        }


@dataclass
class CollaborativeCodingAssessment:
    """Assessment of collaborative coding practice.
    
    Attributes:
        pair_programming_frequency: Pair programming frequency ("frequent", "moderate", "rare", "absent")
        peer_observation_opportunities: Number of peer observation opportunities
        group_debugging_exercises: Number of group debugging exercises
        collaborative_projects: Number of collaborative projects
        quality_assessment: Quality assessment description
        gaps: List of identified gaps
    """
    pair_programming_frequency: str
    peer_observation_opportunities: int
    group_debugging_exercises: int
    collaborative_projects: int
    quality_assessment: str
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.pair_programming_frequency not in ["frequent", "moderate", "rare", "absent"]:
            raise ValueError(f"Invalid pair_programming_frequency: {self.pair_programming_frequency}")
        if self.peer_observation_opportunities < 0:
            raise ValueError("peer_observation_opportunities must be non-negative")
        if self.group_debugging_exercises < 0:
            raise ValueError("group_debugging_exercises must be non-negative")
        if self.collaborative_projects < 0:
            raise ValueError("collaborative_projects must be non-negative")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "pair_programming_frequency": self.pair_programming_frequency,
            "peer_observation_opportunities": self.peer_observation_opportunities,
            "group_debugging_exercises": self.group_debugging_exercises,
            "collaborative_projects": self.collaborative_projects,
            "quality_assessment": self.quality_assessment,
            "gaps": self.gaps,
        }


@dataclass
class ObserverPracticeAssessment:
    """Assessment of coding with observers practice.
    
    Attributes:
        intensive_mode_observer_practice: Whether Intensive Mode includes observer practice
        self_paced_mode_observer_practice: Whether Self-Paced Mode includes observer practice
        authenticity_level: Authenticity level ("high", "medium", "low")
        frequency: Frequency description
        gaps: List of identified gaps
    """
    intensive_mode_observer_practice: bool
    self_paced_mode_observer_practice: bool
    authenticity_level: str
    frequency: str
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.authenticity_level not in ["high", "medium", "low"]:
            raise ValueError(f"Invalid authenticity_level: {self.authenticity_level}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "intensive_mode_observer_practice": self.intensive_mode_observer_practice,
            "self_paced_mode_observer_practice": self.self_paced_mode_observer_practice,
            "authenticity_level": self.authenticity_level,
            "frequency": self.frequency,
            "gaps": self.gaps,
        }


@dataclass
class ResearchComparisonReport:
    """Comparison against 2025 Virginia Tech research.
    
    Attributes:
        research_findings: List of relevant research findings
        curriculum_alignment: Curriculum alignment ("strong", "moderate", "weak")
        mock_interview_count_comparison: Comparison of mock interview counts
        communication_practice_comparison: Comparison of communication practice
        identified_gaps: List of identified gaps
        recommendations: List of recommendations
    """
    research_findings: List["ResearchFindings"]  # Forward reference
    curriculum_alignment: str
    mock_interview_count_comparison: str
    communication_practice_comparison: str
    identified_gaps: List[str]
    recommendations: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.curriculum_alignment not in ["strong", "moderate", "weak"]:
            raise ValueError(f"Invalid curriculum_alignment: {self.curriculum_alignment}")
        if not self.research_findings:
            raise ValueError("research_findings list cannot be empty")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "research_findings": [rf.to_dict() for rf in self.research_findings],
            "curriculum_alignment": self.curriculum_alignment,
            "mock_interview_count_comparison": self.mock_interview_count_comparison,
            "communication_practice_comparison": self.communication_practice_comparison,
            "identified_gaps": self.identified_gaps,
            "recommendations": self.recommendations,
        }


@dataclass
class IntegrationDistributionReport:
    """Report on interview prep integration distribution.
    
    Attributes:
        integrated_throughout: Whether interview prep is integrated throughout
        isolated_modules: List of modules where interview prep is isolated
        distribution_score: Distribution score (0.0 to 1.0)
        recommendations: List of recommendations
    """
    integrated_throughout: bool
    isolated_modules: List[str]
    distribution_score: float
    recommendations: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.distribution_score <= 1.0:
            raise ValueError("distribution_score must be between 0.0 and 1.0")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "integrated_throughout": self.integrated_throughout,
            "isolated_modules": self.isolated_modules,
            "distribution_score": self.distribution_score,
            "recommendations": self.recommendations,
        }


@dataclass
class PeerReviewAssessment:
    """Assessment of peer code review mechanisms.
    
    Attributes:
        content_modules_with_peer_review: Number of modules with peer review
        intensive_mode_peer_review: Whether Intensive Mode includes peer review
        self_paced_mode_peer_review: Whether Self-Paced Mode includes peer review
        review_frequency: Review frequency description
        feedback_quality: Feedback quality description
        gaps: List of identified gaps
    """
    content_modules_with_peer_review: int
    intensive_mode_peer_review: bool
    self_paced_mode_peer_review: bool
    review_frequency: str
    feedback_quality: str
    gaps: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.content_modules_with_peer_review < 0:
            raise ValueError("content_modules_with_peer_review must be non-negative")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "content_modules_with_peer_review": self.content_modules_with_peer_review,
            "intensive_mode_peer_review": self.intensive_mode_peer_review,
            "self_paced_mode_peer_review": self.self_paced_mode_peer_review,
            "review_frequency": self.review_frequency,
            "feedback_quality": self.feedback_quality,
            "gaps": self.gaps,
        }


@dataclass
class InterviewPrepSection:
    """Interview preparation section of the report.
    
    Attributes:
        explanation_exercise_assessment: Assessment of explanation exercises
        think_aloud_assessment: Assessment of think-aloud practice
        mock_interview_assessment: Assessment of mock interviews
        collaborative_coding_assessment: Assessment of collaborative coding
        observer_practice_assessment: Assessment of observer practice
        research_comparison: Comparison against research
        integration_distribution: Integration distribution report
        peer_review_assessment: Assessment of peer review mechanisms
        overall_readiness_score: Overall readiness score (0.0 to 1.0)
        critical_gaps: List of critical gaps
        recommendations: List of recommendations
    """
    explanation_exercise_assessment: ExplanationExerciseAssessment
    think_aloud_assessment: ThinkAloudAssessment
    mock_interview_assessment: MockInterviewAssessment
    collaborative_coding_assessment: CollaborativeCodingAssessment
    observer_practice_assessment: ObserverPracticeAssessment
    research_comparison: ResearchComparisonReport
    integration_distribution: IntegrationDistributionReport
    peer_review_assessment: PeerReviewAssessment
    overall_readiness_score: float
    critical_gaps: List[str]
    recommendations: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.overall_readiness_score <= 1.0:
            raise ValueError("overall_readiness_score must be between 0.0 and 1.0")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "explanation_exercise_assessment": self.explanation_exercise_assessment.to_dict(),
            "think_aloud_assessment": self.think_aloud_assessment.to_dict(),
            "mock_interview_assessment": self.mock_interview_assessment.to_dict(),
            "collaborative_coding_assessment": self.collaborative_coding_assessment.to_dict(),
            "observer_practice_assessment": self.observer_practice_assessment.to_dict(),
            "research_comparison": self.research_comparison.to_dict(),
            "integration_distribution": self.integration_distribution.to_dict(),
            "peer_review_assessment": self.peer_review_assessment.to_dict(),
            "overall_readiness_score": self.overall_readiness_score,
            "critical_gaps": self.critical_gaps,
            "recommendations": self.recommendations,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


# Import types for forward references
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .research import ResearchFindings
