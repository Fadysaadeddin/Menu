import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mealRoutes from "./routes/mealRoutes.js";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import grillRoutes from './routes/grillRoutes.js';
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/meals", mealRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use('/api/grills', grillRoutes);

export default app;
