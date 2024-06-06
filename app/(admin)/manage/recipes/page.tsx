import PageWrapper from '@/components/utils/PageWrapper';
import { getAllRecipes } from '@/lib/actions/admin.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { formatDate } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const userData = await fetchUser(user.id);

  const allRecipes = await getAllRecipes();
  
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
        <p className='heading-bold'>Manage Recipes</p>
        <div className='w-full mt-14'>
          <table className='table-auto w-full text-left'>
            <thead className='border border-black border-x-black border-t-black border-b-2'>
              <tr className='bg-accent-500'>
                <th scope='col' className='px-4 py-3'>Status</th>
                <th scope='col' className='px-4 py-3'>ID</th>
                <th scope='col' className='px-4 py-3'>Recipe Name</th>
                <th scope='col' className='px-4 py-3'>Submitted By</th>
                <th scope='col' className='px-4 py-3'>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allRecipes.map((recipe) => (
                <tr key={recipe._id} className='odd:bg-gray-200 border border-x-black last:border-b-black'>
                  <td className={`px-4 py-3 ${recipe.isApproved ? 'text-green-700' : 'text-red-700'}`}>{`${recipe.isApproved ? 'Approved' : 'Not Approved'}`}</td>
                  <td className='px-4 py-3 max-w-20 truncate'>{recipe._id}</td>
                  <td className='px-4 py-3'>{recipe.name}</td>
                  <td className='px-4 py-3'>{recipe.submittedBy.name ? recipe.submittedBy.name : recipe.submittedBy.username}</td>
                  <td className='px-4 py-3'>{formatDate(recipe.createdAt)}</td>
                  <td className='px-4 py-3'>
                    <Link href={`/submissions/${recipe._id}`} className='text-blue-600 hover:underline'>
                      <p>View Recipe</p>
                    </Link>
                  </td>
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