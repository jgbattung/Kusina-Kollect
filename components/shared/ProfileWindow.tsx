"use client"

import { ProfileContext } from '@/app/context/ProfileContext'
import React, { useContext } from 'react'
import PersonalInfo from '../profile/PersonalInfo';

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

function ProfileWindow({ user }: Props) {
  const {selectedTab} = useContext(ProfileContext);

  let content;
    switch (selectedTab) {
      case 'Personal Info':
        content = <PersonalInfo profileWindowName={selectedTab} user={user} />
        break;
      default:
        content = "Personal Info"
    }

  return (
    <div className='bg-white py-8 px-6 shadow-lg'>
      {content}
    </div>
  )
}

export default ProfileWindow