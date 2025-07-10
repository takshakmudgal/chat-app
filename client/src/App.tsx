import "./index.css";

import logo from "../public/logo.svg";
import reactLogo from "../public/react.svg";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("ws://localhost:8080");

export function App() {
  const [input, setInput] = useState("");
  const sendInput = () => {
    socket.emit("send_message", input);
  };

  return (
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Bun Logo" className="logo bun-logo" />
        <img src={reactLogo} alt="React Logo" className="logo react-logo" />
      </div>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <br />
      <button onClick={sendInput}>sned!</button>
    </div>
  );
}

export default App;
