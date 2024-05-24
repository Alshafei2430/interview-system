import { Router } from "express";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SECRETARY_ALREADY_EXISTS,
  UNAUTHORIZED,
} from "../constants/http.errors";
import { SECRETARY_ROLE } from "../constants/roles";
import { db } from "../drizzle";
import { appointments, user } from "../drizzle/schema";
import { eq, or } from "drizzle-orm";

const router = Router();

router.get("/", async function (req, res, next) {
  if (!req.user) {
    return next(UNAUTHORIZED);
  }

  const user = req.user;

  try {
    const allAppointments = await db.query.appointments.findMany({
      where: or(
        eq(appointments.leaderId, user.id),
        eq(appointments.secretaryId, user.id)
      ),
    });
    res.send(allAppointments);
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

router.post("/", async function (req, res, next) {
  if (!req.user) {
    return next(UNAUTHORIZED);
  }

  const { guestName } = req.body;

  // try {
  const secretaryFound = await db
    .select()
    .from(user)
    .where(eq(user.id, req.user.id))
    .then((users) => users[0]);
  if (!secretaryFound || secretaryFound.role !== SECRETARY_ROLE) {
    return next(UNAUTHORIZED);
  }
  const appointmentCreated = await db
    .insert(appointments)
    .values({
      guestName: guestName,
      status: "default",
      leaderId: secretaryFound.leaderId!,
      secretaryId: secretaryFound.id,
    })
    .returning()
    .then((results) => results[0]);

  res.send(appointmentCreated);
  // } catch (err) {
  //   next(INTERNAL_SERVER_ERROR);
  // }
});

router.put("/:appointmentId", async function (req, res, next) {
  if (!req.user) {
    return next(UNAUTHORIZED);
  }

  const { appointment } = req.body;
  const { appointmentId } = req.params;

  try {
    const secretaryFound = await db
      .select()
      .from(user)
      .where(eq(user.id, req.user.id))
      .then((users) => users[0]);
    if (!secretaryFound || secretaryFound.role !== SECRETARY_ROLE) {
      return next(UNAUTHORIZED);
    }

    const appointmentFound = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, appointmentId))
      .then((results) => results[0]);
    if (!appointmentFound) {
      return next(NOT_FOUND);
    }

    const appointmentUpdated = await db
      .update(appointments)
      .set({
        status: appointment.status,
      })
      .where(eq(appointments.id, appointmentId))
      .returning()
      .then((results) => results[0]);

    res.send(appointmentUpdated);
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

router.delete("/:appointmentId", async function (req, res, next) {
  if (!req.user) {
    return next(UNAUTHORIZED);
  }

  const { appointmentId } = req.params;

  try {
    const secretaryFound = await db
      .select()
      .from(user)
      .where(eq(user.id, req.user.id))
      .then((users) => users[0]);
    if (!secretaryFound || secretaryFound.role !== SECRETARY_ROLE) {
      return next(UNAUTHORIZED);
    }

    const appointmentFound = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, appointmentId))
      .then((results) => results[0]);
    if (!appointmentFound) {
      return next(NOT_FOUND);
    }

    const appointmentDeleted = await db
      .delete(appointments)
      .where(eq(appointments.id, appointmentId))
      .returning()
      .then((results) => results[0]);

    res.send(appointmentDeleted);
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

export default router;
