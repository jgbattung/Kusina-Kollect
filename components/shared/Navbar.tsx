"use client"

import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { navbarRoutes } from "@/app/constants"
import { usePathname } from "next/navigation"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { fetchUser } from "@/lib/actions/user.actions"

function Navbar() {
  const currentPathname = usePathname();
  const { user } = useUser();
  const [userImage, setUserImage] = useState('/assets/profile-icon-default.png')

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await fetchUser(user.id);
          setUserImage(userData.image);
        } catch (error: any) {
          throw new Error(`Failed to fetch user data: ${error.message}`)
        }
      }
    };

    fetchUserData();
  }, [user]);

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
        <SignedIn>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Image 
                      src={userImage}
                      alt="Profile icon"
                      width={25}
                      height={25}
                    />
                    <p className="max-md:hidden">My Account</p>
                    <span className="text-xs font-light">▼</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <ul className="min-w-52 bg-white text-sm font-medium ">
                      <Link href="/profile">
                        <li className="p-4 hover:bg-accent-500">
                          My Profile
                        </li>
                      </Link>
                      <Link href="/add-recipe">
                        <li className="p-4 hover:bg-accent-500">
                          Add a recipe
                        </li>
                      </Link>
                      <SignOutButton>
                        <li className="p-4 hover:bg-accent-500">
                          Log out
                        </li>
                      </SignOutButton>
                    </ul>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SignedIn>
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
          <Link href='/add-recipe'><span className="nav-links text-primary-800 underline-custom">SUBMIT A RECIPE</span></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar