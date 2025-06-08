import express from "express";
import { createPizza, getAllPizzas } from "../controllers/pizzaController.js";

const router = express.Router();

router.post("/", createPizza);
router.get("/", getAllPizzas);

export default router;
