import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Key } from "react";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  submittedBy: {
    _id: string;
    name?: string;
    username: string;
    isContibutor: boolean;
    image: string;
  }
  images: [string];
  date: Date;
  description: string;
  directions: [string];
  ingredients: [string];
  isApproved: boolean;
}


const SubmissionCard = ({
  id, name, submittedBy, images, date, description, directions, ingredients, isApproved
}: Props) => {
  return (
    <div className="bg-white max-w-5xl shadow-lg rounded-lg mx-24 my-12 px-16 py-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold">{name}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${isApproved ? 'bg-green-500' : 'bg-red-500'}`}>
            {isApproved ? 'Approved' : 'Not Approved'}
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-4">Submitted on {formatDate(date)}</p>
      <div className="flex items-center mb-4">
        <Image 
          src={submittedBy.image}
          alt="User profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{submittedBy.name}</p>
          <p className="text-gray-500 text-sm">{submittedBy.username}</p>
        </div>
      </div>
      <div className="mb-4">
        {images.length > 1 ? (
          <div className="flex items-center justify-center">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={name}
                      width={360}
                      height={280}
                      className="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          images.length === 1 && (
            <Image 
              src={images[0]}
              alt={name}
              width={460}
              height={380}
            />
          )
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="mb-4">{description}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc pl-5 mb-4">
          {ingredients.map((ingredient: string, index: Key) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-2">Directions</h3>
        <ol className="list-decimal pl-5">
          {directions.map((direction: string, index: Key) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}


export default SubmissionCard