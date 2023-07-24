import express, { Router, Request, Response } from "express";
import {
  registerUser,
  loginUser,
  test,
  getProfile,
} from "../controllers/authController";

const router: Router = express.Router();

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
