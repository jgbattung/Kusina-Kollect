import * as z from 'zod'

export const RecipeValidation = z.object({
  name: z.string()
    .min(1, { message: 'Recipe name is required.' })
    .max(100, { message: 'Recipe name must be 100 characters or fewer.' }),
  description: z.string()
    .min(50, { message: 'Recipe description must be at least 50 characters.' })
    .max(500, { message: 'Recipe descriptions must be 500 characters or fewer.' }),
  ingredients: z.array(
    z.object({
      value: z.string()
        .min(1, { message: 'Ingredient cannot be empty.' })
        .max(100, { message: 'Each ingredient must be 100 characters or fewer.' })
    })
  )
  .min(1, { message: 'At least one (1) ingredient is required.' })
  .max(70, { message: 'A recipe cannot have more than 70 ingredients.' }),
  directions: z.array(
    z.object({
      value: z.string()
        .min(1, { message: 'Direction cannot be empty.' })
        .max(500, { message: 'Each direction step must be 500 characters or fewer.' })
    })
  )
  .min(1, { message: 'At least one (1) direction step is required.' })
  .max(100, { message: 'A recipe cannot have more than 100 direction steps' }),
  images: z.array(
    z.string().url()
  )
  .min(0)
  .max(5, { message: 'You can upload up to 5 images' }),
  tags: z.string()
    .min(0)
    .regex(/^[A-Za-z\s,]+$/, { message: "Tags can only include letters, spaces, and commas." }) // Validate for letters, spaces, and commas
    .transform(tags => 
      tags.split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== "")
    ),
})