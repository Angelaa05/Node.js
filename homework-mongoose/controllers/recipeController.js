import Recipe from "../models/Recipe.js";

export default class RecipeController {
  async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async getRecipeById(req, res) {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(recipe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async createRecipe(req, res) {
    try {
      const newRecipe = new Recipe(req.body);
      const newrecipe = await newRecipe.save();
      res.status(200).json(newrecipe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async updateRecipe(req, res) {
    try {
      const updateRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateRecipe)
        return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(updateRecipe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async deleteRecipe(req, res) {
    try {
      const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deleteRecipe)
        return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(deleteRecipe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  //Simple filtering
  async getRecipesByCategory(req, res) {
    try {
      const recipes = await Recipe.find({ category: req.params.category });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async getVegetarianRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ isVegetarian: true });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
