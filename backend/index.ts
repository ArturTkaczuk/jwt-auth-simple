import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import router from "./rotues/authRoutes";
import { connectDB } from "./database/mongoose";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT;

// connect database
connectDB();

// middleware
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Add router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
