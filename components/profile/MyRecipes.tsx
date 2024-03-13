interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    image: string,
    savedRecipes: [],
    collections: [],
  }
}
const MyRecipes = ({ user }: Props) => {
  return (
    <section className='px-3 py-6'>
      <div className='flex flex-col gap-3 border-b-2 border-gray-300'>
        <h1 className='heading-bold'>My Recipes</h1>
        <p className='text-sm font-light pb-5'>View and manage the recipes you have submitted to the community. This area allows you to track your contributions, edit existing recipes, or add new ones to share your culinary expertise.</p>
      </div>
    </section>
  )
}

export default MyRecipes