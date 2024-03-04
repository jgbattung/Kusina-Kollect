export const mealLinks: { name: string; path: string, image: string, }[] = [
  { name: "Breakfast & Brunch", path: '/meals/breakfast-and-brunch', image: '/assets/meals/breakfast.png' },
  { name: "Lunch", path: '/meals/lunch', image: '/assets/meals/lunch.png' },
  { name: "Dinner", path: '/meals/dinner', image: '/assets/meals/dinner.png' },
  { name: "Vegetable", path: '/meals/vegetable', image: '/assets/meals/vegetables.png' },
  { name: "Drinks", path: '/meals/drinks', image: '/assets/meals/drinks.png' },
  { name: "Dessert", path: '/meals/dessert', image: '/assets/meals/dessert.png' },
]

export enum MealName {
  BREAKFASTBRUNCH = "Breakfast & Brunch",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  VEGETABLE = "Vegetable",
  DRINKS = "Drinks",
  DESSERT = "Dessert",
}

export const MEAL_DESCRIPTIONS: { [key in MealName]?: string } = {
  [MealName.BREAKFASTBRUNCH]: "Kickstart your day with Breakfast & Brunch: A collection of morning delights that energize and inspire.",
  [MealName.LUNCH]: "Midday meals reimagined with Lunch: Elevate your lunchtime with flavors that excite.",
  [MealName.DINNER]: "End your day on a high note with Dinner: Nighttime feasts that bring comfort and joy.",
  [MealName.VEGETABLE]: "Green, clean, and everything in between: Explore Vegetable recipes that refresh and rejuvenate.",
  [MealName.DRINKS]: "Quench your thirst with Drinks: Sips and concoctions that dazzle and delight.",
  [MealName.DESSERT]: "Indulge in the sweet life with Dessert: Desserts that dazzle, from the classic to the contemporary",
}