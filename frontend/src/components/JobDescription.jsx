
export default function JobDescription({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="jobDescription">Job description</label>
      <textarea
        id="jobDescription"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the complete job description here..."
        rows={10}
        required
      />
      <small>Include required skills, responsibilities, and qualifications.</small>
    </div>
  );
}
