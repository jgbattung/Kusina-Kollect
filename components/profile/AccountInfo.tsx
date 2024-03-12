import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { UserValidation } from '@/lib/validations/user'
import Image from "next/image"
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'
import { ChangeEvent, useState } from 'react'
import { isBase64Image } from '@/lib/utils'
import { updateUser } from '@/lib/actions/user.actions'

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    image: string,
    savedRecipes: [],
    collections: [],
  }
}

const AccountInfo = ({ user }: Props) => {
  const pathname = usePathname();
  const { startUpload } = useUploadThing("imageUploader")

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
    },
  })

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files)

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      image: values.profile_photo,
      path: pathname,
    })

  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFiles(Array.from(e.target.files));

      if(!file.type.includes('image')) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';

        fieldChange(imageDataUrl);
      }

      fileReader.readAsDataURL(file);
    }
  }

  return (
    <section className='px-3 py-6'>
      <div className='flex flex-col gap-3 border-b-2 border-gray-300'>
        <h1 className='heading-bold'>Personal Info</h1>
        <p className='text-sm font-light pb-5'>Update your username, name, and profile image. Your personal information helps identify you within the community and enhances your interaction with other users.</p>
      </div>
      <div className='pt-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 justify-start gap-6 border border-black px-6 py-8'>
            <FormField 
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className='md:order-1 md:col-span-2'>
                  <FormLabel className='font-bold'>Username*</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-gray-500' placeholder='username...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='md:order-3 md:col-span-2'>
                  <FormLabel className='font-bold'>Name</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-gray-500' placeholder='name...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className='flex flex-col items-center justify-center md:order-2 md:row-span-2 md:col-span-2'>
                  <FormLabel className='font-bold'>
                    <Image 
                      src={field.value}
                      alt='profile-photo'
                      width={120}
                      height={120}
                      priority
                      className='object-contain'
                    />
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type='file'
                      accept='image/*'
                      placeholder='Upload a photo'
                      className='cursor-pointer border-none file:ml-5 file:mr-4 file:text-xs file:py-2 file:px-4 file:rounded-full file:bg-secondary-500 file:hover:bg-primary-500 bg-transparent outline-none file:text-black transition-all'
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2 px-8 py-4 md:col-span-4 md:order-4 text-white text-md font-bold rounded-xl bg-complementary-500 hover:bg-complementary-800 transition-all' type='submit'>Save Changes</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default AccountInfo