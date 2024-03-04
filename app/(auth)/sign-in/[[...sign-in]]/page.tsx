import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignIn />  
    </div>
  )
}

export default Page