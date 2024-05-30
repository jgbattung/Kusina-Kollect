"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getRecipesBySearch } from '@/lib/actions/recipe.actions';
import RecipeCard from '@/components/cards/RecipeCard';
import SearchBar from '@/components/forms/SearchBar';

interface RecipeProps {
  _id: string;
  images: string[];
  name: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState<RecipeProps[]>([]);

  console.log(query)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const recipes = await getRecipesBySearch(query);
          setSearchResults(recipes);
        } catch (error) {
          throw new Error(`Error fetching search results: ${error}`);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className='page-container w-full'>
      <div className='flex flex-col gap-3 mb-14 w-1/2 max-md:w-3/4'>
        <p className={`font-bold text-lg ${query === null && 'hidden'}`}>Search results for <span className='text-primary-800'>{query}</span></p>
        <SearchBar />
      </div>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-3 gap-12 max-2xl:gap-8 max-xl:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
          {searchResults.map((recipe) => (
            <div key={recipe._id}>
              <RecipeCard 
                id={recipe._id}
                name={recipe.name}
                images={recipe.images}
                category={query || undefined}
              />
            </div>
          ))}
        </div>
      ) : query === null ? (
        <div className='flex flex-col gap-3 items-center justify-center mx-6 text-center'>
          <p className='font-bold text-3xl'>Discover recipes by searching for ingredients, dish names, or cuisines.</p>
          <p>Enter a search term in the box below to find your favorite recipes or explore new ones.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-3 items-center justify-center mx-6 text-center'>
          <p className='font-bold text-3xl'>{"We couldn't find any results for "}<span className='text-primary-800'>{`${query}`}.</span></p>
          <p>{"Try searching for a more general term or explore our recipe categories."}</p>
        </div>
      )}
    </div>
  )
}

export default Page