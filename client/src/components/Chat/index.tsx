import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Get server URL from environment variables, fallback to localhost for development
const serverUrl = process.env.BUN_PUBLIC_SERVER_URL || "http://localhost:8080";
const socket = io(serverUrl);

interface Message {
  content: string;
  from: string;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [socketId, setSocketId] = useState<string | null>(null);

  useEffect(() => {
    const handleConnect = () => {
      setSocketId(socket.id ?? null);
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("connect", handleConnect);
    socket.on("receive_message", handleReceiveMessage);

    if (socket.id) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const appendInArray = () => {
    if (input.trim() === "") return;
    socket.emit("send_message", input);
    setInput("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      appendInArray();
    }
  };

  return (
    <div className="page-container">
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${
              msg.from === socketId ? "my-message-row" : "other-message-row"
            }`}
          >
            <div
              className={`message ${
                msg.from === socketId
                  ? "my-message"
                  : msg.from === "server"
                  ? "server-message"
                  : "other-message"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Type a message..."
        />
        <button onClick={appendInArray}>Send</button>
      </div>
    </div>
  );
};
