"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./rotues/authRoutes"));
const mongoose_1 = require("./database/mongoose");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// connect database
(0, mongoose_1.connectDB)();
// middleware
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
    credentials: true,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// Add router
app.use("/api/v1", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Express Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
