export default function VideoPlayerModal({ lesson, onClose }) {
  if (!lesson) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose} role="presentation">
      <div className="video-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="video-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="video-modal-badge">📹 {lesson.type}</div>
        <h3>{lesson.title}</h3>
        <p className="video-modal-meta">Duration: {lesson.duration}</p>
        <div className="video-modal-player">
          <div className="video-placeholder">
            <span>▶</span>
            <p>Lesson player</p>
            <small>Connect your video host (YouTube, Vimeo, or LMS stream) here.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
