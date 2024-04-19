"use server"

import { revalidatePath } from "next/cache";
import Recipe from "../models/recipe.model";
import User from "../models/user.model";
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

export async function getAllUsers() {
  connectToDB();

  try {
    const users = await User.find()
      .select('id image isContributor name username')
      .exec();

    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch all users: ${error.message}`)
  }
}

export async function approveRecipe(recipeId: string, path: string) {
  connectToDB();

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { isApproved: true },
      { new: true }  
    )

    revalidatePath(path);
    revalidatePath('/admin-panel');

    if (!updatedRecipe) {
      throw new Error(`Recipe not found`)
    }

    return updatedRecipe;
  } catch (error: any) {
    throw new Error(`Failed to approve recipe: ${error.message}`)
  }
}