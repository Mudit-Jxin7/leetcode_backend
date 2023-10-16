import express from "express";
import {
  userRegister,
  userLogin,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/me").post(getUser);

export default router;
