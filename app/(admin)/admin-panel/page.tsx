
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
        <Tabs defaultValue='recipes'>
          <TabsList>
            <TabsTrigger value='recipes'>Recipes</TabsTrigger>
            <TabsTrigger value='users'>Users</TabsTrigger>
          </TabsList>
          <TabsContent value='recipes'>
            <table className='table-auto w-full text-left'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Submitted By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {allRecipes.map((recipe, index) => (
                  <tr key={index}>
                    <td>{recipe._id}</td>
                    <td>{`${recipe.isApproved ? 'Approved' : 'Not Approved'}`}</td>
                    <td>{recipe.submittedBy.name ? recipe.submittedBy.name : recipe.submittedBy.username}</td>
                    <td>{formatDate(recipe.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value='users'>
            <table className='table-auto w-full text-left'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account Status</th>
                  <th>Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.isContributor ? 'Contributor' : 'User'}</td>
                    <td>{user.name ? user.name : ''}</td>
                    <td>{user.username ? user.username : ''}</td>
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