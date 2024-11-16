import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./util/db";
import userRouter from "./router/user";
import taskRouter from "./router/task";
import cors from "cors";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);


export default app;
