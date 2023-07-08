import express, { Router, Request, Response } from "express";
import { registerUser, test } from "../controllers/authController";

const router: Router = express.Router();

router.get("/", test);
router.post("/register", registerUser);

export default router;
