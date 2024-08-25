import Image from 'next/image';
import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='h-screen flex items-start justify-center'>
      <div className='grid grid-cols-2 max-lg:grid-cols-1 items-center justify-items-center max-lg:hidden'>
        <div className='max-lg:hidden'>
          <Image
            src="/assets/background.png"
            alt="food background"
            width={2000}
            height={2000}
            className='object-cover h-screen'
          />
          </div>
        <SignIn />  
      </div>
      <div className='flex flex-col items-center justify-center lg:hidden'>
        <div>
          <Image 
            src="/assets/logo.png"
            alt='logo'
            width={200}
            height={200}
            className='min-w-40'
          />
        </div>
        <div className='mb-5'>
          <Image 
            src='/assets/background.png'
            alt='food background'
            width={3000}
            height={50}
            className='object-cover max-h-40'
          />
        </div>
        <div className='mb-10'>
          <SignIn /> 
        </div>
      </div>
    </div>
  )
}

export default Page