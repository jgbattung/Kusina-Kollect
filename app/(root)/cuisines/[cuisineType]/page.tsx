"use client"

import SectionHeader from "@/app/components/shared/SectionHeader";
import SectionLinks from "@/app/components/shared/SectionLinks";
import { cuisineLinks } from "@/app/constants/cuisineTypes";
import { getCuisineDescription } from "@/app/utils/cuisineUtils";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  const currentCuisine = cuisineLinks.find(cuisine => cuisine.path.includes(pathname as string));

  const description = getCuisineDescription(currentCuisine?.name);

  return (
    <div>
      {currentCuisine ? (
        <SectionHeader 
          title={currentCuisine.name}
          description={description}
        />
      ) : (
        <>
          <SectionHeader 
            title="Embark on a Culinary Adventure"
            description="It seems the cuisine you're looking for has eluded our culinary map. But don't let your appetite for discovery end here."
          />
          <div className="pt-12 max-md:pt-6 max-sm:pt-2">
            <SectionLinks 
              linksDesc="Dive into the rich tapestry of flavors and traditions with our curated selection of cuisines:"
              links={cuisineLinks}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Page