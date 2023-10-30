import express from "express";
import { makePayment } from "../controllers/paymentController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/pay/:courseId").post(authenticateJwt, makePayment);

export default router;
