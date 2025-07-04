import express from "express";
import { createItem, getAllItems } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/", (req, res) => {
  const { category } = req.query;
  getAllItems(req, res, category);
});

export default router;
