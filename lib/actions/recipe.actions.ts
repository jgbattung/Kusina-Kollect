"use server"

import Recipe from "../models/recipe.model";
import { connectToDB } from "../mongoose";

interface SaveRecipeParams {
  name: string;
  description: string;
  ingredients: string[];
  directions: string[];
  images: string[];
  tags: string[];
  submittedBy: string;
  isApproved: boolean;
}

export async function saveRecipe(recipeData: SaveRecipeParams): Promise<void> {
  connectToDB();

  try {
    await Recipe.findOneAndUpdate(
      { name: recipeData.name },
      recipeData,
      { upsert: true }
    )
  } catch (error: any) {
    throw new Error(`Failed to save recipe: ${error.message}`)
  }
}