import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Key } from "react";

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
  desciption: string;
  directions: [string];
  ingredients: [string];
  isApproved: boolean;
}


const SubmissionCard = ({ id, name, submittedBy, images, date, desciption, directions, ingredients, isApproved }: Props) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{formatDate(date)}</p>
      <p>{isApproved ? 'Approved' : 'Not Approved'}</p>

      {/* submitter info */}
      <div>
        <Image 
          src={submittedBy.image}
          alt="user's profile photo"
          width={20}
          height={20}
          className="object-contain rounded-full"
        />
        <p>{submittedBy.name}</p>
        <p>{submittedBy.username}</p>
      </div>

      <div>
        <div>
          {images.length > 1 ? (
            <Carousel className="w-1/2 flex items-center justify-center">
              <CarouselContent>
                {images.map((image: string, index: Key) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={name}
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
            images.length === 1 && (
              <Image 
                src={images[0]}
                alt={name}
                width={460}
                height={380}
                className="object-cover"
              />
            )
          )}
        </div>
        <p>{desciption}</p>
        <p>Ingredients</p>
        <ul>
          {ingredients.map((ingredient: string, index: Key) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>Directions</p>
          {directions.map((direction: string, index: Key) => (
            <li key={index}>{direction}</li>
          ))}
      </div>
    </div>
  )
}

export default SubmissionCard