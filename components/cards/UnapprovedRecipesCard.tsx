"use client"

import { ActionStatus } from '@/app/constants/actionModal';
import { approveRecipe } from '@/lib/actions/admin.actions';
import { useActionModalStore, useLoadingStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

interface Recipe {
  _id: string;
  name: string;
  isApproved: boolean;
  createdAt: Date;
}

interface Props {
  recipes: Recipe[];
  path: string;
}


const UnapprovedRecipesCard = ({ recipes, path }: Props) => {
  const {isLoading, setIsLoading} = useLoadingStore();
  const { openModal } = useActionModalStore();

  const handleClick = async (e: React.MouseEvent, recipeId: string, isApproved: boolean) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await approveRecipe(recipeId, path, isApproved);
      openModal(ActionStatus.SUCCESS, 'Recipe has been approved');
    } catch (error: any) {
      openModal(ActionStatus.FAIL, 'Failed to approve recipe. Please try again.');
      throw new Error("Error approving recipe:", error)
    }
  }

  return (
    <div className='w-full h-fit bg-white shadow-lg'>
      <div className='px-6 py-4'>
        <p className='font-semibold'>Quick Approve Recipes</p>
      </div>
      <div className='w-full border border-b border-gray-200' />
      <div className='flex flex-col px-6 py-4 gap-5'>
        {recipes.map((recipe) => (
          <div key={recipe._id} className='pb-4 border-b-2 border-b-gray-200 last:border-none flex items-center justify-between'>
            <div className='flex flex-col text-left items-start text-sm'>
              <Link href={`/submission/${recipe._id}`} className='hover:underline hover:underline-offset-2 hover:text-primary-800'>
                <p>{recipe.name}</p>
              </Link>
              <p className='font-light text-xs'>submitted {formatDate(recipe.createdAt)}</p>
            </div>
            <div>
              <button 
                onClick={(e) => handleClick(e, recipe._id, recipe.isApproved)} 
                className='px-4 py-3 bg-complementary-500 rounded-xl hover:bg-complementary-800 transition-colors'
                disabled={isLoading}
              >  
                <p className='text-white text-xs'>Approve</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UnapprovedRecipesCard