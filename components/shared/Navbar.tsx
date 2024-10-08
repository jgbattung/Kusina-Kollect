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
import { useLoadingStore, useSideNavbarStore } from "@/lib/store"

function Navbar() {
  const currentPathname = usePathname();
  const { user } = useUser();
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [userImage, setUserImage] = useState('/assets/profile-icon-default.png')
  const { setIsLoading } = useLoadingStore();
  const isSideNavbarOpen = useSideNavbarStore((state) => state.isSideNavbarOpen);
  const toggleSideNavbar = useSideNavbarStore((state) => state.toggleSideNavbar); 

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
    <header className="top-0 left-0 right-0 flex flex-col border-b border-gray-200 bg-white py-5 shadow-sm max-md:py-2">
      <div className={`flex flex-1 items-center justify-evenly ${isSideNavbarOpen ? 'max-md:justify-start' : 'max-md:justify-between'} max-md:mx-6 gap-2`}>
        <div className="md:hidden">
          <button onClick={toggleSideNavbar}>
            <div>
              {isSideNavbarOpen ? (
                <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5L5 19M5.00001 5L19 19" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ) : (
                <svg width="19px" height="19px" viewBox="0 0 12 12" enableBackground="new 0 0 12 12" id="Слой_1" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect fill="#333333" height="1" width="11" x="0.5" y="5.5"/>
                    <rect fill="#333333" height="1" width="11" x="0.5" y="2.5"/>
                    <rect fill="#333333" height="1" width="11" x="0.5" y="8.5"/>
                  </g>
                </svg>
              )}
            </div>
          </button>
        </div>
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            width={300}
            height={300}
            className="max-sm:max-w-30 max-md:max-w-52 max-lg:max-w-70"
          />
        </Link>
        <div className="flex items-center justify-center gap-7 max-md:hidden w-1/3">
          <SearchBar />
          <div className={`${user && 'hidden'}`}>
            <Link
                href={'/sign-in'}
                className="flex items-center gap-2 underline-custom text-sm"
              >
              <Image 
                src={'/assets/users-icon.png'}
                alt="Profile icon"
                width={25}
                height={25}
              />
              <p>Login</p>
            </Link>
          </div>
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
        <div className={`md:hidden flex gap-2 items-center ${isSideNavbarOpen && 'hidden'}`}>
          <div className="flex gap-2 items-center">
            <Link href="/search">
              <svg fill="#333333" height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4" className="hover:fill-primary-800">
                <g>
                  <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
                    s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
                    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
                </g>
              </svg>
            </Link>
            <div className={`${user && 'hidden'}`}>
              <p className="text-gray-400">|</p>
              <Link
                  href={'/sign-in'}
                  className="flex items-center gap-2 underline-custom text-sm"
                >
                <Image 
                  src={'/assets/users-icon.png'}
                  alt="Profile icon"
                  width={25}
                  height={25}
                />
                <p>Login</p>
              </Link>
            </div>
          </div>
          <SignedIn>
            <p className="text-gray-400">|</p>
          </SignedIn>
          <div>
            <SignedIn>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center justify-center">
                      <Link href="/profile">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={userImage}
                            alt="Profile icon"
                            width={18}
                            height={18}
                          />
                          <p className="font-light text-sm">Account</p>
                        </div>
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink asChild>
                        <ul className=" min-w-60 bg-white text-sm font-medium">
                          <Link href="/profile">
                            <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
                              My Profile
                            </li>
                          </Link>
                          <Link href="/add-recipe">
                            <li className="p-4 hover:bg-accent-500" onClick={() => setIsLoading(true)}>
                              Add a Recipe
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
          </div>
        </div>
      </div>
      {/* nav links */}
      <nav className="max-md:hidden pt-2 flex flex-1 items-center justify-evenly">
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
        <div className="max-lg:hidden">
          <Link onClick={() => setIsLoading(true)} href='/add-recipe'><span className="nav-links text-primary-800 underline-custom">SUBMIT A RECIPE</span></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar