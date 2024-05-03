"use client"

import { approveRecipe } from '@/lib/actions/admin.actions';
import { Button } from '../ui/button'

interface Props {
  recipeId: string
  path: string
  isApproved: boolean;
}

const ApproveRecipe = ({ recipeId, path, isApproved }: Props) => {
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
        className={`${isApproved ? 'bg-red-700 hover:bg-red-900' : 'bg-complementary-500 hover:bg-complementary-800'} rounded-full text-light-200 font-bold transition-all`}
      >
        {isApproved ? 'Remove Approval' : 'Approved Recipe'}
      </Button>
    </div>
  )
}

export default ApproveRecipe