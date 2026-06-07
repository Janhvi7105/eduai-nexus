import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your free study assistant. Ask me anything about your courses, homework, or study topics!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/chatbot/ask",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "❌ Sorry, I'm having trouble right now. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={styles.chatButton}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div>
              <span style={styles.headerIcon}>🤖</span>
              <span style={styles.headerTitle}>Study Assistant (Free)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>

          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.message,
                  ...(message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage),
                }}
              >
                <div style={styles.messageBubble}>
                  <div style={styles.messageText}>{message.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={styles.botMessage}>
                <div style={styles.messageBubble}>
                  <div style={styles.typingIndicator}>Thinking...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a study question..."
              style={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              style={styles.sendButton}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "28px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
  },
  chatContainer: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "360px",
    height: "500px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    overflow: "hidden",
  },
  chatHeader: {
    background: "#2563eb",
    color: "#fff",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcon: { fontSize: "20px", marginRight: "8px" },
  headerTitle: { fontSize: "16px", fontWeight: "bold" },
  closeButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  messagesContainer: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    background: "#f9fafb",
  },
  message: { marginBottom: "12px", display: "flex" },
  messageBubble: { maxWidth: "80%" },
  messageText: {
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    lineHeight: "1.4",
    background: "#fff",
    color: "#1f2937",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  typingIndicator: {
    padding: "10px 14px",
    borderRadius: "12px",
    background: "#fff",
    color: "#6b7280",
    fontSize: "14px",
  },
  inputContainer: {
    padding: "12px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    gap: "8px",
    background: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },
  sendButton: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

styles.userMessage = {
  justifyContent: "flex-end",
  messageBubble: {
    ...styles.messageBubble,
    background: "#2563eb",
  },
  messageText: {
    ...styles.messageText,
    background: "#2563eb",
    color: "#fff",
  },
};

styles.botMessage = {
  justifyContent: "flex-start",
};

export default Chatbot;