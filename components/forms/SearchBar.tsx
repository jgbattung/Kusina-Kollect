"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SearchValidation } from '@/lib/validations/search'
import React from 'react'
import { Form, FormField, FormItem } from '../ui/form'
import { useRouter } from 'next/navigation'
import { useSideNavbarStore } from '@/lib/store'
  
const SearchBar = () => {
  const router = useRouter();
  const isSideNavbarOpen = useSideNavbarStore((state) => state.isSideNavbarOpen);
  const toggleSideNavbar = useSideNavbarStore((state) => state.toggleSideNavbar); 

  const form = useForm<z.infer<typeof SearchValidation>>({
    resolver: zodResolver(SearchValidation),
  });

  const onSubmit = async (values: z.infer<typeof SearchValidation>) => {
    if (isSideNavbarOpen) {
      toggleSideNavbar();
    }
    router.push(`/search?q=${encodeURIComponent(values.searchString)}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex border border-black rounded-sm'>
        <FormField
          control={form.control}
          name="searchString"
          render={({ field }) => (
            <FormItem className='w-full'>
              <input 
                type='text' 
                placeholder='Search here...' 
                className='p-3 focus:outline-none w-full max-md:p-2 max-md:text-sm'
                {...field}
              />
            </FormItem>
          )}
        />
        <button 
          type='submit'
          className='bg-primary-500 py-3 px-4 hover:bg-primary-800 transition-all'
        >
          <svg fill="white" className='max-md:h-3 max-md:w-3' height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4">
            <g>
              <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
                s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
                M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
            </g>
          </svg>
        </button>
      </form>
    </Form>
  )
}

export default SearchBar