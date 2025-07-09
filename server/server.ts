import express from "express";
import { Server } from "socket.io";
import type { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.BACKEND_PORT ?? 5000;

const app = express();
const io = new Server(
  app.listen(port, () => {
    console.log(`server_hosted_at_http://localhost:${port}`);
  })
);

io.on("connection", (socket) => {
  console.log("connected to websocket");
  socket.emit("connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("hiii_welcome_to_your_express_server");
});
