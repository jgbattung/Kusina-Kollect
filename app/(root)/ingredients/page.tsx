import SectionHeader from '@/components/shared/SectionHeader'
import SectionLinks from '@/components/shared/SectionLinks'
import { ingredientLinks } from '@/app/constants/ingredientTypes'
import React from 'react'

const page = () => {
  return (
    <div>
      <SectionHeader 
        title='Ingredients'
        description='From Land to Sea: Discover the Essential Ingredients of Filipino Cooking.'
        displayImage='/assets/ingredients/main.png'
      />
      <SectionLinks 
        links={ingredientLinks}
      />
    </div>
  )
}

export default page