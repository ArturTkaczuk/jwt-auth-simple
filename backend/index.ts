import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./rotues/authRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// CORS middleware
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));
app.use(express.json());

// Add router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
