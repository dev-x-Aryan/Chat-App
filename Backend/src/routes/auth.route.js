import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;