import Image from "next/image"
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  images: [string];
}

const RecipeCard = ({ id, name, images }: Props) => {
  return (
    <article>
      <Link href={`/recipe/${id}`} className="group flex flex-col gap-3">
        <div className="relative">
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
          <svg fill="#8B0000" width="800px" height="800px" className="w-10 h-10 absolute top-0 right-0 m-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-f</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm74.69,252.82c-9.38,11.44-26.4,29.73-65.7,56.41a15.93,15.93,0,0,1-18,0c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33C360.27,251.42,350.68,276.45,330.69,300.82Z"/></svg>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-primary-800">CATEGORY</p>
          <p className="font-extrabold text-2xl group-hover:underline-offset-2 group-hover:underline underline-custom">{name}</p>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard