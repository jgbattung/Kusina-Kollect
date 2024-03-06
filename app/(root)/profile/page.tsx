import ProfileSidebar from '@/components/shared/ProfileSidebar'
import ProfileWindow from '@/components/shared/ProfileWindow';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  
  const userData = {
    id: user?.id,
    objectId: userInfo._id,
    username: user?.username || userInfo?.username,
    image: user?.imageUrl || userInfo?.image,
    name: userInfo?.name,
    savedRecipes: userInfo?.savedRecipes,
    collections: userInfo?.collections,
  }

  return (
    <div className='grid grid-cols-6 gap-3 place-content-center mx-16 my-10'>
      <div className='col-span-2'>
        <ProfileSidebar 
          user={userData}
        />
      </div>
      <section className='h-800 col-span-4'>
        <ProfileWindow />
      </section>
    </div>
  )
}

export default page