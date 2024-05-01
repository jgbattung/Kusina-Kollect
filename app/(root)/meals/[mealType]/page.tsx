"use client"

import SectionHeader from "@/components/shared/SectionHeader";
import SectionLinks from "@/components/shared/SectionLinks";
import { mealLinks } from "@/app/constants/mealTypes";
import { getMealDescription } from "@/app/utils/mealUtils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipesByMealType } from "@/lib/actions/recipe.actions";
import RecipeCard from "@/components/cards/RecipeCard";

interface Recipe {
  _id: string;
  name: string;
  images: string[];
}

const Page = () => {
  const pathname = usePathname();
  const currentMealType = mealLinks.find(meal => meal.path.includes(pathname as string));
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  console.log(currentMealType?.name)

  useEffect(() => {
    const fetchRecipes = async () => {
      if (currentMealType) {
        try {
          const mealRecipes = await getRecipesByMealType((currentMealType.name).toLowerCase());
          setRecipes(mealRecipes);
        } catch (error) {
          throw new Error(`Failed to fetch recipes: ${error}`)
        }
      }
    };

    fetchRecipes();
  }, [currentMealType])

  console.log(recipes);


  const description = getMealDescription(currentMealType?.name)

  return (
    <div>
      {currentMealType ? (
        <div className="page-container flex flex-col gap-8">
          <SectionHeader 
            title={currentMealType.name}
            description={description}
            displayImage={currentMealType.image}
          />
          <div className="grid grid-cols-3 gap-20 mt-10 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
            {recipes.map((recipe: Recipe) => (
              <div key={recipe._id}>
                <RecipeCard 
                  id={recipe._id}
                  name={recipe.name}
                  images={recipe.images}
                  category={currentMealType.name}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <SectionHeader 
            title="Oops! The Feast has yet to begin..."
            description="We couldn't find the meal type you're searching for, but the culinary journey doesn't have to end here"
            displayImage="/assets/not-found.png"
          />
          <div className="pt-12 max-md:pt-6 max-sm:pt-2">
            <SectionLinks 
              linksDesc="Explore our diverse collection of meals and discover new favorites that await to delight your taste buds:"
              links={mealLinks}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Page