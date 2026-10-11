
export default function SkillGaps({ result }) {
  if (!result) return null;

  const {
    required_skills = [],
    matched_skills = [],
    missing_skills = [],
    skill_match_percentage = 0,
  } = result;

  return (
    <section className="result-card">
      <h2>Skill Analysis</h2>

      <div className="coverage">
        <span>Skill coverage</span>
        <strong>{skill_match_percentage}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${Math.max(0, Math.min(100, skill_match_percentage))}%`,
          }}
        />
      </div>

      <h3>Required skills</h3>
      <div className="skill-list">
        {required_skills.length ? (
          required_skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))
        ) : (
          <p className="muted">No supported skills were detected in the job description.</p>
        )}
      </div>

      <h3>Skills found in your resume</h3>
      <div className="skill-list">
        {matched_skills.length ? (
          matched_skills.map((skill) => (
            <span className="skill-tag matched" key={skill}>
              ✓ {skill}
            </span>
          ))
        ) : (
          <p className="muted">No matching skills detected.</p>
        )}
      </div>

      <h3>Skills to improve</h3>
      <div className="skill-list">
        {missing_skills.length ? (
          missing_skills.map((skill) => (
            <span className="skill-tag missing" key={skill}>
              {skill}
            </span>
          ))
        ) : (
          <p className="muted">No skill gaps detected by the current keyword analyzer.</p>
        )}
      </div>

      <p className="muted">
        Skill coverage is based on keyword matching and may not capture equivalent
        skills or experience described differently.
      </p>
    </section>
  );
}
