import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

export default app;
