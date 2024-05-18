import { fetchNewRecipes } from "@/lib/actions/recipe.actions"
import RecipeCard from "../cards/RecipeCard";

async function NewRecipes() {
  const newRecipes = await fetchNewRecipes();

  return (
    <section className="w-full page-container bg-supplementary-200 flex flex-col gap-8">
      <p className="heading-large">{`What's New?`}</p>
      <div className="grid grid-cols-3 gap-16 max-xl:grid-cols-2 max-xl:gap-10 max-lg:gap-7 max-md:grid-cols-1">
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