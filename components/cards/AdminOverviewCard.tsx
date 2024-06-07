import Image from 'next/image';
import React from 'react'

interface OverviewProps {
  approvedRecipes: number;
  totalUsers: number;
  contributors: number;
}

const AdminOverviewCard = ({ approvedRecipes, totalUsers, contributors }: OverviewProps) => {
  return (
    <div className='w-full bg-white shadow-lg'>
      <div className='p-4'>
        <p className='font-semibold'>Kusina Kollect Stats</p>
      </div>
      <div className='w-full border border-b border-gray-200' />
      <div className='flex items-center justify-around px-4 py-8'>
        <div className='flex gap-3 items-center justify-center'>
          <Image 
            src='/assets/recipes-icon.png'
            alt='recipes icon'
            width={70}
            height={70}
          />
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-500'>Live Recipes</p>
            <p className='font-bold text-4xl'>{approvedRecipes}</p>
          </div>
        </div>

        <div className='flex gap-3 items-center justify-center'>
          <Image 
            src='/assets/users-icon.png'
            alt='users icon'
            width={70}
            height={70}
          />
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-500'>Registered Users</p>
            <p className='font-bold text-4xl'>{totalUsers}</p>
          </div>
        </div>

        <div className='flex gap-3 items-center justify-center'>
          <Image 
            src='/assets/contributors-icon.png'
            alt='contributors icon'
            width={70}
            height={70}
          />
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-500'>Contributors</p>
            <p className='font-bold text-4xl'>{contributors}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverviewCard