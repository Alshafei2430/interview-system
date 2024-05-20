import cors from "cors";
import helmet from "helmet";

import { app, httpServer } from "./socket/socket";
import type { Request, Response } from "express";

const PORT = Bun.env.PORT;

import { db } from "./drizzle";

app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
