import AddRecipe from '@/components/forms/AddRecipe'
import PageWrapper from '@/components/utils/PageWrapper';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

import React from 'react'

const page = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const userInfo = await fetchUser(user.id);
  
  const userData = {
    username: userInfo?.username || user?.username,
    objectId: userInfo?._id,
    isAdmin: userInfo?.isAdmin,
    isContributor: userInfo?.isContributor,
  }

  return (
    <PageWrapper>
      <div className='page-container'>
        <AddRecipe user={userData} />
      </div>
    </PageWrapper>
  )
}

export default page