import express from "express";
const router = express.Router();
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  quizResult,
} from "../controllers/quizControllers.js";
import { verifyToken } from "../utils/tokenManager.js";

router.get("/", getAllQuizzes);
router.post("/create", verifyToken, createQuiz);
router.get("/:id", getQuizById);
router.post("/result", quizResult);
router.delete("/:id");

export default router;
