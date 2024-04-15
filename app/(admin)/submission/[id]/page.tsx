import SubmissionCard from '@/components/cards/SubmissionCard'
import { fetchRecipeById } from '@/lib/actions/recipe.actions'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipeById(params.id)

  console.log(recipe.isApproved)

  return (
    <div className='page-container'>
      <SubmissionCard
        id={recipe._id}
        name={recipe.name}
        submittedBy={recipe.submittedBy}
        images={recipe.images}
        date={recipe.createdAt}
        desciption={recipe.description}
        directions={recipe.directions}
        ingredients={recipe.ingredients}
        isApproved={recipe.isApproved}
      />
    </div>
  )
}

export default Page