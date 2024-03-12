"use client"

import { ProfileContext } from '@/app/context/ProfileContext'
import React, { useContext } from 'react'
import AccountInfo from './AccountInfo';

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    image: string,
    savedRecipes: [],
    collections: [],
  }
}

function ProfileWindow({ user }: Props) {
  const {selectedTab} = useContext(ProfileContext);

  let content;
    switch (selectedTab) {
      case 'Personal Info':
        content = <AccountInfo user={user} />
        break;
      case 'Saved Items & Collections':
        content = 'Saved Items & Collections'
        break;
      case 'My Recipes':
        content = 'My Recipes'
        break;
      default:
        content = <AccountInfo user={user} />
        break;
    }

  return (
    <div className='bg-white pt-4 px-4 shadow-lg p-10'>
      {content}
    </div>
  )
}

export default ProfileWindow