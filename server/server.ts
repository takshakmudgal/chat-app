import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import type { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.BACKEND_PORT ?? 8080;

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const expressServer = app.listen(port, () => {
  console.log(`server_hosted_at_http://localhost:${port}`);
});

const io = new Server(expressServer, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log(`websocket_hosted_at_ws://localhost:${port}`);
  socket.emit("receive_message", {
    content: "Welcome to the chat!",
    from: "server",
  });
  socket.on("send_message", (msg: string) => {
    io.emit("receive_message", { content: msg, from: socket.id });
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("hiii_welcome_to_yoursdfs_expresssdfsd _server");
});
