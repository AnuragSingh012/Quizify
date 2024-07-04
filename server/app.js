import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import cors from "cors";
config();
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
//middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://quizify-client.vercel.app",
    credentials: true,
  })
);

//remove it in production
app.use(morgan("dev"));

app.use("/user", authRoutes);
app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("App working");
});

export default app;
