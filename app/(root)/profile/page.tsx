import { ProfileProvider } from '@/app/context/ProfileContext';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await currentUser();
  if(!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name,
    image: userInfo?.image || user?.imageUrl,
    savedRecipes: userInfo?.savedRecipes,
    collections: userInfo?.collections,
  }

  return (
    <ProfileProvider>
      <div className='grid grid-cols-6 gap-3 place-content-center mx-16 my-10'>
        <div className='col-span-2'>
          <ProfileSidebar user={userData} />
        </div>
        <div className='h-800 col-span-4'>

        </div>
      </div>

    </ProfileProvider>
  )
}

export default page