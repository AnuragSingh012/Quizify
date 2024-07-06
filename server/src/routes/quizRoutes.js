import express from "express";
const router = express.Router();
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  quizResult,
  deleteQuizById,
} from "../controllers/quizControllers.js";
import { verifyToken } from "../utils/tokenManager.js";

router.get("/", getAllQuizzes);
router.post("/create", verifyToken, createQuiz);
router.get("/:id", getQuizById);
router.post("/result", quizResult);
router.delete("/:id", verifyToken, deleteQuizById);

export default router;
