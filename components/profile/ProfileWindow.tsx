"use client"

import { ProfileContext } from '@/app/context/ProfileContext'
import React, { useContext } from 'react'
import AccountInfo from '../forms/AccountInfo';
import SavedItems from './SavedItems';
import MyRecipes from './MyRecipes';

interface Recipe {
  _id: string;
  name: string;
  description: string;
  images: string[];
  ingredients: string[];
  directions: string[];
  tags: string[];
  prepTime: { value: number, unit: string };
  cookTime: { value: number, unit: string };
  createdAt: Date;
  isApproved: boolean;
}

interface Props {
  user: {
    id: string;
    objectId: string
    username: string
    name: string;
    image: string;
    savedRecipes: [];
    collections: [];
  },
  recipes: Recipe[];
}

function ProfileWindow({ user, recipes }: Props) {
  const {selectedTab} = useContext(ProfileContext);

  let content;
    switch (selectedTab) {
      case 'Personal Info':
        content = <AccountInfo user={user} />
        break;
      case 'Saved Items & Collections':
        content = <SavedItems user={user} />
        break;
      case 'My Recipes':
        content = <MyRecipes user={user} recipes={recipes} />
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