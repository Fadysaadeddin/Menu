import mongoose from 'mongoose';
const mealSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  price: Number,
  imageUrl: String,
});

export default mongoose.model('Meal', mealSchema);
