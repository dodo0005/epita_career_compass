import { useState, useEffect, useRef } from "react";
import { sendMessage, getChatHistory, getSessions } from "../services/api";
import MessageBubble from "../components/MessageBubble";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "./chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadSessions = async () => {
    try {
      const res = await getSessions();
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  };

  const handleSelectSession = async (sessionId) => {
    setActiveSessionId(sessionId);
    try {
      const res = await getChatHistory(sessionId);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(trimmed, activeSessionId);
      const { reply, sessionId } = res.data;

      if (!activeSessionId) {
        setActiveSessionId(sessionId);
        loadSessions();
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-layout">
      <Navbar />
      <div className="chat-body">
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onNewSession={handleNewSession}
        />

        <div className="chat-main">
          <div className="messages-area">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="welcome-icon">🧭</div>
                <h2>What's your EPITA path?</h2>
                <p>Tell me your interests and I'll help you find your specialization.</p>
                <div className="welcome-suggestions">
                  <button onClick={() => setInput("I enjoy backend development and Linux. What specialization should I pick?")}>
                    💻 Backend & Linux
                  </button>
                  <button onClick={() => setInput("I'm interested in AI and machine learning. What are my options?")}>
                    🤖 AI & Machine Learning
                  </button>
                  <button onClick={() => setInput("I like cybersecurity and networking. What path is best?")}>
                    🔐 Cybersecurity
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {loading && (
              <div className="bubble-wrapper bubble-ai">
                <div className="bubble-avatar">🧭</div>
                <div className="bubble bubble-ai-msg typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="input-area">
            <textarea
              className="chat-input"
              placeholder="Describe your interests, skills, or what you enjoy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
