import SubmissionCard from '@/components/cards/SubmissionCard'
import { fetchRecipeById } from '@/lib/actions/recipe.actions'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipeById(params.id)

  console.log(recipe.isApproved)

  return (
    <div className='page-container mx-20 my-10'>
      <div>
        <p className='font-bold text-2xl'>Recipe Information</p>
      </div>
      <SubmissionCard
        id={recipe._id}
        name={recipe.name}
        submittedBy={recipe.submittedBy}
        images={recipe.images}
        date={recipe.createdAt}
        description={recipe.description}
        directions={recipe.directions}
        ingredients={recipe.ingredients}
        isApproved={recipe.isApproved}
      />
    </div>
  )
}

export default Page