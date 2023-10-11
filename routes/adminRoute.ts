import express from "express";
import {
  adminRegister,
  adminLogin,
  getAdmin,
} from "../controllers/adminController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);
router.route("/me").get(authenticateJwt, getAdmin);

export default router;
