import express, { Router, Request, Response } from "express";
import { test } from "../controllers/authController";

const router: Router = express.Router();

router.get("/", test);

export default router;
