"""Sample research data for testing."""

from teaching_methodology_evaluator.models import ResearchFindings, ResearchSource

# Sample research sources
SAMPLE_SOURCE_1 = ResearchSource(
    title="Spaced Repetition in Technical Education",
    authors=["Smith, J.", "Doe, A."],
    publication_date="2024-03-15",
    source_type="peer-reviewed",
    url="https://example.com/paper1",
    citation="Smith, J., & Doe, A. (2024). Spaced Repetition in Technical Education. Journal of Educational Psychology, 45(2), 123-145.",
    abstract="This study examines the effectiveness of spaced repetition in technical skills education...",
)

SAMPLE_SOURCE_2 = ResearchSource(
    title="Productive Failure in Programming Education",
    authors=["Johnson, B."],
    publication_date="2024-06-20",
    source_type="peer-reviewed",
    url="https://example.com/paper2",
    citation="Johnson, B. (2024). Productive Failure in Programming Education. ACM Transactions on Computing Education, 12(3), 45-67.",
    abstract="This research investigates the role of productive failure in learning programming...",
)

SAMPLE_SOURCE_3 = ResearchSource(
    title="AI-Era Programming Education",
    authors=["Lee, C.", "Wang, D."],
    publication_date="2025-01-10",
    source_type="peer-reviewed",
    url="https://example.com/paper3",
    citation="Lee, C., & Wang, D. (2025). AI-Era Programming Education: Code Comprehension First. IEEE Transactions on Education, 68(1), 89-102.",
    abstract="This paper proposes a code comprehension-first approach for programming education in the AI era...",
)

# Sample research findings
SAMPLE_FINDINGS_1 = ResearchFindings(
    source=SAMPLE_SOURCE_1,
    pedagogical_domain="spaced repetition",
    key_findings=[
        "Spaced repetition improves long-term retention by 30-40%",
        "Optimal spacing intervals: 1 day, 3 days, 7 days, 14 days",
        "Most effective when combined with active recall",
    ],
    methodology="Randomized controlled trial with 200 participants",
    sample_size=200,
    conclusions=[
        "Spaced repetition should be integrated into technical curricula",
        "Digital tools can automate spacing schedules",
    ],
    limitations=[
        "Study limited to undergraduate students",
        "Short-term study (12 weeks)",
    ],
)

SAMPLE_FINDINGS_2 = ResearchFindings(
    source=SAMPLE_SOURCE_2,
    pedagogical_domain="productive failure",
    key_findings=[
        "Productive failure improves problem-solving skills",
        "Students who struggle before instruction show 25% better transfer",
        "Requires consolidation phase after struggle",
    ],
    methodology="Quasi-experimental design with pre/post tests",
    sample_size=150,
    conclusions=[
        "Productive failure should precede direct instruction",
        "Consolidation phase is critical for learning",
    ],
    limitations=[
        "May increase cognitive load for novices",
        "Requires careful scaffolding",
    ],
)

SAMPLE_FINDINGS_3 = ResearchFindings(
    source=SAMPLE_SOURCE_3,
    pedagogical_domain="code comprehension",
    key_findings=[
        "Code comprehension should precede code generation",
        "Reading and explaining code improves understanding",
        "AI tools make code generation easier but comprehension harder",
    ],
    methodology="Mixed methods: surveys and performance analysis",
    sample_size=300,
    conclusions=[
        "Curricula should emphasize code reading and explanation",
        "Explain-in-Plain-English (EiPE) exercises are effective",
    ],
    limitations=[
        "Rapidly evolving AI tool landscape",
        "Limited longitudinal data",
    ],
)

# Collections for testing
ALL_SAMPLE_SOURCES = [SAMPLE_SOURCE_1, SAMPLE_SOURCE_2, SAMPLE_SOURCE_3]
ALL_SAMPLE_FINDINGS = [SAMPLE_FINDINGS_1, SAMPLE_FINDINGS_2, SAMPLE_FINDINGS_3]
