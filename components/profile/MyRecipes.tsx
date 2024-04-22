import UserRecipeCard from "../cards/UserRecipeCard";

interface Recipe {
  _id: string;
  name: string;
  description: string;
  images: string[];
  ingredients: string[];
  directions: string[];
  tags: string[];
  prepTime: { value: number, unit: string };
  cookTime: { value: number, unit: string };
  createdAt: Date;
  isApproved: boolean;
}

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    image: string,
    savedRecipes: [],
    collections: [],
  },
  recipes: Recipe[]
}

const MyRecipes = ({ user, recipes }: Props) => {

  return (
    <section className='px-3 py-6'>
      <div className='flex flex-col gap-3 border-b-2 border-gray-300'>
        <h1 className='heading-bold'>My Recipes</h1>
        <p className='text-sm font-light pb-5'>View and manage the recipes you have submitted to the community. This area allows you to track your contributions, edit existing recipes, or add new ones to share your culinary expertise.</p>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {recipes.map((recipe) => (
          <UserRecipeCard 
            key={recipe._id}
            name={recipe.name}
            description={recipe.description}
            image={recipe.images[0]}
            tags={recipe.tags}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            createdAt={recipe.createdAt}
            isApproved={recipe.isApproved}
          />
        ))}
      </div>
    </section>
  )
}

export default MyRecipes