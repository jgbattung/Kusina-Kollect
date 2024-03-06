"use client"

import SectionHeader from "@/components/shared/SectionHeader";
import SectionLinks from "@/components/shared/SectionLinks";
import { ingredientLinks } from "@/app/constants/ingredientTypes";
import { getIngredientDescription } from "@/app/utils/ingredientUtils";
import { usePathname } from "next/navigation"

const Page = () => {
  const pathname = usePathname();

  const currentIngredient = ingredientLinks.find(ingredient => ingredient.path.includes(pathname));

  const description = getIngredientDescription(currentIngredient?.name);

  return (
    <div>
      {currentIngredient ? (
        <SectionHeader 
          title={currentIngredient.name}
          description={description}
          displayImage={currentIngredient.image}
        />
      ) : (
        <>
          <SectionHeader 
            title="Oops! This Ingredient is Still a Mystery..."
            description="We couldn't find the ingredient you were looking for, but that doesn't mean your culinary adventure should end."
            displayImage="/assets/not-found.png"
          />
          <div className="pt-12 max-md:pt-6 max-sm:pt-2">
            <SectionLinks 
              linksDesc="Explore other key ingredients that make Filipino cuisine uniquely delightful:"
              links={ingredientLinks}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Page