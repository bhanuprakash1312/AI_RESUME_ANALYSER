
export default function Recommendations({ recommendations = [] }) {
  return (
    <section className="result-card">
      <h2>YouTube Learning Recommendations</h2>
      <p className="muted">
        Learn the skills identified as missing from your resume.
      </p>

      {recommendations.length === 0 && (
        <p>No recommendations were returned. You may have no detected skill gaps.</p>
      )}

      {recommendations.map((item) => (
        <div className="recommendation-group" key={item.skill}>
          <h3>Learn {item.skill}</h3>

          {item.videos?.length ? (
            <div className="video-grid">
              {item.videos.map((video) => (
                <a
                  className="video-card"
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={video.video_id}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.title}`}
                    loading="lazy"
                  />
                  <div className="video-details">
                    <h4>{video.title}</h4>
                    <p>{video.channel}</p>
                    <span>Watch on YouTube ↗</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="muted">
              {item.error || "No videos found for this skill."}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
