
const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeResume(jobDescription, resumeFile) {
  const formData = new FormData();
  formData.append("job_description", jobDescription);
  formData.append("resume", resumeFile);

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Resume analysis failed.");
  }

  return data;
}
