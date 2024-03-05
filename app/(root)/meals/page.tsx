import SectionHeader from "@/components/shared/SectionHeader"
import SectionLinks from "@/components/shared/SectionLinks"
import { mealLinks } from "@/app/constants/mealTypes"

const page = () => {
  return (
    <div>
      <SectionHeader 
        title="Meals"
        description="Explore the Heart of Filipino Cuisine: From Sunrise Breakfasts to Sweet Dessert Nights."
        displayImage="/assets/meals/main.png"
      />
      <SectionLinks 
        links={mealLinks}
      />
      {/* FEATURED MEALS */}
    </div>
  )
}

export default page