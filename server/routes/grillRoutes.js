import express from "express";
import { createGrill, getAllGrill } from "../controllers/grillController.js";

const router = express.Router();

router.post("/", createGrill);
router.get("/", getAllGrill);

export default router;
