

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

const SavedItems = ({ user }: Props) => {
  return (
    <section className='px-3 py-6'>
      <div className='flex flex-col gap-3 border-b-2 border-gray-300'>
        <h1 className='heading-bold'>Saved Items & Collections</h1>
        <p className='text-sm font-light pb-5'>Access and organize recipes you have saved. This section helps you quickly find your favorite or planned recipes, making meal preparation simpler and more efficient.</p>
      </div>
    </section>
  )
}

export default SavedItems