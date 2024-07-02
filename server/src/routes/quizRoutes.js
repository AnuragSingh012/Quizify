import express from "express";
const router = express.Router();
import {} from "../controllers/quizControllers.js";
import { verifyToken } from "../utils/tokenManager.js";

router.get("/create", verifyToken);

export default router;
