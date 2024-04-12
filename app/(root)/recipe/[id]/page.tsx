import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { fetchRecipeById } from "@/lib/actions/recipe.actions"
import { formatDate, getTotalTime } from "@/lib/utils"
import Image from "next/image"
import { Key } from "react"

const Page = async ({ params }: { params: { id: string } }) => {

  const recipe = await fetchRecipeById(params.id)

  const totalTime = getTotalTime(recipe.prepTime, recipe.cookTime);

  console.log(recipe)

  return (
    <section className="page-container mt-5 mb-10">
      <div className="flex flex-col gap-8 max-w-screen-sm">
        <div className="flex flex-col gap-4 text-left ">
          <h1 className="heading-bold max-md:text-3xl">{recipe.name}</h1>
          <p className="font-light">{recipe.description}</p>
          <div className="flex items-center max-md:flex-col max-md:items-start gap-2 text-sm font-light">
            <div className="flex gap-2">
              <p className="font-serif">Submitted by <span className="font-bold">{recipe.submittedBy.name}</span></p>
              <Image 
                src={recipe.submittedBy.image}
                alt={recipe.submittedBy.name}
                width={18}
                height={18}
                className="rounded-full object-contain"
              />
            </div>
            <p className="max-md:hidden">|</p>
            <p className="text-xs">{formatDate(recipe.createdAt)}</p>
          </div>
        </div>

        <div>
          {recipe.images.length > 1 ? (
            <Carousel className="w-1/2 flex items-center justify-center">
              <CarouselContent>
                {recipe.images.map((image: string, index: Key) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={recipe.name}
                      width={360}
                      height={280}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
          ): (
            recipe.images.length === 1 && (
              <Image 
                src={recipe.images[0]}
                alt={recipe.name}
                width={460}
                height={380}
                className="object-cover"
              />
            )
          )}
        </div>

        <div>
          {recipe.prepTime && recipe.cookTime && (
            <div className="relative w-3/4 max-md:w-full grid grid-cols-3 max-md:gap-6 max-sm:grid-cols-1 max-sm:grid-rows-2 gap-3 justify-items-start border border-gray-400 rounded-lg py-8 px-8">
              <div className="absolute top-0 w-full border border-t-8 border-primary-500 rounded-t-lg" />
              <div>
                <p className="font-bold">Prep Time:</p>
                <p className="font-light">{recipe.prepTime.value}
                  {recipe.prepTime.unit === 'hours' ? (
                    recipe.prepTime.value === 1 ? ' hour' : ' hours'
                  ) : (
                    recipe.prepTime.value === 1 ? ' min' : ' mins'
                  )}
                </p>
              </div>
              <div>
                <p className="font-bold">Cook Time:</p>
                <p className="font-light">{recipe.cookTime.value}
                  {recipe.cookTime.unit === 'hours' ? (
                    recipe.cookTime.value === 1 ? ' hour' : ' hours'
                  ) : (
                    recipe.cookTime.value === 1 ? ' min' : ' mins'
                  )}
                </p>
              </div>
              <div>
                <p className="font-bold">Total Time:</p>
                <p className="font-light">{totalTime}</p>
              </div>
            </div>
          )}
        </div>

        <div className="my-4 max-md:my-2">
          <p className="heading-large mb-8 max-md:text-xl max-md:mb-3">Ingredients</p>
          <ul className="list-disc ml-4 marker:text-primary-500">
            {recipe.ingredients.map((ingredient: string, index: Key) => (
              <li key={index} className="my-2 font-light">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="my-4 max-md:my-2">
          <p className="heading-large mb-8 max-md:text-xl max-md:mb-3">Directions</p>
          <ul className="list-none">
            {recipe.directions.map((direction: string, index: string) => (
              <li key={index} className="my-7 font-light flex flex-col gap-1 first:mt-2">
                <p className="font-bold">{`Step ${parseInt(index) + 1}`}</p>
                <p>{direction}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4 text-white justify-center bg-complementary-500 py-5 px-8 border rounded-2xl">
          <p className="font-bold text-xl">Did you make this recipe?</p>
          <p className="font-light">Tag @KusinaKollect on Instagram and show everyone your delicious meal!</p>
        </div>
      </div>
    </section>
  )
}

export default Page