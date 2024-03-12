import { ProfileProvider } from '@/app/context/ProfileContext';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileWindow from '@/components/profile/ProfileWindow';
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
      <div className='grid grid-cols-6 gap-3 place-content-center mx-16 my-10 2xl:mx-52 xl:mx-32 lg:mx-20 md:mx-8 max-sm:mx-1'>
        <div className='col-span-2 max-lg:hidden'>
          <ProfileSidebar user={userData} />
        </div>
        <div className='h-800 col-span-4 max-lg:col-span-6'>
          <ProfileWindow user={userData} />
        </div>
      </div>

    </ProfileProvider>
  )
}

export default page