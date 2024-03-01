import SectionHeader from "@/app/components/shared/SectionHeader"
import SectionLinks from "@/app/components/shared/SectionLinks"
import { cuisineLinks } from "@/app/constants/cuisineTypes"

const page = () => {
  return (
    <div>
      <SectionHeader 
        title="Cuisines"
        description="Dive into the Regional Tastes of the Philippines: A Culinary Journey from Luzon, Visayas, and Mindanao."
      />
      <SectionLinks 
        links={cuisineLinks}
      />
    </div>
  )
}

export default page