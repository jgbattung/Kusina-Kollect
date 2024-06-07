import AdminOverviewCard from '@/components/cards/AdminOverviewCard';
import PageWrapper from '@/components/utils/PageWrapper';
import { getAllApprovedRecipes, getAllRecipes, getAllUsers, getContributors } from '@/lib/actions/admin.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminPanel  = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in');
  const userData = await fetchUser(user.id)

  const approvedRecipes = await getAllApprovedRecipes();
  const users = await getAllUsers();
  const contributors = await getContributors();

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
      <div className='mx-6 my-12'>
        <AdminOverviewCard 
          approvedRecipes={approvedRecipes.length}
          totalUsers={users.length}
          contributors={contributors.length}
        />
      </div>
    </PageWrapper>
  )
};

export default AdminPanel 