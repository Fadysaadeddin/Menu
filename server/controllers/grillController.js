
import Grill from '../models/Grill.js';

export const createGrill = async (req, res) => {
  try {
    const grill = new Grill(req.body);
    const newGrill = await grill.save();
    res.status(201).json(newGrill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGrills = async (req, res) => {
  try {
    const grills = await Grill.find();
    res.json(grills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};