"use server"

import { Recipe as RecipeType } from "@/components/shared/HighlightRecipes";
import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import NodeCache from 'node-cache'

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

export async function getRecipesByMealType(mealType: string) {
  connectToDB();

  try {
    const recipes = await Recipe.find({ 
      tags: { $in: [mealType] },
      isApproved: true 
    })
      .sort({ createdAt: 'desc' })
      .select(' _id name images ')

    return recipes;
  } catch (error: any) {
    throw new Error(`Failed to get recipes: ${error}`)
  }
}

export async function getRecipesByCuisine(cuisine: string) {
  connectToDB();

  try {
    const recipes = await Recipe.find({
      tags: { $in: [cuisine] },
      isApproved: true 
    })
      .sort({ createdAt: 'desc' })
      .select(' _id name images ')

    return recipes;
  } catch (error: any) {
    throw new Error(`Unable to get recipes: ${error}`);
  }
}

export async function getRecipesByIngredients(ingredient: string) {
  connectToDB();

  try {
    const recipes = await Recipe.find({
      ingredients: { $regex: new RegExp(ingredient, 'i') },
      tags: { $in: ingredient },
      isApproved: true 
    })
      .sort({ createdAt: 'desc' })
      .select(' _id name images ')

    return recipes;
  } catch (error: any) {
    throw new Error(`Failed to get recipes: ${error.message}`)
  }
}

const recipeOfTheDayCache = new NodeCache({ stdTTL: 60 * 60 * 24 })

export async function getRecipeOfTheDay() {

  const cachedRecipe = recipeOfTheDayCache.get('recipeOfTheDay');
  if (cachedRecipe) {
    return cachedRecipe
  };

  connectToDB();

  try {
    const recipe = await Recipe.aggregate([
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'submittedBy',
          foreignField: '_id',
          as: 'submittedBy',
        },
      },
      {
        $unwind: '$submittedBy'
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          description: 1,
          submittedBy: {
            _id: 1,
            image: 1,
            name: 1,
            username: 1,
          },
        },
      },
    ]);

    if (recipe.length === 0) {
      throw new Error('No recipes found')
    }

    recipeOfTheDayCache.set('recipeOfTheDay', recipe[0], 60 * 60 * 24);

    return recipe[0];
  } catch (error:any) {
    throw new Error(`Failed to get recipe of the day: ${error.message}`)
  }
}

export async function getFeaturedRecipe(tags: string[]) {
  connectToDB();
  
  try {
    const recipe = await Recipe.aggregate([
      {
        $match: {
          tags: { $in: tags },
        },
      },
      {
        $sample: { size: 1 },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'submittedBy',
          foreignField: '_id',
          as: 'submittedBy',
        },
      },
      {
        $unwind: '$submittedBy'
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          description: 1,
          submittedBy: {
            name: 1,
            username: 1,
            image: 1,
          },
          tags: 1,
        },
      },
    ]).exec();

    return recipe[0];
  } catch (error: any) {
    throw new Error(`Failed to get featured recipe: ${error.message}`)
  }
}

export async function getRecipesBySearch(searchString: string) {
  connectToDB();

  try {
    const recipes = Recipe.find({
      $or: [
        { name: { $regex: searchString, $options: 'i' } },
        { ingredients: { $regex: searchString, $options: 'i' } },
        { tags: { $regex: searchString, $options: 'i' } },
      ],
    })
      .select(' _id name images ')
      .exec();

    return recipes;  
  } catch (error: any) {
    throw new Error(`Failed to get search results: ${error.message}`);
  }
}

const trendingRecipesCache = new NodeCache({ stdTTL: 60 * 60 * 24 })

export async function getTrendingRecipes(): Promise<RecipeType[]> {

  const cachedRecipes = trendingRecipesCache.get<RecipeType[]>('trendingRecipes');
  if (cachedRecipes) {
    return cachedRecipes
  };

  connectToDB();

  try {
    const recipes: RecipeType[] = await Recipe.aggregate([
      { $sample: { size: 3 } },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'submittedBy',
          foreignField: '_id',
          as: 'submittedBy',
        },
      },
      {
        $unwind: '$submittedBy'
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          description: 1,
        },
      },
    ]);

    if (recipes.length === 0) {
      throw new Error('No recipes found');
    }

    trendingRecipesCache.set('trendingRecipes', recipes, 60 * 60 * 24);

    return recipes;
  } catch (error: any) {
    throw new Error(`Failed to get trending recipes: ${error.message}`)
  }
}