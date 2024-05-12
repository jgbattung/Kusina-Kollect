"use client"

import SectionHeader from "@/components/shared/SectionHeader";
import SectionLinks from "@/components/shared/SectionLinks";
import { cuisineLinks } from "@/app/constants/cuisineTypes";
import { getCuisineDescription } from "@/app/utils/cuisineUtils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipesByCuisine } from "@/lib/actions/recipe.actions";
import RecipeCard from "@/components/cards/RecipeCard";

interface Recipe {
  _id: string;
  name: string;
  images: string[];
}

const Page = () => {
  const pathname = usePathname();
  const currentCuisine = cuisineLinks.find(cuisine => cuisine.path.includes(pathname as string));
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (currentCuisine) {
        try {
          const mealRecipes = await getRecipesByCuisine((currentCuisine.name).toLowerCase());
          setRecipes(mealRecipes);
        } catch (error) {
          throw new Error(`Failed to fetch recipes: ${error}`)
        }
      }
    }

    fetchRecipes();
  }, [currentCuisine])

  const description = getCuisineDescription(currentCuisine?.name);

  return (
    <div>
      {currentCuisine ? (
        <div className="page-container flex flex-col gap-8">
          <SectionHeader 
            title={currentCuisine.name}
            description={description}
            displayImage={currentCuisine.image}
          />
          <div className="grid grid-cols-3 gap-12 max-2xl:gap-8 max-xl:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
            {recipes.map((recipe: Recipe) => (
              <RecipeCard 
                key={recipe._id}
                id={recipe._id}
                name={recipe.name}
                images={recipe.images}
                category={currentCuisine.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <SectionHeader 
            title="Oops! This Culinary Journey Hit a Detour..."
            description="It seems the cuisine you're looking for has eluded our culinary map. But don't let your appetite for discovery end here."
            displayImage="/assets/not-found.png"
          />
          <div className="pt-12 max-md:pt-6 max-sm:pt-2">
            <SectionLinks 
              linksDesc="Dive into the rich tapestry of flavors and traditions with our curated selection of cuisines:"
              links={cuisineLinks}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Page