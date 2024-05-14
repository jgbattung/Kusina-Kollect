"use client"

import SectionHeader from "@/components/shared/SectionHeader"
import SectionLinks from "@/components/shared/SectionLinks"
import { cuisineLinks } from "@/app/constants/cuisineTypes"
import { useEffect, useState } from "react"
import { RecipeOfTheDayProps } from "@/lib/utils"
import { getFeaturedRecipe } from "@/lib/actions/recipe.actions"
import FeatureRecipeCard from "@/components/cards/FeatureRecipeCard"

const Page = () => {
  const [recipe, setRecipe] = useState<RecipeOfTheDayProps>();
  const pageLinks = cuisineLinks.map((meal) => (meal.name).toLowerCase());

  useEffect(() => {
    const fetchFeatureRecipe = async () => {
      try {
        const recipe = await getFeaturedRecipe(pageLinks);

        const matchingCetegory = pageLinks.find((category) => recipe.tags.includes(category));

        setRecipe({
          ...recipe,
          category: matchingCetegory,
        });
      } catch (error) {
        throw new Error(`Cannot fetch featured recipe: ${error}`);
      }
    }

    fetchFeatureRecipe();
  }, [])

  return (
    <div>
      <SectionHeader 
        title="Cuisines"
        description="Dive into the Regional Tastes of the Philippines: A Culinary Journey from Luzon, Visayas, and Mindanao."
        displayImage="/assets/cuisines/main.png"
      />
      <SectionLinks 
        links={cuisineLinks}
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
            category={recipe.category} 
          />
        </div>
      )}
    </div>
  )
}

export default Page;