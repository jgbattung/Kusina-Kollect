"use client"

import { approveRecipe } from '@/lib/actions/admin.actions';
import { Button } from '../ui/button'
import { revalidatePath } from 'next/cache';

interface Props {
  recipeId: string
  path: string
}

const ApproveRecipe = ({ recipeId, path }: Props) => {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      await approveRecipe(recipeId, path)
    } catch (error: any) {
      throw new Error("Error approving recipe:", error)
    }

  }

  return (
    <div>
      <Button
        onClick={handleClick}
        className='bg-complementary-500 rounded-full text-light-200 font-bold hover:bg-complementary-800 transition-all'
      >
        Approve Recipe
      </Button>
    </div>
  )
}

export default ApproveRecipe