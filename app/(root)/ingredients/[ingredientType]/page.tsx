"use client"

import SectionHeader from "@/components/shared/SectionHeader";
import SectionLinks from "@/components/shared/SectionLinks";
import { ingredientLinks } from "@/app/constants/ingredientTypes";
import { getIngredientDescription } from "@/app/utils/ingredientUtils";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { getRecipesByIngredients } from "@/lib/actions/recipe.actions";
import RecipeCard from "@/components/cards/RecipeCard";

interface Recipe {
  _id: string;
  name: string;
  images: string[];
}

const Page = () => {
  const pathname = usePathname();
  const currentIngredient = ingredientLinks.find(ingredient => ingredient.path.includes(pathname));
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (currentIngredient) {
        try {
          const mealRecipes= await getRecipesByIngredients((currentIngredient.name).toLowerCase());
          setRecipes(mealRecipes);
        } catch (error) {
          throw new Error(`Failed to fetch reipces: ${error}`)
        }
      }
    }

    fetchRecipes();
  }, [currentIngredient]);

  const description = getIngredientDescription(currentIngredient?.name);

  return (
    <div>
      {currentIngredient ? (
        <div className="page-container flex flex-col gap-8">
          <SectionHeader 
            title={currentIngredient.name}
            description={description}
            displayImage={currentIngredient.image}
          />
          <div className="grid grid-cols-3 gap-20 mt-10 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
            {recipes.map((recipe: Recipe) => (
              <RecipeCard 
                key={recipe._id}
                id={recipe._id}
                name={recipe.name}
                images={recipe.images}
                category={currentIngredient.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <SectionHeader 
            title="Oops! This Ingredient is Still a Mystery..."
            description="We couldn't find the ingredient you were looking for, but that doesn't mean your culinary adventure should end."
            displayImage="/assets/not-found.png"
          />
          <div className="pt-12 max-md:pt-6 max-sm:pt-2">
            <SectionLinks 
              linksDesc="Explore other key ingredients that make Filipino cuisine uniquely delightful:"
              links={ingredientLinks}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Page