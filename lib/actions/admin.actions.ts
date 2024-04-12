"use server"

import Recipe from "../models/recipe.model";
import { connectToDB } from "../mongoose"

export async function getAllRecipes() {
  connectToDB();

  try {
    return await Recipe.find()
  } catch (error: any) {
    throw new Error(`Failed to fetch recipes: ${error.message}`)
  }
}