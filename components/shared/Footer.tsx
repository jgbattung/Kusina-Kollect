"use client"

import { navbarRoutes } from "@/app/constants"
import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useActionModalStore } from "@/lib/store"
import { ActionStatus } from "@/app/constants/actionModal"

function Footer() {
  const { openModal } = useActionModalStore();

  const handleSubscribe = () => {
    openModal(ActionStatus.MESSAGE, 'You are now subscribed to our newsletter.')
  };

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
        <div>
          <ul className="grid grid-cols-3 items-left max-sm:items-center gap-3 nav-links">
            {navbarRoutes.map((routes) => (
              <li key={routes.name}>
                <Link href={routes.path} className="hover:underline hover:text-primary-800">{routes.name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 pb-3 max-md:items-center">
          <p className="text-sm">Subscribe to our newsletter</p>
          <div className="flex gap-3 max-md:flex-col">
            <Input required type="text" placeholder="Enter email address" className="p-2 text-sm placeholder:text-gray-400" />
            <Button
              onClick={handleSubscribe}
              type="submit"
              className="bg-complementary-500 hover:bg-complementary-800 rounded-2xl py-2 px-3 text-light-200 text-xs"
            >
              Subscribe
            </Button>
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