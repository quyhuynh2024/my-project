import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh-token").post(refreshToken);
router.route("/logout").delete(logout);

export default router;
