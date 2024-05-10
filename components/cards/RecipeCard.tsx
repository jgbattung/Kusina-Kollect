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
    <article>
      <Link href={`/recipe/${id}`} className="group flex flex-col gap-3">
        <div className="relative max-w-80 max-md:min-w-128">
          {images.length > 0 ? (
            <Image 
              src={images[0]}
              alt={`an image of ${name}`}
              width={320}
              height={240}
              className="max-w-80 min-h-60 max-h-60 object-cover max-lg:min-w-80 max-md:min-w-128 max-sm:min-w-80 max-md:min-h-64"
            />
          ) : (
            <Image 
              src='/assets/recipe-image.png'
              alt={`placeholder image for ${name}`}
              width={320}
              height={240}
              className="max-w-80 min-h-60 max-h-60 object-cover max-lg:min-w-80 max-md:min-w-128 max-sm:min-w-80 max-md:min-h-64"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-primary-800">{category?.toUpperCase()}</p>
          <p className="font-extrabold text-2xl group-hover:underline-offset-2 group-hover:underline underline-custom">{name}</p>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard