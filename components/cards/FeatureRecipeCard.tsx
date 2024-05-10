import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  id: string;
  name: string;
  images: string[];
  description: string;
  submittedBy: string;
  userImage: string;
}

const FeatureRecipeCard = ({ id, name, images, description, submittedBy, userImage }: Props) => {
  return (
    <article className='w-full flex flex-col gap-2 items-center justify-center'>
      <Link href={`recipe/${id}`} className='group flex flex-col gap-2 items-start justify-center'>
        <div className='w-full'>
          {images.length > 0 ? (
            <Image 
              src={images[0]}
              alt={`an image of ${name}`}
              width={640}
              height={480}
              className='object-cover max-h-120 max-w-160 min-w-160 max-md:max-h-115 max-md:max-w-130 max-sm:max-h-80 max-sm:max-w-105 max-[490px]:max-w-80'
            />
          ) : (
            <Image 
              src='/assets/recipe-image.png'
              alt={`placeholder image for ${name}`}
              width={640}
              height={480}
            />
          )}
        </div>
        <div>
          <p className='font-extrabold text-xl max-sm:font-bold max-sm:text-lg group-hover:underline-offset-2 group-hover:underline underline-custom'>{name}</p>
          <div className='flex items-center justify-start gap-1'>
            <p className='font-light text-xs text-gray-600'>{`by ${submittedBy}`}</p>
            <Image 
              src={userImage}
              alt={`${submittedBy}'s profile picture`}
              width={17}
              height={17}
              className='object-fit rounded-full'
            />
          </div>
        </div>
      </Link>
    </article>
  )
}

export default FeatureRecipeCard