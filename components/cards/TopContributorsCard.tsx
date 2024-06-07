import Image from 'next/image';
import React from 'react'

interface User {
  _id: string;
  image: string;
  username: string;
  name?: string;
  contributionCount: number;
}

interface ContributorsProps {
  contributors: User[]
}

const TopContributorsCard = ({ contributors }: ContributorsProps) => {
  return (
    <div className='w-full bg-white shadow-lg'>
      <div className='px-6 py-4'>
        <p className='font-semibold'>Top Contributors</p>
      </div>
      <div className='w-full border border-b border-gray-200' />
      <div className='flex flex-col px-6 py-4 gap-5'>
        {contributors.map((contributor, index) => (
          <div key={contributor._id} className='flex items-center gap-2 pt-3'>
            <p>{index + 1}. </p>
            <Image 
              src={contributor.image}
              alt='contributor profile photo'
              width={25}
              height={25}
              className='object-contain rounded-full'
            />
            <div className='flex gap-1 text-sm items-center'>
              {contributor.name && (
                <p className='font-semibold '>{contributor.name}</p>
              )}
              <p className='font-light text-gray-500'>({contributor.username})</p>
              <p className='font-light text-primary-800'> - <span className='font-semibold'>{contributor.contributionCount}</span> recipes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopContributorsCard