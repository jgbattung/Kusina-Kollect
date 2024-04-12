import { fetchNewRecipes } from "@/lib/actions/recipe.actions"
import Link from "next/link";
import RecipeCard from "../cards/RecipeCard";

async function NewRecipes() {
  const newRecipes = await fetchNewRecipes();

  return (
    <section className="page-container flex flex-col gap-8">
      <p className="heading-large">{`What's New?`}</p>
      <div className="grid grid-cols-3 gap-20 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
        {newRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard 
              id={recipe._id}
              name={recipe.name}
              images={recipe.images}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewRecipes