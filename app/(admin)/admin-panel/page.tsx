
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageWrapper from '@/components/utils/PageWrapper';
import { getAllRecipes, getAllUsers } from '@/lib/actions/admin.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { useLoadingStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminPanel  = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in');
  const userData = await fetchUser(user.id)

  const allRecipes = await getAllRecipes();
  const allUsers = await getAllUsers();

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
    <PageWrapper>
      <h1>ADMIN PANEL</h1>
    </PageWrapper>
  )
};

export default AdminPanel 