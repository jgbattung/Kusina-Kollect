"use server"

import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface SaveRecipeParams {
  name: string;
  description: string;
  ingredients: string[];
  directions: string[];
  images: string[];
  tags: string[];
  prepTime: {
    value: number;
    unit: string;
  };
  cookTime: {
    value: number;
    unit: string;
  };
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

export async function fetchNewRecipes() {
  connectToDB();

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const newRecipes = await Recipe.find({ 
      isApproved: true,
      createdAt: { $gte: oneMonthAgo }
    })
    .sort({ createdAt: 'desc'})
    .limit(6)
    .select(' _id name images ')
    .exec();

    return newRecipes;

  } catch (error: any) {
    throw new Error(`Failed to fetch new recipes: ${error.message}`)
  }
}

export async function fetchRecipeById(id: string) {
  connectToDB();

  try {
    const recipe = Recipe.findById(id)
      .populate({
        path: 'submittedBy',
        model: User,
        select: '_id id image name username'
      }).exec()

    return recipe;
  } catch (error: any) {
    throw new Error(`Failed to fetch recipe: ${error.message}`)
  } 
}