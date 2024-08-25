import SubmissionCard from '@/components/cards/SubmissionCard'
import { fetchRecipeById } from '@/lib/actions/recipe.actions'
import Link from 'next/link'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipeById(params.id)

  return (
    <div className='page-container mx-20 my-10'>
      <div className='w-full flex text-left'>
        <Link href="/manage/recipes" className='ml-24 flex gap-2 items-center justify-center'>
          <svg className='hover:fill-blue-900' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="blue"/>
          </svg>
          <p className='text-blue-700 hover:text-blue-900'>Back to recipes</p>
        </Link>
      </div>
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