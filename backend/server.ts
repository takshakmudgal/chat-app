import express from "express";
import type { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hiii_welcome_to_your_express_server");
});



app.listen(port, () => {
  console.log(`Server_Up_http://localhost:${port}`);
});
