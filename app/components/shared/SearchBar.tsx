import React from 'react'

function SearchBar() {
  return (
    <form>
      <div>
        <input type='text' placeholder='Find a recipe or ingredient' className='p-3 border rounded-sm' />
      </div>
    </form>
  )
}

export default SearchBar