
import re

SKILL_KEYWORDS = [
    "Python",
    "FastAPI",
    "Flask",
    "REST API",
    "SQL",
    "PostgreSQL",
    "SQLAlchemy",
    "Git",
    "GitHub",
    "Docker",
    "pytest",
    "Data Structures and Algorithms",
]


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def analyze_skill_gaps(job_description: str, resume_text: str):
    jd = normalize(job_description)
    resume = normalize(resume_text)

    required_skills = [
        skill
        for skill in SKILL_KEYWORDS
        if normalize(skill) in jd
    ]

    matched_skills = [
        skill
        for skill in required_skills
        if normalize(skill) in resume
    ]

    missing_skills = [
        skill
        for skill in required_skills
        if normalize(skill) not in resume
    ]

    match_percentage = (
        round(len(matched_skills) / len(required_skills) * 100)
        if required_skills
        else 0
    )

    return {
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "skill_match_percentage": match_percentage,
    }
