import express from 'express'
import { verifyRoute } from '../middlewares/auth.middleware.js';
import { getUsers, getMessage, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users",verifyRoute, getUsers)
router.get("/:id",verifyRoute, getMessage)
router.post("/send/:id",verifyRoute, sendMessage)

export default router;