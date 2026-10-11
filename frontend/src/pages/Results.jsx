
import MatchScore from "../components/MatchScore";
import SkillGaps from "../components/SkillGaps";
import Recommendations from "../components/Recommendations";

export default function Results({ result }) {
  if (!result) return null;

  return (
    <div className="results-section" id="results">
      <div className="section-heading">
        <p className="eyebrow">YOUR RESULTS</p>
        <h2>Resume Analysis Report</h2>
        <p className="muted">
          Review your match score, skill gaps, and learning resources.
        </p>
      </div>

      <MatchScore result={result} />
      <SkillGaps result={result} />
      <Recommendations recommendations={result.recommendations || []} />
    </div>
  );
}
