import express from "express";
import {
  makePayment,
  getAllPaidCourses,
  hasUserPurchase,
} from "../controllers/paymentController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/pay/:courseId").post(authenticateJwt, makePayment);
router.route("/getpaidcourses").get(authenticateJwt, getAllPaidCourses);
router.route("/haspurchased/:courseId").get(authenticateJwt, hasUserPurchase);

export default router;
