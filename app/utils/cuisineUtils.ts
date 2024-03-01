import { CUISINE_DESCRIPTIONS, CuisineName } from "../constants/cuisineTypes"

export const getCuisineDescription = (cuisineName: string | undefined): string | undefined => {
  return CUISINE_DESCRIPTIONS[cuisineName as CuisineName];
}