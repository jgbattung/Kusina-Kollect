export const ingredientLinks: { name: string, path: string, image: string }[] = [
  { name: "Chicken", path: "/ingredients/chicken", image: '/assets/ingredients/chicken.png' },
  { name: "Pork", path: "/ingredients/pork", image: '/assets/ingredients/pork.png' },
  { name: "Beef", path: "/ingredients/beef", image: '/assets/ingredients/beef.png' },
  { name: "Seafood", path: "/ingredients/seafood", image: '/assets/ingredients/fish.png' },
  { name: "Vegetable", path: "/ingredients/vegetable", image: '/assets/ingredients/vegetable.png' },
  { name: "Noodles & Pasta", path: "/ingredients/noodles-and-pasta", image: '/assets/ingredients/noodles.png' },
]

export enum IngredientName {
  CHICKEN = "Chicken",
  PORK = "Pork",
  BEEF = "Beef",
  SEAFOOD = "Seafood",
  VEGETABLE = "Vegetable",
  NOODLES_PASTA = "Noodles & Pasta",
}

export const INGREDIENT_DESCRIPTIONS: { [key in IngredientName]: string } = {
  [IngredientName.CHICKEN]: "From the comforting warmth of Tinola to the festive flavors of Chicken Adobo, discover how chicken is celebrated in Filipino kitchens.",
  [IngredientName.PORK]: "Pork takes center stage in many Filipino dishes, whether it's the succulent Lechon at parties or the tangy sinigang that soothes the soul.",
  [IngredientName.BEEF]: "Savor the richness of Filipino beef recipes, like the hearty Beef Caldereta and the beloved Beef Tapa, each dish telling its own story.",
  [IngredientName.SEAFOOD]: "Explore the bountiful seas of the Philippines with dishes like Kinilaw, where fresh seafood meets the perfect blend of tangy and spicy flavors.",
  [IngredientName.VEGETABLE]: "Delight in the vibrant variety of vegetables in Filipino cuisine, from the simplicity of fresh Lumpiang Ubod to the savory mix of Pinakbet.",
  [IngredientName.NOODLES_PASTA]: "Embark on a flavorful journey with Filipino noodle dishes, from the classic Pancit Canton to the unique and colorful Pancit Palabok.",
};


