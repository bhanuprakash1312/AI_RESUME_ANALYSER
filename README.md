# AI-Powered Resume and Job Description Matcher

An AI-powered application that analyzes resumes against job descriptions, calculates a semantic similarity score, identifies matching skills, and highlights missing skills to help candidates understand how well their profiles align with job requirements.

## 🚀 Project Overview

The **AI-Powered Resume and Job Description Matcher** combines a frontend interface, backend processing, and a semantic matching model to simplify resume evaluation and skill gap analysis.

Users can provide their resume and a job description to receive:

- An AI-based resume–job description similarity score.
- A list of skills found in both the resume and job description.
- A list of potentially missing skills.
- Insights to help candidates improve their resumes and prepare for target roles.

## ✨ Key Features

### 1. Frontend

- User-friendly interface for submitting resume content and job descriptions.
- Input validation and feedback for incomplete submissions.
- Displays the resume matching score.
- Shows matched skills and missing skills.
- Presents analysis results in an easy-to-understand format.

### 2. Backend

- Receives resume and job description data from the frontend.
- Validates and processes the submitted text.
- Integrates with the AI matching module.
- Calculates and returns the matching score and skill gap analysis.
- Provides structured results for frontend display.

### 3. AI Model

- Uses a pretrained Sentence Transformer model for semantic text representation.
- Converts the resume and job description into numerical embeddings.
- Uses cosine similarity to estimate semantic similarity.
- Extracts skills using a configurable skill vocabulary.
- Identifies matched and missing skills through set comparison.

## 🛠️ Technology Stack

| Component                  | Technology                      |
| -------------------------- | ------------------------------- |
| Frontend                   | React.js, JavaScript, HTML, CSS |
| Backend                    | Python, FastAPI                 |
| AI / NLP                   | Sentence Transformers           |
| Matching algorithm         | Cosine similarity               |
| Skill extraction           | Python regular expressions      |
| Machine learning utilities | Scikit-learn                    |
| Communication              | REST API                        |
| Version control            | Git and GitHub                  |

*Update this table if your actual implementation uses different frameworks or tools.*

## 🧠 AI Model and Matching Methodology

The AI component evaluates the semantic relationship between a resume and a job description rather than relying exclusively on exact word matches.

### Step 1: Text input

The application receives the candidate's resume text and the target job description.

### Step 2: Text embedding

A pretrained Sentence Transformer converts both text inputs into numerical embeddings.

Configured model:
`shankerram3/resumator`

The model identifier should be verified for availability and compatibility with the Sentence Transformers library before deployment.

### Step 3: Semantic similarity

The system calculates cosine similarity between the two embeddings and converts the result into a percentage-style score.

The score represents text similarity; it is **not a probability of getting hired** or a guarantee of suitability for the role.

### Step 4: Skill extraction

The system searches both texts for skills defined in a configurable skill list. Regular expressions are used to match skill names while reducing accidental partial-word matches.

### Step 5: Skill gap analysis

The extracted skills are compared to identify:

- **Matched skills:** Skills detected in both the resume and job description.
- **Missing skills:** Skills detected in the job description but not detected in the resume.
- **Resume skills:** Skills detected in the candidate's resume.
- **Required skills:** Skills detected in the job description.

### Step 6: Results

The backend returns the matching score and skill analysis to the frontend for presentation.

## 🏗️ System Architecture

```text
┌──────────────────────────────┐
│       React Frontend         │
│                              │
│  Resume + Job Description    │
└──────────────┬───────────────┘
               │
               │ REST API Request
               ▼
┌──────────────────────────────┐
│       FastAPI Backend        │
│                              │
│  Input Validation            │
│  Request Processing          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       AI Matching Module     │
│                              │
│  Sentence Embeddings         │
│  Cosine Similarity           │
│  Skill Extraction            │
│  Skill Gap Analysis          │
└──────────────┬───────────────┘
               │
               │ Analysis Results
               ▼
┌──────────────────────────────┐
│       React Frontend         │
│                              │
│  Match Score                 │
│  Matched Skills              │
│  Missing Skills              │
└──────────────────────────────┘
```

## 📁 Suggested Project Structure

```text
ai-resume-job-matcher/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── schemas/
│   ├── requirements.txt
│   └── .env.example
│
├── ai_model/
│   ├── resume_matcher.py
│   └── README.md
│
├── .gitignore
└── README.md
```

*This is a suggested organization; adjust it to match your actual repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.10 or another Python version compatible with your dependencies.
- Node.js and npm.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/bhanuprakash1312/AI_RESUME_ANALYSER
cd ai-resume-job-matcher
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

If your backend uses additional libraries, install them from your `requirements.txt` file.

Start the FastAPI server, assuming the application entry point is `app/main.py`:

```bash
uvicorn app.main:app --reload
```

The local API documentation is typically available at:

`http://127.0.0.1:8000/docs`

### 3. Set up the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL displayed by Vite in your terminal.

Ensure the frontend's API base URL matches the backend address and port.

## 🔌 Frontend–Backend Integration

The frontend sends the resume and job description to a backend endpoint. The backend processes the input using the matching module and returns a structured response.

Example response format:

```json
{
  "match_score": 82.45,
  "matched_skills": [
    "python",
    "sql",
    "fastapi"
  ],
  "missing_skills": [
    "docker",
    "aws"
  ]
}
```

This is an illustrative response format. Adjust the property names and endpoint details to match your implementation.

## 🧪 Example Use Case

**Resume summary:**

> Python developer with experience in SQL, FastAPI, REST API development, and machine learning.

**Job description:**

> Looking for a developer skilled in Python, SQL, FastAPI, Docker, AWS, and machine learning.

**Expected skill analysis:**

- Matched skills: Python, SQL, FastAPI, Machine Learning.
- Potentially missing skills: Docker, AWS.
- Similarity score: Calculated by the AI matching module.

The actual similarity score depends on the model and input text.

## 🔐 Security and Privacy

- Validate incoming data on the backend.
- Avoid logging complete resumes or other sensitive personal information.
- Keep API credentials and secrets out of source control.
- Configure CORS for trusted frontend origins.
- Use HTTPS when deploying the application.
- Explain how resume data is processed and stored, if storage is implemented.

## ⚠️ Limitations

- Semantic similarity does not directly measure hiring suitability.
- Skill extraction depends on the configured skill vocabulary.
- Synonyms, abbreviations, and skills not included in the vocabulary may be missed.
- Missing skills indicate that a skill was not detected in the resume, not necessarily that the candidate lacks that skill.
- Resume PDF/DOCX parsing, authentication, persistent storage, and deployment depend on whether those features are implemented.

## 🔮 Future Enhancements

- Add PDF and DOCX resume parsing.
- Improve skill extraction using named-entity recognition or a dedicated skill extraction model.
- Support skill synonyms and role-specific skill taxonomies.
- Recommend learning resources for identified skill gaps.
- Add resume improvement suggestions.
- Evaluate matching quality using labeled resume–job description pairs.
- Add user accounts and saved analysis history.
- Deploy the frontend, backend, and model with suitable hosting services.

## 🤝 Contributing

Contributions are welcome. Fork the repository, create a feature branch, make your changes, and submit a pull request.

## 📄 License

Choose and add an appropriate open-source license before distributing the project publicly.

## 👨‍💻 Author

**Bhanuprakash**

AI-powered resume analysis, semantic text matching, and skill gap identification.
