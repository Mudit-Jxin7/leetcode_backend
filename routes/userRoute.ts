import express from "express";
import { userRegister, userLogin } from "../controllers/userController";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

export default router;
