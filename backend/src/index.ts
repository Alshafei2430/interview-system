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

// Regular expression to match loclahost
const ipLocalHostRegex = /^http:\/\/localhost(:\d+)?$/;
// Regular expression to match IPs from 192.168.1.x
const ipInternetRegex = /^http:\/\/192\.168\.1\.\d+(:\d+)?$/;
// Regular expression to match IPs from 128.6.1.x
const ipItnozomRegex = /^http:\/\/128\.6\.1\.\d+(:\d+)?$/;
const testApiClient = "https://hoppscotch.io";

app.use(
  cors({
    origin: [ipLocalHostRegex, ipInternetRegex, ipItnozomRegex, testApiClient],
    credentials: true,
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
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
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
