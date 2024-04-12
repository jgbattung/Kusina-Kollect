
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminPanel  = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in');
  const userData = await fetchUser(user.id)

  if(!userData.isAdmin) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center min-h-screen'>
        <h1 className='text-6xl font-extrabold'>ACCESS DENIED!</h1>
        <Link
          href='/'
          className='hover:underline hover:text-primary-800'
        >
          Return to Homepage
        </Link>
      </div>
    )
  }


  return (
    <div className='page-container mx-10'>
      <h1 className='heading-bold'>Administration</h1>
      <div className='w-full'>
        <Tabs defaultValue='recipes'>
          <TabsList>
            <TabsTrigger value='recipes'>Recipes</TabsTrigger>
            <TabsTrigger value='users'>Users</TabsTrigger>
          </TabsList>
          <TabsContent value='recipes'>
            <table>
              <tr>
                <th></th>
              </tr>
            </table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
};

export default AdminPanel 