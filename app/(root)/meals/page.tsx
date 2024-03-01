import SectionHeader from "@/app/components/shared/SectionHeader"
import SectionLinks from "@/app/components/shared/SectionLinks"
import { mealLinks } from "@/app/constants/mealTypes"
import Link from "next/link"

const page = () => {
  return (
    <div>
      <SectionHeader 
        title="Meals"
        description="Explore the Heart of Filipino Cuisine: From Sunrise Breakfasts to Sweet Dessert Nights."
      />
      <SectionLinks 
        links={mealLinks}
      />
      {/* FEATURED MEALS */}
    </div>
  )
}

export default page