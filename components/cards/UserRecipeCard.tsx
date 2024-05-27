import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  name: string;
  description: string;
  image: string;
  tags: string[];
  prepTime: { value: number, unit: string };
  cookTime: { value: number, unit: string };
  createdAt: Date;
  isApproved: boolean;
}

const UserRecipeCard = ({
  name,
  description,
  image,
  tags,
  prepTime,
  cookTime,
  createdAt,
  isApproved,
}: Props) => {
  return (
    <div className="bg-gray-100 border border-gray-200 py-6 px-6 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${isApproved ? 'bg-green-500' : 'bg-red-500'}`}>
          {isApproved ? 'Approved' : 'Not Approved'}
        </span>
        <p className="mt-2 text-xs">{`Submitted on: ${formatDate(createdAt)}`}</p>
      </div>
      <p className="text-xl font-bold text-primary-800">{name}</p>
      <p className="truncate text-sm text-gray-600">{description}</p>
      <div className="flex justify-between gap-4">
        <div className="truncate flex flex-col gap-2">
          {prepTime && cookTime && (
            <div className="flex flex-col text-sm font-light">
              <p>{`Prep Time: ${prepTime.value} ${prepTime.unit}`}</p>
              <p>{`Cook Time: ${cookTime.value} ${cookTime.unit}`}</p>
            </div>
          )}
          <p className="truncate text-xs text-gray-400">{tags.join(", ")}</p>
        </div>
        <div>
          <Image
            src={image}
            alt={`image of ${name}`}
            width={200}
            height={200}
            className="rounded-full object-cover min-w-20 min-h-20 max-w-20 max-h-20"
          />
        </div>
      </div>
    </div>
  )
}

export default UserRecipeCard