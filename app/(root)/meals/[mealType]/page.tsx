"use client"

import SectionHeader from "@/app/components/shared/SectionHeader";
import { mealLinks } from "@/app/constants/mealTypes";
import { getMealDescription } from "@/app/utils/mealUtils";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  const currentMealType = mealLinks.find(meal => meal.path.includes(pathname as string))

  const description = getMealDescription(currentMealType?.name)

  return (
    <div>
      {currentMealType ? (
        <>
          <SectionHeader 
            title={currentMealType.name}
            description={description}
          />
        </>
      ) : (
        <p>Meal type not found</p>
      )}
    </div>
  )
}

export default Page