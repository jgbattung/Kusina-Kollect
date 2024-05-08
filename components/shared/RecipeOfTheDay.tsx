import Recipe from '@/lib/models/recipe.model';
import React from 'react'

interface RecipeOfTheDayProps {
  recipe: typeof Recipe | null;
}

function RecipeOfTheDay({ recipe }: RecipeOfTheDayProps) {
  console.log(recipe)

  return (
    <section>
      <p>Recipe of the Day</p>
    </section>
  )
}

export default RecipeOfTheDay