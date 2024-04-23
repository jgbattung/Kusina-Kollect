"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Recipe from "../models/recipe.model";

interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  image: string;
  path?: string | undefined;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  path
}: UpdateUserParams): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        image,
        onboarded: true,
      },
      { upsert: true }
    )
    if(path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
};

export async function doesUserExist(userId: string) {
  connectToDB();

  try {
    const user = await User.findOne({ id: userId });
    return !!user;
  } catch (error: any) {
    throw new Error(`Failed to check user's existence: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  connectToDB();

  try {
    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

export async function getUserRecipes(userId: string) {
  connectToDB();

  try {
    const userRecipes = await Recipe.find({ submittedBy: userId }).exec()

    return userRecipes;
    
  } catch (error: any) {
    throw new Error(`Failed to fetch user recipes: ${error.message}`)
  }
};

export async function addToSavedRecipes(userId:string, recipeId: string, path: string) {
  connectToDB();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedRecipes: recipeId } },
      { new: true },
    )

    revalidatePath(path);
    return updatedUser;
  } catch (error: any) {
    throw new Error(`Failed to add to favorites: ${error.message}`)
  }
}