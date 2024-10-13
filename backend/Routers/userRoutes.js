import express from "express";
import {
  loginControllers,
  registerControllers,
  resetPasswordControllers,
  passwordConfirmControllers

} from "../controllers/userController.js";


import { otpController } from "../controllers/otpController.js";

import { changePasswordController } from "../controllers/changePasswordController.js";


const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/otp").post(otpController);

router.route("/").post(loginControllers);

router.route("/changePassword").patch(changePasswordController);

router.route("/confirmPassword").patch(passwordConfirmControllers);

export default router;
