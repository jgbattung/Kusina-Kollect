import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"

function Navbar() {
  return (
    <header className="top-0 left-0 right-0 flex flex-col border-b border-gray-200 py-5 shadow-sm max-md:py-2">
      <div className="flex flex-1 items-center justify-evenly">
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            width={300}
            height={300}
          />
        </Link>
        <SearchBar />
        <div className="flex items-center gap-2">
          <Image 
            src="/assets/profile-icon-default.png"
            alt="Profile icon"
            width={25}
            height={25}
          />
          <p className="max-md:hidden">My Account</p>
        </div>
      </div>
      <div className="max-lg:hidden pt-2">
        <ul className="flex flex-1 items-center justify-evenly font-semibold">
          <li>Meals</li>
          <li>Cuisines</li>
          <li>Ingredients</li>
          <li>About Us</li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar