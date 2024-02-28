import Image from "next/image"

function Footer() {
  return (
    <footer className="flex flex-col bg-gray-100 border-t border-gray-200 shadow-md items-center pt-12 pb-5 max-md:pt-6">
      <div className="flex items-center justify-evenly w-full gap-3 max-md:flex-col">
        <div>
          <Image 
            src='/assets/logo.png'
            alt='logo footer'
            width={200}
            height={200}
          />
        </div>
        <div className="pb-3">
          <ul className="grid grid-cols-2 items-left gap-5 text-sm font-semibold">
            <li>Meals</li>
            <li>Cuisines</li>
            <li>Ingredients</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 pb-3 max-md:items-center">
          <p className="text-sm">Contact Us</p>
          <div className="flex gap-2 max-md:flex-col">
            <input type="text" placeholder="Enter email address" className="p-1 text-sm" />
            <button type="submit" className="bg-complementary-500 rounded-2xl py-1 px-2 text-light-200">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="w-3/5 max-sm:w-3/4 border-t border-gray-400 my-2"></div>
      <div>
        <p className="text-xs font-light">©2024 Jireh Battung · All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer