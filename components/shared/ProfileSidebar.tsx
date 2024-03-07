"use client"

import { profileRoutes } from '@/app/constants'
import { ProfileContext } from '@/app/context/ProfileContext'
import Image from 'next/image'
import React, { useContext } from 'react'

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    image: string,
    name: string,
    savedRecipes: [],
    collections: [],
  }
}

function ProfileSidebar({ user }: Props) {
  const { selectedTab, setSelectedTab } = useContext(ProfileContext);

  return (
    <section className='bg-white pt-4 px-4 shadow-lg'>
      <div className='flex gap-4 items-center justify-left'>
        <div>
          <Image 
            src={user.image}
            alt='profile photo'
            width={80}
            height={80}
          />
        </div>
        <p className='font-bold text-md'>Hello, {user.username}</p>
      </div>
      <div className='pt-4'>
        {profileRoutes.map((route) => (
          <div key={route.name} onClick={() => setSelectedTab(route.name)} className='relative py-2 border-t border-gray-300 hover:bg-gray-200 transition-all'>
            <p className={`px-2 ${selectedTab === route.name ? 'text-primary-500 font-semibold' : ''}`}>{route.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProfileSidebar