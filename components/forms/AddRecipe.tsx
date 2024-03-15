"use client"

import * as z from 'zod'
import { RecipeValidation } from '@/lib/validations/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from "../ui/textarea"


interface Props {
  user: {
    username: string,
    objectId: string,
  }
}

type FormData = {
  name: string,
  description: string,
  ingredients: { value: string }[],
  directions: { value: string }[],
  tags: string[],
  // images: string[],
}

const AddRecipe = ({ user }: Props) => {
  const { register, handleSubmit, formState: {errors}, control } = useForm<FormData>({
    resolver: zodResolver(RecipeValidation),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "" }],
      directions: [{ value: "" }],
      // tags: [""],
    }
  })

  const { 
    fields: ingredientFields, 
    append: appendIngredient, 
    remove: removeIngredient, 
  } = useFieldArray({
    name: 'ingredients',
    control,
  })

  const { 
    fields: directionFields, 
    append: appendDirection, 
    remove: removeDirection, 
  } = useFieldArray({
    name: 'ingredients',
    control,
  })

  const onSubmit = async (data: FormData) => {
    const transformedData = {
      ...data,
      ingredients: data.ingredients.map(ingredient => ingredient.value),
      directions: data.directions.map(direction => direction.value),
      // Handle tags and images as needed
    };
    console.log(transformedData)
  }

  return (
    <section className='flex flex-col gap-6 bg-white shadow-lg py-8 px-14 max-w-2xl'>
      <div className='flex flex-col text-left gap-4'>
        <h1 className='heading-bold'>Add a Recipe</h1>
        <p className=' text-sm'>From your kitchen to the world, submit your recipe today and showcase the rich diversity of Filipino cuisine. Every dish tells a story.</p>
        <div className='border border-t border-gray-300 mt-3' />
      </div>

      {/* SUBMISSION FORM */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Recipe Name*</label>
            <Input {...register("name")} placeholder='Give your recipe a title' />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="description">Description*</label>
            <Input {...register("description")} placeholder='Share the story behind your recipe' />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <div>
            <label>Ingredients</label>
            <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped).</p>
          
            {ingredientFields.map((field, index) => (
              <div key={field.id}>
                <Input
                  {...register(`ingredients.${index}.value`)}
                  placeholder='e.g. 1 tbsp canola oil'
                />
                <Button type='button' onClick={() => removeIngredient(index)}>x</Button>
                {errors.ingredients?.[index]?.value?.message && (
                  <p>{errors?.ingredients[index]?.value?.message}</p>
                )}
              </div>
            ))}

            <Button type='button' onClick={() => appendIngredient({ value: "" })}>Add Ingredient</Button>
          </div>
          
          <div>
            <label>Instructions</label>
            <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.</p>
          
            {directionFields.map((field, index) => (
              <div key={field.id}>
                <Input 
                  {...register(`directions.${index}.value`)}
                  placeholder='e.g. Combine all dry ingredients in a large bowl...'
                />
                <Button type='button' onClick={() => removeDirection(index)}>x</Button>
                {errors.directions?.[index]?.value?.message && (
                  <p>{errors?.directions[index]?.value?.message}</p>
                )}
              </div>
            ))}

            <Button type='button' onClick={() => appendDirection({ value: "" })}>Add Direction</Button>
          </div>
          
          <div>
            <label htmlFor='tags'>Tags</label>
            <p>Add tags so others can find your recipe easier. Separate each tag with a coma (,)</p>
            <Textarea {...register("tags")} placeholder='e.g. "chicken", "lunch", "Ilocano". ' />
          </div>

          <Button type='submit'>Submit Recipe</Button>
        </form>
      </div>
    </section>
  )
}

export default AddRecipe