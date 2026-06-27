import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`bubble-wrapper ${isUser ? "bubble-user" : "bubble-ai"}`}>
      <div className="bubble-avatar">{isUser ? "👤" : "🧭"}</div>
      <div className={`bubble ${isUser ? "bubble-user-msg" : "bubble-ai-msg"}`}>
        {isUser ? message.content : <ReactMarkdown>{message.content}</ReactMarkdown>}
      </div>
    </div>
  );
}
