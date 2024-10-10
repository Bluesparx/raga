import express from "express";
import {
  loginControllers,
  registerControllers,
  resetPasswordControllers,
  passwordConfirmControllers
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/resetPassword").patch(resetPasswordControllers);

router.route("/confirmPassword").patch(passwordConfirmControllers);

export default router;
