"use client"

import { navbarRoutes } from '@/app/constants';
import { useSideNavbarStore } from '@/lib/store'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SearchBar from '../forms/SearchBar';
import { SignedIn, useUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import Image from 'next/image';

function SideNavbar() {
  const { user } = useUser();
  const isSideNavbarOpen = useSideNavbarStore((state) => state.isSideNavbarOpen);
  const toggleSideNavbar = useSideNavbarStore((state) => state.toggleSideNavbar);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userImage, setUserImage] = useState('/assets/profile-icon-default.png'); 

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

  useEffect(() => {
    if (isSideNavbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSideNavbarOpen])

  if (!isSideNavbarOpen) {
    return null;
  };

  return (
    <div className='w-full max-w-full z-40 h-screen pt-5'>
      <nav className='flex flex-col gap-4'>
        <div className='flex flex-col gap-8 px-5'>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-xs'>Search</p>
            <SearchBar />
          </div>
          <div>
            <ul className='flex flex-col'>
              {navbarRoutes.map((route) => (
                <li key={route.name} onClick={toggleSideNavbar} className='flex flex-col border-b border-gray-300 py-4 last:border-0'>
                  <Link href={route.path}>
                    <p className='text-xs font-bold tracking-wider'>{route.name.toUpperCase()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='w-full border border-black'></div>
        <SignedIn>
          <div className='px-5 flex flex-col gap-5'>
            <Link href="/profile" onClick={toggleSideNavbar}>
              <div className='flex gap-2 items-center'>
                <Image 
                  src={userImage}
                  alt="Profile icon"
                  width={20}
                  height={20}
                />
                <p className='text-sm tracking-wider'>My Account</p>
              </div>
            </Link>
            <Link href='/add-recipe' onClick={toggleSideNavbar}>
              <p className='text-sm font-semibold tracking-wider text-primary-800'>SUBMIT A RECIPE</p>
            </Link>
            {userIsAdmin && (
              <Link href='/admin-panel' onClick={toggleSideNavbar}>
                <p className='text-sm tracking-wider'>Admin Panel</p>
              </Link>
            )}
          </div>
        </SignedIn>
      </nav>
    </div>
  )
}

export default SideNavbar