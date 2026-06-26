export default function Sidebar({ sessions, activeSessionId, onSelectSession, onNewSession }) {
  return (
    <div className="sidebar">
      <button className="sidebar-new-btn" onClick={onNewSession}>
        + New Chat
      </button>
      <div className="sidebar-sessions">
        {sessions.length === 0 && (
          <p className="sidebar-empty">No previous chats yet.</p>
        )}
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`sidebar-session ${session.id === activeSessionId ? "sidebar-session-active" : ""}`}
            onClick={() => onSelectSession(session.id)}
          >
            <span className="session-icon">💬</span>
            <span className="session-title">{session.title || "Untitled chat"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
