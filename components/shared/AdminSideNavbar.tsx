"use client"

import Link from "next/link"
import Image from "next/image"
import { adminRoutes } from "@/app/constants"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"


function AdminSideNavbar() {
  const currentPathname = usePathname();

  return (
    <div className="sticky left-0 top-0 z-20 h-screen flex flex-col w-fit px-8 pt-10 gap-10">
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
      <div className="flex py-5 w-full items-center justify-start">
        <div className="flex gap-6 border border-gray-100 bg-gray-100 rounded-xl px-6 py-3">
          <Link href="/">
            <svg className="hover:fill-primary-800 transition-all" fill="#000" width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.772 16.043l-15.012-15.724c-0.189-0.197-0.449-0.307-0.721-0.307s-0.533 0.111-0.722 0.307l-15.089 15.724c-0.383 0.398-0.369 1.031 0.029 1.414 0.399 0.382 1.031 0.371 1.414-0.029l1.344-1.401v14.963c0 0.552 0.448 1 1 1h6.986c0.551 0 0.998-0.445 1-0.997l0.031-9.989h7.969v9.986c0 0.552 0.448 1 1 1h6.983c0.552 0 1-0.448 1-1v-14.968l1.343 1.407c0.197 0.204 0.459 0.308 0.722 0.308 0.249 0 0.499-0.092 0.692-0.279 0.398-0.382 0.411-1.015 0.029-1.413zM26.985 14.213v15.776h-4.983v-9.986c0-0.552-0.448-1-1-1h-9.965c-0.551 0-0.998 0.445-1 0.997l-0.031 9.989h-4.989v-15.777c0-0.082-0.013-0.162-0.032-0.239l11.055-11.52 10.982 11.507c-0.021 0.081-0.036 0.165-0.036 0.252z"></path>
            </svg>
          </Link>
          <SignOutButton>
            <svg className="hover:fill-primary-800" height="22px" width="22px" version="1.1" id="XMLID_173_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
              <g id="logout">
                <g>
                  <path d="M15,24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4,18.7L17,17.3l3.3-3.3H5v-2h15.3L17,8.7l1.4-1.4L24,13L18.4,18.7z"/>
                </g>
              </g>
            </svg>
          </SignOutButton>
        </div>
      </div>
    </div>
  )
}

export default AdminSideNavbar