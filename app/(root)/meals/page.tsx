"use client"

import SectionHeader from "@/components/shared/SectionHeader"
import SectionLinks from "@/components/shared/SectionLinks"
import { mealLinks } from "@/app/constants/mealTypes"
import { useEffect, useState } from "react";
import { getFeaturedRecipe, getRecipeOfTheDay } from "@/lib/actions/recipe.actions";
import FeatureRecipeCard from "@/components/cards/FeatureRecipeCard";
import { RecipeOfTheDayProps } from "@/lib/utils";

const Page = () => {
  const [recipe, setRecipe] = useState<RecipeOfTheDayProps>();
  const pageLinks = mealLinks.map((meal) => (meal.name).toLowerCase());

  useEffect(() => {
    const fetchFeatureRecipe = async () => {
      try {
        const recipe = await getFeaturedRecipe(pageLinks);
        setRecipe(recipe);
        console.log('ROD: ', recipe)
      } catch (error) {
        throw new Error(`Cannot fetch featured recipe: ${error}`);
      }
    }

    fetchFeatureRecipe();
  }, [])

  return (
    <div>
      <SectionHeader 
        title="Meals"
        description="Explore the Heart of Filipino Cuisine: From Sunrise Breakfasts to Sweet Dessert Nights."
        displayImage="/assets/meals/main.png"
      />
      <SectionLinks 
        links={mealLinks}
      />
      {recipe && (
        <div className="my-14 py-10 w-full bg-supplementary-200 flex flex-col gap-8">
          <div className="center">
            <p className="font-bold text-2xl">Check this out!</p>
            <p>{`Can't pick a recipe? Try our suggested recipe below!`}</p>
          </div>
          <FeatureRecipeCard 
            id={recipe._id}
            name={recipe.name}
            images={recipe.images}
            description={recipe.description}
            submittedBy={recipe.submittedBy.name || recipe.submittedBy.username}
            userImage={recipe.submittedBy.image}  
          />
        </div>
      )}
    </div>
  )
}

export default Page