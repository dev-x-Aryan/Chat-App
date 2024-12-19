import express from "express";
import { checkAuth, login, logout, signup, update } from "../controllers/auth.controller.js";
import { verifyRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.put("/update", verifyRoute, update)
router.get("/check", verifyRoute, checkAuth)

export default router;