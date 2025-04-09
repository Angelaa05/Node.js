import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  cookingTime: {
    type: Number,
    min: 1, //minutes
    max: 60, //minutes
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  isVegetarian: {
    type: Boolean,
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "dessert"],
  },
});

const Recipe = model("Recipe", recipeSchema, "recipes");

export default Recipe;
