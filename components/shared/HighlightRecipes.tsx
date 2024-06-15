import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export interface Recipe {
  _id: string;
  name: string;
  images: string[];
  description: string;
}

interface RecipeProps {
  recipes: Recipe[]
}

function HighlightRecipes({ recipes }: RecipeProps) {
  return (
    <div className='w-full flex flex-col items-center px-8 py-8 max-xl:px-0 bg-supplementary-200'>
      <p className='font-bold text-2xl pb-5'>Hot & Trending</p>
      <div className='flex flex-col max-xl:grid max-xl:grid-cols-2 max-xl:grid-rows-2 max-sm:grid-cols-1 max-sm:items-center max-sm:justify-center items-center gap-7 px-8'>
        {recipes.map((recipe) => (
          <Link 
            key={recipe._id}
            href={`/recipe/${recipe._id}`}
            className='group'
          >
            <div className='flex text-left items-center gap-4'>
              {recipe.images.length > 0 ? (
                <Image 
                  src={recipe.images[0]}
                  alt={recipe.name}
                  width={144}
                  height={96}
                  className='object-cover min-w-36 max-w-36 min-h-24 max-h-24'
                />
              ) : (
                <Image 
                  src="/assets/recipe-image.png"
                  alt={`placeholder image for ${recipe.name}`}
                  width={144}
                  height={96}
                  className='object-cover min-w-36 max-w-36 min-h-24 max-h-24'
                />
              )}
              <div className='flex flex-col text-left gap-2 xl:max-w-72'>
                <p className='font-semibold group-hover:underline-offset-2 group-hover:underline underline-custom'>{recipe.name}</p>
                <p className='max-xl:hidden truncate'>{recipe.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HighlightRecipes