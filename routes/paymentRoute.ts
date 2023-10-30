import express from "express";
import {
  makePayment,
  getAllPaidCourses,
} from "../controllers/paymentController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/pay/:courseId").post(authenticateJwt, makePayment);
router.route("/getpaidcourses").get(authenticateJwt, getAllPaidCourses);

export default router;
