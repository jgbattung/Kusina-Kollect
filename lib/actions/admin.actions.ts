"use server"

import Recipe from "../models/recipe.model";
import { connectToDB } from "../mongoose"

export async function getAllRecipes() {
  connectToDB();

  try {
    const alllRecipes = await Recipe.find()
      .populate({
        path: 'submittedBy',
        model: User,
        select: 'name username image'
      }).exec()

    return alllRecipes;
  } catch (error: any) {
    throw new Error(`Failed to fetch recipes: ${error.message}`)
  }
}