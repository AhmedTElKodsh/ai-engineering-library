"""Gap analysis and recommendation data models.

This module defines data models for representing gaps in teaching patterns,
impact and difficulty assessments, and actionable recommendations.
"""

from dataclasses import dataclass, field
from typing import List, Optional
import json


@dataclass
class ImpactAssessment:
    """Assessment of potential impact.
    
    Attributes:
        impact_level: Impact level ("low", "medium", "high")
        expected_outcomes: List of expected outcomes
        affected_modules: List of module IDs that would be affected
        rationale: Explanation of the impact assessment
    """
    impact_level: str
    expected_outcomes: List[str]
    affected_modules: List[str]
    rationale: str

    def __post_init__(self):
        """Validate required fields."""
        if self.impact_level not in ["low", "medium", "high"]:
            raise ValueError(f"Invalid impact_level: {self.impact_level}")
        if not self.expected_outcomes:
            raise ValueError("expected_outcomes list cannot be empty")
        if not self.rationale:
            raise ValueError("rationale is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "impact_level": self.impact_level,
            "expected_outcomes": self.expected_outcomes,
            "affected_modules": self.affected_modules,
            "rationale": self.rationale,
        }


@dataclass
class DifficultyAssessment:
    """Assessment of implementation difficulty.
    
    Attributes:
        difficulty_level: Difficulty level ("low", "medium", "high")
        required_resources: List of required resources
        estimated_effort: Estimated effort description
        dependencies: List of dependencies
        risks: List of implementation risks
    """
    difficulty_level: str
    required_resources: List[str]
    estimated_effort: str
    dependencies: List[str]
    risks: List[str] = field(default_factory=list)

    def __post_init__(self):
        """Validate required fields."""
        if self.difficulty_level not in ["low", "medium", "high"]:
            raise ValueError(f"Invalid difficulty_level: {self.difficulty_level}")
        if not self.required_resources:
            raise ValueError("required_resources list cannot be empty")
        if not self.estimated_effort:
            raise ValueError("estimated_effort is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "difficulty_level": self.difficulty_level,
            "required_resources": self.required_resources,
            "estimated_effort": self.estimated_effort,
            "dependencies": self.dependencies,
            "risks": self.risks,
        }


@dataclass
class Gap:
    """Represents a missing pattern or mechanism.
    
    Attributes:
        gap_id: Unique identifier for the gap
        gap_type: Type of gap ("content-pattern", "intensive-mechanism", "self-paced-mechanism")
        name: Name of the missing element
        description: Description of the gap
        supporting_research: List of research findings supporting the gap identification
        impact_assessment: Assessment of potential impact (optional)
        difficulty_assessment: Assessment of implementation difficulty (optional)
        implementation_examples: List of implementation examples
        priority_score: Priority score based on impact-to-effort ratio (optional)
    """
    gap_id: str
    gap_type: str
    name: str
    description: str
    supporting_research: List["ResearchFindings"]  # Forward reference
    impact_assessment: Optional[ImpactAssessment] = None
    difficulty_assessment: Optional[DifficultyAssessment] = None
    implementation_examples: List[str] = field(default_factory=list)
    priority_score: Optional[float] = None

    def __post_init__(self):
        """Validate required fields."""
        if not self.gap_id:
            raise ValueError("gap_id is required")
        if self.gap_type not in ["content-pattern", "intensive-mechanism", "self-paced-mechanism"]:
            raise ValueError(f"Invalid gap_type: {self.gap_type}")
        if not self.name:
            raise ValueError("name is required")
        if not self.description:
            raise ValueError("description is required")
        if not self.supporting_research:
            raise ValueError("supporting_research list cannot be empty")
        if self.priority_score is not None and self.priority_score < 0:
            raise ValueError("priority_score must be non-negative")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "gap_id": self.gap_id,
            "gap_type": self.gap_type,
            "name": self.name,
            "description": self.description,
            "supporting_research": [r.to_dict() for r in self.supporting_research],
            "impact_assessment": self.impact_assessment.to_dict() if self.impact_assessment else None,
            "difficulty_assessment": self.difficulty_assessment.to_dict() if self.difficulty_assessment else None,
            "implementation_examples": self.implementation_examples,
            "priority_score": self.priority_score,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Gap":
        """Create instance from dictionary."""
        from .research import ResearchFindings
        data_copy = data.copy()
        data_copy["supporting_research"] = [
            ResearchFindings.from_dict(r) for r in data.get("supporting_research", [])
        ]
        if data.get("impact_assessment"):
            data_copy["impact_assessment"] = ImpactAssessment(**data["impact_assessment"])
        if data.get("difficulty_assessment"):
            data_copy["difficulty_assessment"] = DifficultyAssessment(**data["difficulty_assessment"])
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class Recommendation:
    """Actionable recommendation for improvement.
    
    Attributes:
        recommendation_id: Unique identifier for the recommendation
        title: Recommendation title
        description: Detailed description
        target: Target layer ("content-layer", "intensive-mode", "self-paced-mode", "both-modes")
        supporting_evidence: List of research findings supporting the recommendation
        implementation_effort: Implementation effort ("low", "medium", "high")
        expected_impact: Expected impact ("low", "medium", "high")
        priority_score: Priority score based on impact-to-effort ratio
        implementation_guidance: Guidance for implementing the recommendation
        affected_modules: List of module IDs affected by the recommendation
        quick_win: Whether this is a quick win (low effort, high impact)
    """
    recommendation_id: str
    title: str
    description: str
    target: str
    supporting_evidence: List["ResearchFindings"]  # Forward reference
    implementation_effort: str
    expected_impact: str
    priority_score: float
    implementation_guidance: str
    affected_modules: List[str]
    quick_win: bool = False

    def __post_init__(self):
        """Validate required fields."""
        if not self.recommendation_id:
            raise ValueError("recommendation_id is required")
        if not self.title:
            raise ValueError("title is required")
        if not self.description:
            raise ValueError("description is required")
        if self.target not in ["content-layer", "intensive-mode", "self-paced-mode", "both-modes"]:
            raise ValueError(f"Invalid target: {self.target}")
        if self.implementation_effort not in ["low", "medium", "high"]:
            raise ValueError(f"Invalid implementation_effort: {self.implementation_effort}")
        if self.expected_impact not in ["low", "medium", "high"]:
            raise ValueError(f"Invalid expected_impact: {self.expected_impact}")
        if self.priority_score < 0:
            raise ValueError("priority_score must be non-negative")
        if not self.implementation_guidance:
            raise ValueError("implementation_guidance is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "recommendation_id": self.recommendation_id,
            "title": self.title,
            "description": self.description,
            "target": self.target,
            "supporting_evidence": [e.to_dict() for e in self.supporting_evidence],
            "implementation_effort": self.implementation_effort,
            "expected_impact": self.expected_impact,
            "priority_score": self.priority_score,
            "implementation_guidance": self.implementation_guidance,
            "affected_modules": self.affected_modules,
            "quick_win": self.quick_win,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Recommendation":
        """Create instance from dictionary."""
        from .research import ResearchFindings
        data_copy = data.copy()
        data_copy["supporting_evidence"] = [
            ResearchFindings.from_dict(e) for e in data.get("supporting_evidence", [])
        ]
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


# Import types for forward references
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .research import ResearchFindings
