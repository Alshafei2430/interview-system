import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import {
  ipInternetRegex,
  ipItnozomRegex,
  ipLocalHostRegex,
  testApiClient,
} from "../constants/allowed-domains";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [ipLocalHostRegex, ipInternetRegex, ipItnozomRegex, testApiClient],
    credentials: true,
  },
});

const leaderQueue = [];
const secretaryQueue = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("change_appointment_status", (newStatus, appointmentId) => {
    console.log(socket.listeners);
    console.log(
      `changing appointment status for appointment ${appointmentId} to  ${newStatus}`
    );

    console.log(
      `changed appointment status for appointment ${appointmentId} to  ${newStatus}`
    );
    socket.broadcast.emit(
      "appointment_status_changed",
      newStatus,
      appointmentId
    );
  });

  socket.on("appointment_deleted", () => {
    socket.to("room-");
  });
  socket.on("disconnect", (reason, details) => {
    console.log(socket.id); // false
    console.log(socket.connected); // false
    console.log(reason); // false
    console.log(details); // false
  });
});

export { app, httpServer, io };
