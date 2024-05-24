import { Router } from "express";
import authRouter from "./auth";
import appointmentsRouter from "./appointments";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/appointments", appointmentsRouter);

export default router;
