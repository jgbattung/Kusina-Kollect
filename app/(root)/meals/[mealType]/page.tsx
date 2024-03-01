"use client"

import SectionHeader from "@/app/components/shared/SectionHeader";
import SectionLinks from "@/app/components/shared/SectionLinks";
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
        <div className="page-container">
          <div className="center">
            <h2 className="heading-bold">Oops! The Feast has yet to begin...</h2>
            <p className="body-light pt-2">{`We couldn't find the meal type you're searching for, but the culinary journey doesn't have to end here.`}</p>
          </div>
          <SectionLinks 
            linksDesc="Explore our diverse collection of meals and discover new favorites that await to delight your taste buds:"
            links={mealLinks}
          />
        </div>
      )}
    </div>
  )
}

export default Page