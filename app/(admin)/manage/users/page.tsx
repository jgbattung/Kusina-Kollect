import PageWrapper from '@/components/utils/PageWrapper';
import { getAllUsers } from '@/lib/actions/admin.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { userInfo } from 'os';

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const userData = await fetchUser(user.id);

  const allUsers = await getAllUsers();
  
  if(!userData.isAdmin) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center min-h-screen'>
        <h1 className='text-6xl font-extrabold'>ACCESS DENIED!</h1>
        <Link
          href='/'
          className='hover:underline hover:text-primary-800'
        >
          <p className='text-primary-800 text-lg'>Return to Homepage</p>
        </Link>
      </div>
    )
  }

  return (
    <PageWrapper>
      <div className='page-container my-5 mx-20'>
        <p className='heading-bold'>Manage Users</p>
        <div className='w-full mt-14'>
          <table className='table-auto w-full text-left'>
            <thead className='border border-black border-x-black border-t-black border-b-2'>
              <tr className='bg-accent-500'>
                <th scope='col' className='px-4 py-3'>ID</th>
                <th scope='col' className='px-4 py-3'>Account Status</th>
                <th scope='col' className='px-4 py-3'>Name</th>
                <th scope='col' className='px-4 py-3'>Username</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id} className='odd:bg-gray-100 even:bg-gray-200 border border-x-black last:border-b-black'>
                  <td className='px-4 py-3 max-w-20 truncate'>{user._id}</td>
                  <td className='px-4 py-3'>{user.isAdmin ? 'Admin' : (user.isContributor ? 'Contributor' : 'User')}</td>
                  <td className='px-4 py-3'>{user.name ? user.name : ''}</td>
                  <td className='px-4 py-3'>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Page