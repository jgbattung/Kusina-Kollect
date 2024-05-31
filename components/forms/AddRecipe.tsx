"use client"

import { RecipeValidation } from '@/lib/validations/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from "../ui/textarea"
import { ChangeEvent, useState } from 'react'
import { useUploadThing } from '@/lib/uploadthing'
import Image from "next/image"
import { saveRecipe } from '@/lib/actions/recipe.actions'
import { useActionModalStore, useLoadingStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { ActionStatus } from '@/app/constants/actionModal'
import { revalidatePath } from 'next/cache'


interface Props {
  user: {
    username: string,
    objectId: string,
    isAdmin: boolean,
    isContributor: boolean,
  }
}

type FormData = {
  name: string,
  description: string,
  ingredients: { value: string }[],
  directions: { value: string }[],
  tags: string,
  images: string[],
  prepTime: { value: number, unit: string },
  cookTime: { value: number, unit: string },
}

const AddRecipe = ({ user }: Props) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const {isLoading, setIsLoading} = useLoadingStore();
  const { openModal } = useActionModalStore();

  const { register, handleSubmit, formState: {errors}, control } = useForm<FormData>({
    resolver: zodResolver(RecipeValidation),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "" }],
      directions: [{ value: "" }],
      tags: "",
      images: [],
      prepTime: { unit: 'mins' },
      cookTime: { unit: 'mins' },
    }
  });

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
    name: 'directions',
    control,
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
   e.preventDefault();

   const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
   setFiles(selectedFiles);

   const newImagePreview = selectedFiles
    .filter(file =>  file.type.includes('image'))
    .map(file => URL.createObjectURL(file))

    setImagePreviews(newImagePreview);
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    if (files.length > 0) {
      const uploadResults = await startUpload(files);
      if(uploadResults) {
        data.images = uploadResults.map(result => result.url);
      }
    }

    const populatedTags = data.tags?.length > 0 ? [...new Set([...data.tags])] :  [''];
    
    const submissionData = {
      ...data,
      ingredients: data.ingredients.map(ingredient => ingredient.value),
      directions: data.directions.map(direction => direction.value),
      tags: populatedTags,
    };

    try {
      await saveRecipe({
        name: submissionData.name,
        description: submissionData.description,
        ingredients: submissionData.ingredients,
        directions: submissionData.directions,
        tags: submissionData.tags,
        images: submissionData.images,
        prepTime: submissionData.prepTime,
        cookTime: submissionData.cookTime,
        submittedBy: user.objectId,
        isApproved: user.isAdmin || user.isContributor,
      });

      openModal(ActionStatus.SUCCESS, 'Recipe has been submitted successfully.');
    } catch (error) {
      openModal(ActionStatus.FAIL, 'Failed to submite recipe. Please try again.');
    }
    setIsLoading(false);
    revalidatePath("/");
    router.push("/")
  }

  const onError = (errors: any) => {
    console.log("FORM ERROR:", errors);
  }

  return (
    <section className='flex flex-col gap-6 bg-white shadow-lg py-8 px-14 max-w-3xl'>
      <div className='flex flex-col text-left gap-4 max-sm:gap-1'>
        <h1 className='heading-bold max-sm:text-2xl'>Add a Recipe</h1>
        <p className='text-sm'>From your kitchen to the world, submit your recipe today and showcase the rich diversity of Filipino cuisine. Every dish tells a story.</p>
      </div>

      <div className='border border-t-0 border-gray-300 mt-3 max-sm:mt-1' />

      {/* FORM */}
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className='flex max-md:flex-col justify-between max-md:gap-3 md:gap-6'>
            <div className='flex flex-col gap-10 w-3/4 max-md:w-full max-md:gap-3'>
              <div>
                <label htmlFor="name" className='form-label'>Recipe Name*</label>
                <Input 
                  {...register("name")} 
                  placeholder='Give your recipe a title'
                  className='py-6 px-4 placeholder:text-gray-500 mb-1'
                />
                {errors.name && <p className='form-error-text'>{errors.name.message}</p>}
              </div>

              <div className=''>
                <label htmlFor="description" className='form-label'>Description*</label>
                <Textarea 
                  {...register("description")} 
                  placeholder='Share the story behind your recipe.'
                  rows={8}
                  className='py-6 px-4 placeholder:text-gray-500 mb-1' />
                {errors.description && <p className='form-error-text'>{errors.description.message}</p>}
              </div>
            </div>

            <div className='flex flex-col max:md'>
              <label htmlFor="images" className='form-label'>Photo (optional)</label>
              <label htmlFor="images">
                {imagePreviews.length > 0 ? (
                  <Image 
                    src={imagePreviews[0]}
                    alt={`recipe image preview 1`}
                    width={270}
                    height={270}
                    className='min-h-64 min-w-64 object-cover max-md:min-w-full max-md:max-h-64 max-md:object-cover'
                  />
                ) : (
                <Image
                  src='/assets/recipe-default.png'
                  alt='default recipe image'
                  width={270}
                  height={270}
                  className='max-md:min-w-full max-md:max-h-64 max-md:object-cover'
                />
                )}
              </label>
              <p className='pt-2 font-light text-xs text-gray-400'>Use JPEG or PNG. You can upload up to 5 photos.</p>
              <Input 
                type='file'
                accept='image/*'
                multiple
                onChange={handleImage}
                className='border-none cursor-pointer file:rounded-full file:text-xs file:py-2 file:px-4 file:bg-secondary-500 file:hover:bg-primary-500 bg-transparent outline-none file:text-black transition-all'
              />
              {errors.images && <p className='form-error-text'>{errors.images.message}</p>}
            </div>            
          </div>

          <div className='form-section-div' />

          <div>
            <label className='form-label'>Ingredients*</label>
            <p className='form-description-text'>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped).</p>
          
            {ingredientFields.map((field, index) => (
              <div key={field.id}>
                <div className='flex items-center mb-4'>
                  <Input
                    {...register(`ingredients.${index}.value`)}
                    placeholder='e.g. 1 tbsp canola oil'
                    className='py-6 px-4 placeholder:text-gray-500'
                  />
                  <Button 
                    type='button' 
                    onClick={() => removeIngredient(index)} 
                    className='text-gray-500 flex items-center hover:text-black'  
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </Button>
                </div>
                {errors.ingredients?.[index]?.value?.message && (
                  <p className='form-error-text -mt-3 mb-4'>{errors?.ingredients[index]?.value?.message}</p>
                )}
              </div>
            ))}

            <Button 
              type='button' 
              onClick={() => appendIngredient({ value: "" })}
              className='flex items-center gap-1 border-2 border-primary-800 rounded-xl py-5 px-8 mt-8 hover:text-white hover:bg-primary-800 transition-all'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 max-sm:w-4 max-sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className='text-sm font-bold max-sm:text-xs'>
                ADD INGREDIENT
              </span>
            </Button>
          </div>

          <div className='form-section-div' />
          
          <div>
            <label className='form-label'>Directions*</label>
            <p className='form-description-text'>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.</p>
          
            {directionFields.map((field, index) => (
              <div key={field.id}>
                <div className='flex items-center mb-4'>
                  <Textarea 
                    {...register(`directions.${index}.value`)}
                    placeholder='e.g. Combine all dry ingredients in a large bowl...'
                    className='py-6 px-4 placeholder:text-gray-500'
                    rows={2}
                  />
                  <Button 
                    type='button' 
                    onClick={() => removeDirection(index)}
                    className='text-gray-500 flex items-center hover:text-black'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </Button>
                </div>
                {errors.directions?.[index]?.value?.message && (
                  <p className='form-error-text -mt-3 mb-4'>{errors?.directions[index]?.value?.message}</p>
                )}
              </div>
            ))}

            <Button 
              type='button'  
              onClick={() => appendDirection({ value: "" })}
              className='flex items-center gap-1 border-2 border-primary-800 rounded-xl py-5 px-8 mt-8 hover:text-white hover:bg-primary-800 transition-all'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 max-sm:w-4 max-sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className='text-sm font-bold max-sm:text-xs'>
                ADD DIRECTION
              </span>
            </Button>
          </div>

          <div className='form-section-div' />

          <div className='flex items-center gap-2 flex-grow'>
            <label htmlFor='prepTime' className='form-label w-1/4'>Prep Time</label>
            <Input 
              type='number'
              {...register("prepTime.value", { valueAsNumber: true })}
              placeholder='0'
              className='w-1/2 py-6 px-4 placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <Controller
              control={control}
              name="prepTime.unit"
              defaultValue="mins"
              render={({ field }) => (
                <div className='w-1/4 py-6 px-4'>
                  <select
                    {...field}
                    id='prepTimeUnit'
                    className='p-3 border border-black rounded-md shadow-sm focus:outline-none'
                  >
                    <option value='mins'>mins</option>
                    <option value='hours'>hours</option>
                  </select>
                </div>
              )}
            >
            </Controller>
          </div>

          <div className='flex items-center gap-2 flex-grow mt-6'>
            <label htmlFor='cookTime' className='form-label w-1/4'>Cook Time</label>
            <Input 
              type='number'
              {...register("cookTime.value", { valueAsNumber: true })}
              placeholder='0'
              className='w-1/2 py-6 px-4 placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <Controller
              control={control}
              name='cookTime.unit'
              defaultValue='mins'
              render={({ field }) => (
                <div className='w-1/4 py-6 px-4'>
                  <select
                    {...field}
                    id='cookTimeUnit'
                    className='p-3 border border-black rounded-md shadow-sm focus:outline-none'
                  >
                    <option value='mins'>mins</option>
                    <option value='hours'>hours</option>
                  </select>
                </div>
              )}
            >
            </Controller>
          </div>

          <div className='form-section-div' />
          
          <div>
            <label htmlFor='tags' className='form-label'>Tags</label>
            <p className='form-description-text'>Add tags so others can find your recipe easier. Separate each tag with a coma (,)</p>
            <Textarea 
              {...register("tags")} 
              placeholder='e.g. chicken, lunch, Ilocano.'
              className='py-6 px-4 placeholder:text-gray-500' 
            />
          </div>

          <div className='form-section-div' />

          <div className='flex items-center justify-end'>
            <Button 
              type='submit'
              className='text-white px-8 py-6 bg-complementary-500 hover:bg-complementary-800 rounded-xl'
              disabled={isLoading}
            >
              <span className='font-semibold text-lg'>{isLoading ? 'Submitting your recipe...' : 'Submit Recipe'}</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddRecipe