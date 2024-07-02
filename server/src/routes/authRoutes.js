import express from "express";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
} from "../controllers/authControllers.js";
import { verifyToken } from "../utils/tokenManager.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", validate(signupValidator), userSignup);
router.post("/login", validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);

export default router;
