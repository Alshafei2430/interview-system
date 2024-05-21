import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";

import routes from "./routes";
import { app, httpServer } from "./socket/socket";
import "./strategies/local-strategy";

import type { Request, Response } from "express";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.authenticate("session"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use(routes);

app.use(errorHandler);
app.use(notFoundHandler);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
