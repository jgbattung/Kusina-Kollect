"use client"

import { addToSavedRecipes } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";
import { useLoadingStore } from "@/lib/store";

interface Props {
  userId: string;
  recipeId: string;
  path: string;
}

const AddToSaved = ({ userId, recipeId, path }: Props) => {
  const {isLoading, setIsLoading} = useLoadingStore();

  const handleSaveRecipe =async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addToSavedRecipes(userId, recipeId, path);
      console.log('RECIPE SAVED');
      setIsLoading(false);
    } catch (error: any) {
      throw new Error("Failed to save recipe:", error)
    }
  }

  return (
    <div>
      <Button 
        onClick={handleSaveRecipe}
        className="bg-secondary-500 text-white font-semibold rounded-xl hover:bg-primary-500 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? 'Saving Recipe' : 'Save Recipe'}
      </Button>
    </div>
  )
}

export default AddToSaved