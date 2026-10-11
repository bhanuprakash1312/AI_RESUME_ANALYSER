
import { useState } from "react";
import { analyzeResume } from "../services/api";
import JobDescription from "../components/JobDescription";
import ResumeUpload from "../components/ResumeUpload";
import Results from "./Results";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    if (!resumeFile) {
      setError("Please select a PDF resume.");
      return;
    }

    if (
      !resumeFile.name.toLowerCase().endsWith(".pdf") ||
      (resumeFile.type && resumeFile.type !== "application/pdf")
    ) {
      setError("Please upload a valid PDF resume.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeResume(jobDescription, resumeFile);
      setResult(data);

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-badge">AI-POWERED CAREER TOOL</div>
        <h1>Make your resume <span>job-ready.</span></h1>
        <p>
          Compare your resume with a job description, discover missing skills,
          and get YouTube tutorials to help you improve.
        </p>
      </section>

      <section className="analyzer-card">
        <div className="section-heading">
          <p className="eyebrow">START YOUR ANALYSIS</p>
          <h2>Match your resume to a job</h2>
          <p className="muted">
            Add the job requirements and upload your resume in PDF format.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
          />

          <ResumeUpload
            file={resumeFile}
            onChange={setResumeFile}
          />

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button className="analyze-button" type="submit" disabled={loading}>
            {loading ? "Analyzing your resume..." : "Analyze Resume →"}
          </button>

          <p className="privacy-note">
            Your resume is sent to your configured backend for analysis.
          </p>
        </form>
      </section>

      {loading && (
        <p className="loading-message" role="status">
          Analyzing your resume and fetching learning recommendations. This
          may take a little while on the first request.
        </p>
      )}

      <Results result={result} />
    </main>
  );
}
