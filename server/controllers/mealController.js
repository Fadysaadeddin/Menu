import Meal from '../models/Meal.js';

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMeal = async (req, res) => {
  const meal = new Meal(req.body);
  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getMeals, createMeal };
