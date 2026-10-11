
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .skill_analyzer import analyze_skill_gaps
from .youtube_service import search_learning_videos
from .pdf_parser import extract_text_from_pdf
from .matcher import calculate_match_score
import requests
app = FastAPI(
    title="AI Resume Job Matcher",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AI Resume Job Matcher API is running"
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}



@app.post("/api/analyze")
async def analyze_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    if not resume.filename or not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF resumes are supported."
        )

    file_bytes = await resume.read()

    try:
        resume_text = extract_text_from_pdf(file_bytes)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read the uploaded PDF."
        )

    if len(resume_text) < 100:
        raise HTTPException(
            status_code=400,
            detail="Could not extract enough text from the resume. The PDF may be scanned."
        )

    result = calculate_match_score(
        job_description,
        resume_text
    )

    skill_analysis = analyze_skill_gaps(
        job_description,
        resume_text
    )

    recommendations = []

    for skill in skill_analysis["missing_skills"][:3]:
        try:
            videos = search_learning_videos(skill, max_results=3)
            recommendations.append({
                "skill": skill,
                "videos": videos
            })
        except Exception:
            recommendations.append({
                "skill": skill,
                "videos": [],
                "error": "Video recommendations are temporarily unavailable."
            })

    return {
        "resume_name": resume.filename,
        "resume_characters": len(resume_text),
        **result,
        **skill_analysis,
        "recommendations": recommendations
    }


@app.get("/api/youtube/search")
def youtube_search(skill: str):
    try:
        videos = search_learning_videos(skill, max_results=3)
        return {
            "skill": skill,
            "videos": videos
        }
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    except requests.RequestException:
        raise HTTPException(
            status_code=502,
            detail="YouTube API request failed."
        )
