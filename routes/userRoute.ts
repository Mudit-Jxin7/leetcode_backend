import express from "express";
import {
  userRegister,
  userLogin,
  getUser,
} from "../controllers/userController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/me").get(authenticateJwt, getUser);

export default router;
