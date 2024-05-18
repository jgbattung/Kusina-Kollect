import React from 'react'
import SearchBar from '../forms/SearchBar'

function SearchDiv() {
  return (
    <div className='flex gap-10 border border-black px-4 py-8 my-20 w-3/4 justify-center max-xl:w-11/12 max-md:flex-col'>
      <div className='flex flex-col basis-1/2 gap-2'>
        <p className='font-bold text-xl'>What would you like to cook?</p>
        <SearchBar />
      </div>

      <div className='flex flex-col basis-1/2 items-start gap-2'>
        <p className='font-bold text-sm'>Popular Searches</p>
        <div className='flex flex-wrap gap-3'>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Chicken</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Pork</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Lunch</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Dinner</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Pampanga</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Chicken</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Bulacan</p>
          </button>
          <button className='rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all'>
            <p className='text-white text-center font-bold text-sm'>Lunch</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchDiv