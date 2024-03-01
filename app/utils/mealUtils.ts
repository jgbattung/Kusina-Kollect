import { MEAL_DESCRIPTIONS, MealName } from "../constants/mealTypes"

export const getMealDescription = (mealName: string | undefined): string | undefined => {
  return MEAL_DESCRIPTIONS[mealName as MealName];
}