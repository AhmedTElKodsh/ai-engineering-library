"""Platform evaluation data models.

This module defines data models for evaluating interactive learning platforms
and development tools against research and industry standards.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
import json


@dataclass
class Platform:
    """Represents an interactive learning platform.
    
    Attributes:
        name: Platform name
        version: Platform version
        format: File format (e.g., ".ipynb", ".py", ".qmd")
        is_git_native: Whether the platform uses Git-native formats
        is_open_source: Whether the platform is open source
        cost_model: Cost model ("free", "freemium", "paid", "self-hosted")
        url: Platform URL
    """
    name: str
    version: str
    format: str
    is_git_native: bool
    is_open_source: bool
    cost_model: str
    url: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.name:
            raise ValueError("name is required")
        if not self.version:
            raise ValueError("version is required")
        if not self.format:
            raise ValueError("format is required")
        if self.cost_model not in ["free", "freemium", "paid", "self-hosted"]:
            raise ValueError(f"Invalid cost_model: {self.cost_model}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "name": self.name,
            "version": self.version,
            "format": self.format,
            "is_git_native": self.is_git_native,
            "is_open_source": self.is_open_source,
            "cost_model": self.cost_model,
            "url": self.url,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Platform":
        """Create instance from dictionary."""
        return cls(**data)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class GitIntegrationAssessment:
    """Assessment of version control friendliness.
    
    Attributes:
        platform: The platform being assessed
        file_format: File format type ("plain text", "JSON", "binary")
        diff_readability: Diff readability ("excellent", "good", "poor")
        merge_conflict_handling: Merge conflict handling ("easy", "moderate", "difficult")
        supports_modular_imports: Whether modular imports are supported
        supports_clean_commits: Whether clean commits are supported
        assessment_details: Detailed assessment notes
    """
    platform: Platform
    file_format: str
    diff_readability: str
    merge_conflict_handling: str
    supports_modular_imports: bool
    supports_clean_commits: bool
    assessment_details: str

    def __post_init__(self):
        """Validate required fields."""
        if self.file_format not in ["plain text", "JSON", "binary"]:
            raise ValueError(f"Invalid file_format: {self.file_format}")
        if self.diff_readability not in ["excellent", "good", "poor"]:
            raise ValueError(f"Invalid diff_readability: {self.diff_readability}")
        if self.merge_conflict_handling not in ["easy", "moderate", "difficult"]:
            raise ValueError(f"Invalid merge_conflict_handling: {self.merge_conflict_handling}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "file_format": self.file_format,
            "diff_readability": self.diff_readability,
            "merge_conflict_handling": self.merge_conflict_handling,
            "supports_modular_imports": self.supports_modular_imports,
            "supports_clean_commits": self.supports_clean_commits,
            "assessment_details": self.assessment_details,
        }


@dataclass
class AICompatibilityAssessment:
    """Assessment of AI coding assistant compatibility.
    
    Attributes:
        platform: The platform being assessed
        works_with_claude_code: Whether it works with Claude Code
        works_with_github_copilot: Whether it works with GitHub Copilot
        works_with_cursor: Whether it works with Cursor
        ai_can_read_format: Whether AI can read the format
        ai_can_write_format: Whether AI can write the format
        reproducible_execution: Whether execution is reproducible
        assessment_details: Detailed assessment notes
    """
    platform: Platform
    works_with_claude_code: bool
    works_with_github_copilot: bool
    works_with_cursor: bool
    ai_can_read_format: bool
    ai_can_write_format: bool
    reproducible_execution: bool
    assessment_details: str

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "works_with_claude_code": self.works_with_claude_code,
            "works_with_github_copilot": self.works_with_github_copilot,
            "works_with_cursor": self.works_with_cursor,
            "ai_can_read_format": self.ai_can_read_format,
            "ai_can_write_format": self.ai_can_write_format,
            "reproducible_execution": self.reproducible_execution,
            "assessment_details": self.assessment_details,
        }


@dataclass
class WorkflowSupportAssessment:
    """Assessment of professional workflow support.
    
    Attributes:
        platform: The platform being assessed
        supports_unit_testing: Whether unit testing is supported
        supports_integration_testing: Whether integration testing is supported
        supports_modular_code: Whether modular code is supported
        supports_deployment: Whether deployment is supported
        supports_ci_cd: Whether CI/CD is supported
        teaches_professional_practices: Whether professional practices are taught
        assessment_details: Detailed assessment notes
    """
    platform: Platform
    supports_unit_testing: bool
    supports_integration_testing: bool
    supports_modular_code: bool
    supports_deployment: bool
    supports_ci_cd: bool
    teaches_professional_practices: bool
    assessment_details: str

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "supports_unit_testing": self.supports_unit_testing,
            "supports_integration_testing": self.supports_integration_testing,
            "supports_modular_code": self.supports_modular_code,
            "supports_deployment": self.supports_deployment,
            "supports_ci_cd": self.supports_ci_cd,
            "teaches_professional_practices": self.teaches_professional_practices,
            "assessment_details": self.assessment_details,
        }


@dataclass
class ReproducibilityAssessment:
    """Assessment of reproducibility rates.
    
    Attributes:
        platform: The platform being assessed
        reproducibility_rate: Percentage of notebooks that run reliably when shared
        common_failure_modes: List of common failure modes
        dependency_management: Dependency management quality ("excellent", "good", "poor")
        environment_isolation: Whether environment isolation is supported
        assessment_details: Detailed assessment notes
    """
    platform: Platform
    reproducibility_rate: float
    common_failure_modes: List[str]
    dependency_management: str
    environment_isolation: bool
    assessment_details: str

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.reproducibility_rate <= 100.0:
            raise ValueError("reproducibility_rate must be between 0.0 and 100.0")
        if self.dependency_management not in ["excellent", "good", "poor"]:
            raise ValueError(f"Invalid dependency_management: {self.dependency_management}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "reproducibility_rate": self.reproducibility_rate,
            "common_failure_modes": self.common_failure_modes,
            "dependency_management": self.dependency_management,
            "environment_isolation": self.environment_isolation,
            "assessment_details": self.assessment_details,
        }


@dataclass
class DeploymentAssessment:
    """Assessment of deployment capabilities.
    
    Attributes:
        platform: The platform being assessed
        supports_web_deployment: Whether web deployment is supported
        supports_api_deployment: Whether API deployment is supported
        deployment_complexity: Deployment complexity ("simple", "moderate", "complex")
        portfolio_ready: Whether deployments are portfolio-ready
        assessment_details: Detailed assessment notes
    """
    platform: Platform
    supports_web_deployment: bool
    supports_api_deployment: bool
    deployment_complexity: str
    portfolio_ready: bool
    assessment_details: str

    def __post_init__(self):
        """Validate required fields."""
        if self.deployment_complexity not in ["simple", "moderate", "complex"]:
            raise ValueError(f"Invalid deployment_complexity: {self.deployment_complexity}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "supports_web_deployment": self.supports_web_deployment,
            "supports_api_deployment": self.supports_api_deployment,
            "deployment_complexity": self.deployment_complexity,
            "portfolio_ready": self.portfolio_ready,
            "assessment_details": self.assessment_details,
        }


@dataclass
class PlatformEvaluation:
    """Evaluation of a platform against research and criteria.
    
    Attributes:
        platform: The platform being evaluated
        reproducibility_score: Reproducibility score (0.0 to 1.0)
        git_integration_score: Git integration score (0.0 to 1.0)
        ai_compatibility_score: AI compatibility score (0.0 to 1.0)
        workflow_support_score: Workflow support score (0.0 to 1.0)
        deployment_capability_score: Deployment capability score (0.0 to 1.0)
        overall_score: Overall score (0.0 to 1.0)
        strengths: List of platform strengths
        weaknesses: List of platform weaknesses
        research_alignment: Research alignment ("strong", "moderate", "weak")
        supporting_evidence: List of supporting research findings
    """
    platform: Platform
    reproducibility_score: float
    git_integration_score: float
    ai_compatibility_score: float
    workflow_support_score: float
    deployment_capability_score: float
    overall_score: float
    strengths: List[str]
    weaknesses: List[str]
    research_alignment: str
    supporting_evidence: List["ResearchFindings"]  # Forward reference

    def __post_init__(self):
        """Validate required fields."""
        scores = [
            self.reproducibility_score,
            self.git_integration_score,
            self.ai_compatibility_score,
            self.workflow_support_score,
            self.deployment_capability_score,
            self.overall_score,
        ]
        for score in scores:
            if not 0.0 <= score <= 1.0:
                raise ValueError("All scores must be between 0.0 and 1.0")
        if self.research_alignment not in ["strong", "moderate", "weak"]:
            raise ValueError(f"Invalid research_alignment: {self.research_alignment}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platform": self.platform.to_dict(),
            "reproducibility_score": self.reproducibility_score,
            "git_integration_score": self.git_integration_score,
            "ai_compatibility_score": self.ai_compatibility_score,
            "workflow_support_score": self.workflow_support_score,
            "deployment_capability_score": self.deployment_capability_score,
            "overall_score": self.overall_score,
            "strengths": self.strengths,
            "weaknesses": self.weaknesses,
            "research_alignment": self.research_alignment,
            "supporting_evidence": [e.to_dict() for e in self.supporting_evidence],
        }


@dataclass
class PlatformComparison:
    """Comparison of multiple platforms.
    
    Attributes:
        platforms: List of platforms being compared
        evaluations: Dictionary mapping platform names to evaluations
        criteria_weights: Dictionary mapping criteria names to weights
        ranked_platforms: List of platform names in order of overall score
        recommendation: Recommended platform name
        recommendation_rationale: Rationale for the recommendation
    """
    platforms: List[Platform]
    evaluations: Dict[str, PlatformEvaluation]
    criteria_weights: Dict[str, float]
    ranked_platforms: List[str]
    recommendation: str
    recommendation_rationale: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.platforms:
            raise ValueError("platforms list cannot be empty")
        if not self.recommendation:
            raise ValueError("recommendation is required")
        if not self.recommendation_rationale:
            raise ValueError("recommendation_rationale is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "platforms": [p.to_dict() for p in self.platforms],
            "evaluations": {name: eval.to_dict() for name, eval in self.evaluations.items()},
            "criteria_weights": self.criteria_weights,
            "ranked_platforms": self.ranked_platforms,
            "recommendation": self.recommendation,
            "recommendation_rationale": self.recommendation_rationale,
        }


@dataclass
class MigrationGuidance:
    """Guidance for migrating from one platform to another.
    
    Attributes:
        from_platform: Source platform
        to_platform: Target platform
        migration_complexity: Migration complexity ("low", "medium", "high")
        estimated_effort: Estimated effort description
        migration_steps: List of migration steps
        conversion_tools: List of available conversion tools
        risks: List of migration risks
        benefits: List of migration benefits
    """
    from_platform: Platform
    to_platform: Platform
    migration_complexity: str
    estimated_effort: str
    migration_steps: List[str]
    conversion_tools: List[str]
    risks: List[str]
    benefits: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if self.migration_complexity not in ["low", "medium", "high"]:
            raise ValueError(f"Invalid migration_complexity: {self.migration_complexity}")
        if not self.estimated_effort:
            raise ValueError("estimated_effort is required")
        if not self.migration_steps:
            raise ValueError("migration_steps list cannot be empty")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "from_platform": self.from_platform.to_dict(),
            "to_platform": self.to_platform.to_dict(),
            "migration_complexity": self.migration_complexity,
            "estimated_effort": self.estimated_effort,
            "migration_steps": self.migration_steps,
            "conversion_tools": self.conversion_tools,
            "risks": self.risks,
            "benefits": self.benefits,
        }


@dataclass
class PlatformEvaluationSection:
    """Platform evaluation section of the report.
    
    Attributes:
        current_platform_evaluation: Evaluation of the current platform
        alternative_evaluations: List of alternative platform evaluations
        platform_comparison: Comparison of all platforms
        git_integration_assessment: Git integration assessment
        ai_compatibility_assessment: AI compatibility assessment
        workflow_support_assessment: Workflow support assessment
        reproducibility_assessment: Reproducibility assessment
        deployment_assessment: Deployment assessment
        migration_guidance: Migration guidance (if applicable)
        recommendations: List of recommendations
    """
    current_platform_evaluation: PlatformEvaluation
    alternative_evaluations: List[PlatformEvaluation]
    platform_comparison: PlatformComparison
    git_integration_assessment: GitIntegrationAssessment
    ai_compatibility_assessment: AICompatibilityAssessment
    workflow_support_assessment: WorkflowSupportAssessment
    reproducibility_assessment: ReproducibilityAssessment
    deployment_assessment: DeploymentAssessment
    migration_guidance: Optional[MigrationGuidance]
    recommendations: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "current_platform_evaluation": self.current_platform_evaluation.to_dict(),
            "alternative_evaluations": [e.to_dict() for e in self.alternative_evaluations],
            "platform_comparison": self.platform_comparison.to_dict(),
            "git_integration_assessment": self.git_integration_assessment.to_dict(),
            "ai_compatibility_assessment": self.ai_compatibility_assessment.to_dict(),
            "workflow_support_assessment": self.workflow_support_assessment.to_dict(),
            "reproducibility_assessment": self.reproducibility_assessment.to_dict(),
            "deployment_assessment": self.deployment_assessment.to_dict(),
            "migration_guidance": self.migration_guidance.to_dict() if self.migration_guidance else None,
            "recommendations": self.recommendations,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


# Import types for forward references
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .research import ResearchFindings
