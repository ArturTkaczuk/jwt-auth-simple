"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get("/", authController_1.test);
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.loginUser);
router.get("/profile", authController_1.getProfile);
exports.default = router;
