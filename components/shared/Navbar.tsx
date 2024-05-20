"use client"

import Image from "next/image"
import Link from "next/link"
import SearchBar from "../forms/SearchBar"
import { navbarRoutes } from "@/app/constants"
import { usePathname } from "next/navigation"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { fetchUser } from "@/lib/actions/user.actions"
import { useLoadingStore } from "@/lib/store"

function Navbar() {
  const currentPathname = usePathname();
  const { user } = useUser();
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [userImage, setUserImage] = useState('/assets/profile-icon-default.png')
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await fetchUser(user.id);
          if (userData.image) {
            setUserImage(userData.image);
          }
          if (userData.isAdmin) {
            setUserIsAdmin(true);
          }
        } catch (error: any) {
          throw new Error(`Failed to fetch user data: ${error.message}`)
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <header className="top-0 left-0 right-0 flex flex-col border-b border-gray-200 py-5 shadow-sm max-md:py-2">
      <div className="flex flex-1 items-center justify-evenly max-md:justify-between max-md:mx-6">
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            width={300}
            height={300}
            className="max-md:max-w-40 max-lg:max-w-70"
          />
        </Link>
        <div className="max-md:hidden w-1/3">
          <SearchBar />
        </div>
        <SignedIn>
          <NavigationMenu className="max-md:hidden">
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
                        <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
                          My Profile
                        </li>
                      </Link>
                      <Link href="/add-recipe">
                        <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
                          Add a recipe
                        </li>
                      </Link>
                      {userIsAdmin && (
                        <Link href="/admin-panel">
                          <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
                            Admin Panel
                          </li>
                        </Link>
                      )}
                      <SignOutButton>
                        <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
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
        {/* mobile */}
        <div className="md:hidden flex gap-2 items-center">
          <div>
            <svg fill="#333333" height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4">
              <g>
                <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
                  s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
                  M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
              </g>
            </svg>
          </div>
          <p className="text-gray-400">|</p>
          <div>
            <SignedIn>
              <div className="flex items-center gap-2">
                <Image 
                  src={userImage}
                  alt="Profile icon"
                  width={14}
                  height={14}
                />
                <p className="font-light text-xs">My Account</p>
              </div>
            </SignedIn>
          </div>
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
          <Link onClick={() => setIsLoading(true)} href='/add-recipe'><span className="nav-links text-primary-800 underline-custom">SUBMIT A RECIPE</span></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar