import Image from "next/image"
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  images: string[];
  category?: string;
}

const RecipeCard = ({ id, name, images, category }: Props) => {
  return (
    <article className="flex flex-col justify-center items-center">
      <Link 
        href={`/recipe/${id}`}
        className="group flex flex-col gap-2 items-start justify-center"  
      >
        {images.length > 0 ? (
          <Image 
            src={images[0]}
            alt={`an image of ${name}`}
            width={520}
            height={320}
            className="px-2 object-cover max-h-72 min-h-72 max-w-90 min-w-90 max-xl:min-w-115 max-xl:min-h-80 max-lg:min-w-105 max-lg:min-h-60 max-[910px]:min-w-75 max-md:min-w-130 max-md:min-h-75 max-sm:min-w-105 max-sm:min-h-70 max-[490px]:min-w-60 max-[490px]:min-h-60"
          />
        ) : (
          <Image 
            src="assets/recipe-image.png"
            alt={`placeholder image for ${name}`}
            width={320}
            height={240}
          />
        )}
        <div className="text-left px-3">
          {category && (
            <p className="text-sm font-semibold text-primary-800">{category.toUpperCase()}</p>
          )}
          <p className="font-bold text-2xl max-sm:text-lg group-hover:underline group-hover:underline-offset-2 underline-custom">{name}</p>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard