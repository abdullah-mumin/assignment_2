import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

//perser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Root Devs!");
});

app.post("/", (req: Request, res: Response) => {
  res.send("Hello from Root Devs!");
});

export default app;
