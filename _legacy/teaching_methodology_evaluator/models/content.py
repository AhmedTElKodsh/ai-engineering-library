"""Content and delivery data models.

This module defines data models for representing curriculum content modules,
teaching patterns, delivery modes, and related structures.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Union
import json


@dataclass
class Exercise:
    """Represents a learning exercise.
    
    Attributes:
        exercise_id: Unique identifier for the exercise
        title: Exercise title
        description: Exercise description
        exercise_type: Type of exercise (e.g., "coding", "explanation", "analysis")
        difficulty: Difficulty level (e.g., "beginner", "intermediate", "advanced")
        estimated_time: Estimated completion time in minutes
    """
    exercise_id: str
    title: str
    description: str
    exercise_type: str
    difficulty: str
    estimated_time: int

    def __post_init__(self):
        """Validate required fields."""
        if not self.exercise_id:
            raise ValueError("exercise_id is required")
        if not self.title:
            raise ValueError("title is required")
        if self.difficulty not in ["beginner", "intermediate", "advanced"]:
            raise ValueError(f"Invalid difficulty: {self.difficulty}")
        if self.estimated_time <= 0:
            raise ValueError("estimated_time must be positive")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "exercise_id": self.exercise_id,
            "title": self.title,
            "description": self.description,
            "exercise_type": self.exercise_type,
            "difficulty": self.difficulty,
            "estimated_time": self.estimated_time,
        }


@dataclass
class Assessment:
    """Represents a learning assessment.
    
    Attributes:
        assessment_id: Unique identifier for the assessment
        title: Assessment title
        description: Assessment description
        assessment_type: Type of assessment (e.g., "quiz", "project", "peer-review")
        passing_criteria: Criteria for passing the assessment
    """
    assessment_id: str
    title: str
    description: str
    assessment_type: str
    passing_criteria: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.assessment_id:
            raise ValueError("assessment_id is required")
        if not self.title:
            raise ValueError("title is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "assessment_id": self.assessment_id,
            "title": self.title,
            "description": self.description,
            "assessment_type": self.assessment_type,
            "passing_criteria": self.passing_criteria,
        }


@dataclass
class AdaptationPoint:
    """Represents a point where delivery modes customize content presentation.
    
    Attributes:
        point_id: Unique identifier for the adaptation point
        location: Section of content module where adaptation occurs
        description: Description of what is being adapted
        intensive_adaptation: How Intensive Mode adapts this content
        self_paced_adaptation: How Self-Paced Mode adapts this content
    """
    point_id: str
    location: str
    description: str
    intensive_adaptation: str
    self_paced_adaptation: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.point_id:
            raise ValueError("point_id is required")
        if not self.location:
            raise ValueError("location is required")
        if not self.description:
            raise ValueError("description is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "point_id": self.point_id,
            "location": self.location,
            "description": self.description,
            "intensive_adaptation": self.intensive_adaptation,
            "self_paced_adaptation": self.self_paced_adaptation,
        }


@dataclass
class ContentModule:
    """Represents a unified content module.
    
    Attributes:
        module_id: Unique identifier for the module
        title: Module title
        learning_objectives: List of learning objectives
        pedagogical_patterns: List of pedagogical pattern names used
        exercises: List of exercises in the module
        assessments: List of assessments in the module
        estimated_time_intensive: Estimated time in minutes for Intensive Mode
        estimated_time_self_paced: Estimated time in minutes for Self-Paced Mode
        prerequisites: List of prerequisite module IDs
        adaptation_points: List of adaptation points for delivery customization
    """
    module_id: str
    title: str
    learning_objectives: List[str]
    pedagogical_patterns: List[str]
    exercises: List[Exercise]
    assessments: List[Assessment]
    estimated_time_intensive: int
    estimated_time_self_paced: int
    prerequisites: List[str] = field(default_factory=list)
    adaptation_points: List[AdaptationPoint] = field(default_factory=list)

    def __post_init__(self):
        """Validate required fields."""
        if not self.module_id:
            raise ValueError("module_id is required")
        if not self.title:
            raise ValueError("title is required")
        if not self.learning_objectives:
            raise ValueError("learning_objectives list cannot be empty")
        if self.estimated_time_intensive <= 0:
            raise ValueError("estimated_time_intensive must be positive")
        if self.estimated_time_self_paced <= 0:
            raise ValueError("estimated_time_self_paced must be positive")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "module_id": self.module_id,
            "title": self.title,
            "learning_objectives": self.learning_objectives,
            "pedagogical_patterns": self.pedagogical_patterns,
            "exercises": [e.to_dict() for e in self.exercises],
            "assessments": [a.to_dict() for a in self.assessments],
            "estimated_time_intensive": self.estimated_time_intensive,
            "estimated_time_self_paced": self.estimated_time_self_paced,
            "prerequisites": self.prerequisites,
            "adaptation_points": [ap.to_dict() for ap in self.adaptation_points],
        }

    @classmethod
    def from_dict(cls, data: dict) -> "ContentModule":
        """Create instance from dictionary."""
        data_copy = data.copy()
        data_copy["exercises"] = [Exercise(**e) for e in data.get("exercises", [])]
        data_copy["assessments"] = [Assessment(**a) for a in data.get("assessments", [])]
        data_copy["adaptation_points"] = [AdaptationPoint(**ap) for ap in data.get("adaptation_points", [])]
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class TeachingPattern:
    """Represents a pedagogical pattern in content layer.
    
    Attributes:
        pattern_id: Unique identifier for the pattern
        name: Pattern name
        description: Pattern description
        pedagogical_principle: Underlying pedagogical principle
        implementation_examples: List of implementation examples
        modules_using: List of module IDs that use this pattern
        evidence_rating: Evidence rating ("supported", "weak", "contrary", or None)
    """
    pattern_id: str
    name: str
    description: str
    pedagogical_principle: str
    implementation_examples: List[str]
    modules_using: List[str]
    evidence_rating: Optional[str] = None

    def __post_init__(self):
        """Validate required fields."""
        if not self.pattern_id:
            raise ValueError("pattern_id is required")
        if not self.name:
            raise ValueError("name is required")
        if not self.description:
            raise ValueError("description is required")
        if not self.pedagogical_principle:
            raise ValueError("pedagogical_principle is required")
        if self.evidence_rating and self.evidence_rating not in ["supported", "weak", "contrary"]:
            raise ValueError(f"Invalid evidence_rating: {self.evidence_rating}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "pattern_id": self.pattern_id,
            "name": self.name,
            "description": self.description,
            "pedagogical_principle": self.pedagogical_principle,
            "implementation_examples": self.implementation_examples,
            "modules_using": self.modules_using,
            "evidence_rating": self.evidence_rating,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "TeachingPattern":
        """Create instance from dictionary."""
        return cls(**data)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class DeliveryMechanism:
    """Represents a delivery-specific mechanism.
    
    Attributes:
        mechanism_id: Unique identifier for the mechanism
        name: Mechanism name
        description: Mechanism description
        pedagogical_principle: Underlying pedagogical principle
        mode: Delivery mode ("intensive" or "self-paced")
        implementation_guidance: Guidance for implementing the mechanism
        evidence_rating: Evidence rating ("supported", "weak", "contrary", or None)
    """
    mechanism_id: str
    name: str
    description: str
    pedagogical_principle: str
    mode: str
    implementation_guidance: str
    evidence_rating: Optional[str] = None

    def __post_init__(self):
        """Validate required fields."""
        if not self.mechanism_id:
            raise ValueError("mechanism_id is required")
        if not self.name:
            raise ValueError("name is required")
        if not self.description:
            raise ValueError("description is required")
        if self.mode not in ["intensive", "self-paced"]:
            raise ValueError(f"Invalid mode: {self.mode}")
        if self.evidence_rating and self.evidence_rating not in ["supported", "weak", "contrary"]:
            raise ValueError(f"Invalid evidence_rating: {self.evidence_rating}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "mechanism_id": self.mechanism_id,
            "name": self.name,
            "description": self.description,
            "pedagogical_principle": self.pedagogical_principle,
            "mode": self.mode,
            "implementation_guidance": self.implementation_guidance,
            "evidence_rating": self.evidence_rating,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "DeliveryMechanism":
        """Create instance from dictionary."""
        return cls(**data)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class DeliveryMode:
    """Represents a delivery mode (Intensive or Self-Paced).
    
    Attributes:
        mode_id: Unique identifier for the mode
        name: Mode name ("Intensive" or "Self-Paced")
        duration: Duration description (e.g., "40 days", "8-10 weeks")
        mechanisms: List of delivery mechanisms used in this mode
        content_modules: List of content modules delivered in this mode
        pacing_strategy: Description of the pacing strategy
    """
    mode_id: str
    name: str
    duration: str
    mechanisms: List[DeliveryMechanism]
    content_modules: List[ContentModule]
    pacing_strategy: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.mode_id:
            raise ValueError("mode_id is required")
        if not self.name:
            raise ValueError("name is required")
        if self.name not in ["Intensive", "Self-Paced"]:
            raise ValueError(f"Invalid name: {self.name}")
        if not self.duration:
            raise ValueError("duration is required")
        if not self.pacing_strategy:
            raise ValueError("pacing_strategy is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "mode_id": self.mode_id,
            "name": self.name,
            "duration": self.duration,
            "mechanisms": [m.to_dict() for m in self.mechanisms],
            "content_modules": [cm.to_dict() for cm in self.content_modules],
            "pacing_strategy": self.pacing_strategy,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "DeliveryMode":
        """Create instance from dictionary."""
        data_copy = data.copy()
        data_copy["mechanisms"] = [DeliveryMechanism.from_dict(m) for m in data.get("mechanisms", [])]
        data_copy["content_modules"] = [ContentModule.from_dict(cm) for cm in data.get("content_modules", [])]
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)
