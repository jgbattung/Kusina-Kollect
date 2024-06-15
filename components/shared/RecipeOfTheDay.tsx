import Recipe from '@/lib/models/recipe.model';
import React from 'react'
import FeatureRecipeCard from '../cards/FeatureRecipeCard';

interface RecipeOfTheDayProps {
  recipe: {
    _id: string;
    name: string;
    images: string[];
    submittedBy: {
      _id: string;
      image: string;
      name: string;
      username: string;
    };
    description: string
  }
}

function RecipeOfTheDay({ recipe }: RecipeOfTheDayProps) {

  return (
    <section className='w-full flex items-start gap-7 px-5 max-sm:py-7'>
      {recipe && (
          <FeatureRecipeCard 
            id={recipe._id}
            name={recipe.name}
            images={recipe.images}
            description={recipe.description}
            submittedBy={recipe.submittedBy.name || recipe.submittedBy.username}
            userImage={recipe.submittedBy.image}
          />
      )}
    </section>
  )
}

export default RecipeOfTheDay