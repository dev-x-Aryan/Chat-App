import express from "express";
import { checkAuth, getProfile, login, logout, signup } from "../controllers/auth.controller.js";
import { verifyRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.put("/profile", verifyRoute, getProfile)
router.get("/profile", verifyRoute, getProfile)
router.get("/check", verifyRoute, checkAuth)

export default router;