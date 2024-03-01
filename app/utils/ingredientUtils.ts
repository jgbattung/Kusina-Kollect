import { INGREDIENT_DESCRIPTIONS, IngredientName } from "../constants/ingredientTypes"

export const getIngredientDescription = (ingredientName: string | undefined): string | undefined => {
  return INGREDIENT_DESCRIPTIONS[ingredientName as IngredientName];
}