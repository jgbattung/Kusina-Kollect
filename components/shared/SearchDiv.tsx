import React from 'react'
import SearchBar from '../forms/SearchBar'
import Link from 'next/link';

function SearchDiv() {
  const popularSearches = [
    { name: 'Chicken', path: '/ingredients/chicken' },
    { name: 'Pork', path: '/ingredients/pork' },
    { name: 'Lunch', path: '/meals/lunch' },
    { name: 'Dinner', path: '/meals/dinner' },
    { name: 'Pampanga', path: '/cuisines/pampanga' },
    { name: 'Bulacan', path: '/cuisines/bulacan' },
    { name: 'Breakfast', path: '/meals/breakfast' },
  ];

  return (
    <div className='flex gap-10 border border-black px-4 py-8 my-20 w-3/4 justify-center max-xl:w-11/12 max-md:flex-col'>
      <div className='flex flex-col basis-1/2 gap-2'>
        <p className='font-bold text-xl'>What would you like to cook?</p>
        <SearchBar />
      </div>

      <div className='flex flex-col basis-1/2 items-start gap-2'>
        <p className='font-bold text-sm'>Popular Searches</p>
        <div className='flex flex-wrap gap-3'>
          {popularSearches.map((search) => (
            <Link 
              key={search.name}
              href={search.path}
              className="rounded-lg py-2 px-4 bg-primary-500 hover:bg-primary-800 transition-all"
            >
              <p className="text-white text-center font-bold text-sm">{search.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchDiv