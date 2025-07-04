import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const { categoryId, name, description, price, imageUrl } = req.body;
    if (!categoryId || !name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const item = new Item({ categoryId, name, description, price, imageUrl });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId } : {};
    const items = await Item.find(filter).populate("categoryId", "name");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
