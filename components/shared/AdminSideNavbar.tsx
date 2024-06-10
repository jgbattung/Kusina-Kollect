"use client"

import Link from "next/link"
import Image from "next/image"
import { adminRoutes } from "@/app/constants"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"


function AdminSideNavbar() {
  const currentPathname = usePathname();

  return (
    <div className="sticky left-0 top-0 z-20 h-screen flex flex-col w-fit px-8 pt-6 gap-10">
      <div>
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            width={250}
            height={250}
            className="max-sm:max-w-30 max-md:max-w-52 max-lg:max-w-70"
          />
        </Link>
      </div>
      <div className="flex w-full flex-1 flex-col gap-6">
        {adminRoutes.map((route) => {
          const isActive = (currentPathname.includes(route.path) && route.path.length > 1) || currentPathname === route.path

          return (
            <Link
              href={route.path}
              key={route.name}
              className={`relative justify-start px-4 py-2 ${isActive && 'bg-accent-500 font-medium rounded-xl'}`}
            >
              <p>{route.name}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminSideNavbar