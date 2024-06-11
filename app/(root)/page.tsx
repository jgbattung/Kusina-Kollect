import HighlightRecipes from "@/components/shared/HighlightRecipes";
import NewRecipes from "@/components/shared/NewRecipes";
import RecipeOfTheDay from "@/components/shared/RecipeOfTheDay";
import SearchDiv from "@/components/shared/SearchDiv";
import { getRecipeOfTheDay, getTrendingRecipes } from "@/lib/actions/recipe.actions";
import { doesUserExist, updateUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user =  await currentUser();
  if (user) {
    const { id, username, imageUrl } = user;

    const userExists = await doesUserExist(id);
    if (!userExists) {
      try {  
        await updateUser({
          userId: id,
          username: username as string,
          name: "",
          image: imageUrl,
        });
        console.log('User added to DB')      
      } catch (error: any) {
        throw new Error(`Failed to save user: ${error.message}`)
      }
    }
  }

  const recipeOfTheDay = await getRecipeOfTheDay();
  const trendingRecipes = await getTrendingRecipes();

  return (
    <div className="page-container">
      <div className="flex max-xl:flex-col items-start justify-center mb-12">
        <RecipeOfTheDay recipe={recipeOfTheDay} />
        <HighlightRecipes recipes={trendingRecipes} />
      </div>
      <NewRecipes />
      <SearchDiv /> 
    </div>
  );
}
