
export default function MatchScore({ result }) {
  if (!result) return null;

  return (
    <section className="result-card score-card">
      <p className="eyebrow">RESUME ANALYSIS</p>
      <h2>Job Match Score</h2>

      <div className="score-circle">
        <span>{result.match_score ?? 0}%</span>
      </div>

      <p className="muted">
        Model similarity: {result.raw_similarity ?? "N/A"}
      </p>

      <p>
        Resume: <strong>{result.resume_name}</strong>
      </p>

      <p>
        Extracted characters: {result.resume_characters ?? 0}
      </p>

      <p className="muted">
        The match score is an estimate, not a probability of getting hired.
      </p>
    </section>
  );
}
