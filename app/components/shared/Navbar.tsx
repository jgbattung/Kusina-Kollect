"use client"

import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { navbarRoutes } from "@/app/constants"
import { usePathname } from "next/navigation"

function Navbar() {
  const currentPathname = usePathname();

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
      <nav className="max-lg:hidden pt-2 flex flex-1 items-center justify-evenly">
        <div>
          <ul className="flex flex-1 items-center justify-evenly nav-links gap-20">
            {navbarRoutes.map((route) => {
              const isActive = 
              (currentPathname.includes(route.path) && route.path.length > 1) ||
              currentPathname === route.path

              return (
                <li key={route.name}>
                  <Link href={route.path} className={`underline-custom ${isActive ? 'underline-active': ''}`}>{route.name.toUpperCase()}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <Link href='/'><span className="nav-links text-primary-800 underline-custom">SUBMIT A RECIPE</span></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar