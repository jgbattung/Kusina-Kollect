import AdminOverviewCard from '@/components/cards/AdminOverviewCard';
import TopContributorsCard from '@/components/cards/TopContributorsCard';
import PageWrapper from '@/components/utils/PageWrapper';
import { getAllApprovedRecipes, getAllUsers, getContributors, getUsersWithContribution } from '@/lib/actions/admin.actions';
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
  const usersWithContributions = await getUsersWithContribution();
  console.log(usersWithContributions)

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
      <div className='flex flex-col mx-6 my-12 gap-6'>
        <AdminOverviewCard 
          approvedRecipes={approvedRecipes.length}
          totalUsers={users.length}
          contributors={usersWithContributions.length}
        />
        <div className='flex gap-8'>
          <TopContributorsCard 
            contributors={usersWithContributions}
          />
        </div>
      </div>
    </PageWrapper>
  )
};

export default AdminPanel 