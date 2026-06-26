export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`bubble-wrapper ${isUser ? "bubble-user" : "bubble-ai"}`}>
      <div className="bubble-avatar">{isUser ? "👤" : "🧭"}</div>
      <div className={`bubble ${isUser ? "bubble-user-msg" : "bubble-ai-msg"}`}>
        {message.content}
      </div>
    </div>
  );
}
