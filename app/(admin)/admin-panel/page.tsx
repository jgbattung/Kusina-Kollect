
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllRecipes, getAllUsers } from '@/lib/actions/admin.actions';
import { fetchUser } from '@/lib/actions/user.actions';
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
    <div className='page-container my-10 mx-20'>
      <h1 className='heading-bold'>Administration</h1>
      <div className='w-full'>
        <Tabs defaultValue='recipes' className='w-full'>
          <TabsList className='flex min-h-14 items-center justify-start'>
            <TabsTrigger value='recipes' className='text-lg data-[state=active]:font-bold data-[state=active]:text-primary-800'>Recipes</TabsTrigger>
            <TabsTrigger value='users' className='text-lg data-[state=active]:font-bold data-[state=active]:text-primary-800'>Users</TabsTrigger>
          </TabsList>
          <TabsContent value='recipes'>
            <table className='table-auto w-full text-left'>
              <thead className='border border-black border-x-black border-t-black border-b-2'>
                <tr className='bg-accent-500'>
                  <th scope='col' className='px-4 py-3'>ID</th>
                  <th scope='col' className='px-4 py-3'>Recipe Name</th>
                  <th scope='col' className='px-4 py-3'>Status</th>
                  <th scope='col' className='px-4 py-3'>Submitted By</th>
                  <th scope='col' className='px-4 py-3'>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=''>
                {allRecipes.map((recipe, index) => (
                  <tr key={index} className='odd:bg-gray-100 even:bg-gray-200 border border-x-black last:border-b-black'>
                    <td className='px-4 py-3 max-w-24 truncate'>{recipe._id}</td>
                    <td className='px-4 py-3'>{recipe.name}</td>
                    <td className='px-4 py-3'>{`${recipe.isApproved ? 'Approved' : 'Not Approved'}`}</td>
                    <td className='px-4 py-3'>{recipe.submittedBy.name ? recipe.submittedBy.name : recipe.submittedBy.username}</td>
                    <td className='px-4 py-3'>{formatDate(recipe.createdAt)}</td>
                    <td className='px-4 py-3'>
                      <Link href={`/submission/${recipe._id}`} className='text-blue-600 hover:underline'>Check recipe</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value='users'>
            <table className='table-auto w-full text-left'>
              <thead className='border border-black border-x-black border-t-black border-b-2'>
                <tr className='bg-accent-500'>
                  <th className='px-4 py-3'>ID</th>
                  <th className='px-4 py-3'>Account Status</th>
                  <th className='px-4 py-3'>Name</th>
                  <th className='px-4 py-3'>Username</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={index} className='odd:bg-gray-100 even:bg-gray-200 border border-x-black last:border-b-black'>
                    <td className='px-4 py-3 max-w-24 truncate'>{user._id}</td>
                    <td className='px-4 py-3 max-w-24'>{user.isContributor ? 'Contributor' : 'User'}</td>
                    <td className='px-4 py-3'>{user.name ? user.name : ''}</td>
                    <td className='px-4 py-3'>{user.username ? user.username : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
};

export default AdminPanel 