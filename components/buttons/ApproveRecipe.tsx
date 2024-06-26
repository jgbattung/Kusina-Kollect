"use client"

import { approveRecipe } from '@/lib/actions/admin.actions';
import { Button } from '../ui/button'
import { useActionModalStore, useLoadingStore } from '@/lib/store';
import { ActionStatus } from '@/app/constants/actionModal';

interface Props {
  recipeId: string
  path: string
  isApproved: boolean;
}

const ApproveRecipe = ({ recipeId, path, isApproved }: Props) => {
  const {isLoading, setIsLoading} = useLoadingStore();
  const { openModal } = useActionModalStore();
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true);
      await approveRecipe(recipeId, path, isApproved);
      if (isApproved) {
        openModal(ActionStatus.MESSAGE, 'Recipe has been removed.');
      } else {
        openModal(ActionStatus.SUCCESS, 'Recipe has been approved.');
      }
      setIsLoading(false);
    } catch (error: any) {
      openModal(ActionStatus.FAIL, 'Failed to approve recipe. Please try again.');
      throw new Error("Error approving recipe:", error)
    }

  }

  return (
    <div>
      <Button
        onClick={handleClick}
        className={`${isApproved ? 'bg-red-700 hover:bg-red-900' : 'bg-complementary-500 hover:bg-complementary-800'} rounded-full text-light-200 font-bold transition-all`}
        disabled={isLoading}
      >
        {isLoading
          ? isApproved
            ? 'Removing Approval...'
            : 'Approving Recipe...'
          : isApproved
            ? 'Remove Approval'
            : 'Approve Recipe'
        }
      </Button>
    </div>
  )
}

export default ApproveRecipe;