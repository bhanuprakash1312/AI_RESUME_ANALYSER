
export default function ResumeUpload({ file, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="resume">Upload your resume (PDF)</label>
      <input
        id="resume"
        type="file"
        accept=".pdf,application/pdf"
        onChange={(event) => onChange(event.target.files?.[0] || null)}
        required
      />

      {file && (
        <p className="file-info">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}
