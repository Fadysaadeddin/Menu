import grill from "../models/grills.js"

export const createGrill = async (req, res) => {
  try {
    const Grill = new grill(req.body);
    const newGrill = await Grill.save();
    res.status(201).json(newGrill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGrill = async (req, res) => {
  try {
    const grills = await grill.find();
    res.json(grills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
