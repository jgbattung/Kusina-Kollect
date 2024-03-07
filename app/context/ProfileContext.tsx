"use client"

import { createContext, useState } from "react";

export const ProfileContext = createContext({
  selectedTab: '',
  setSelectedTab: (tab: string) => {}
})

export const ProfileProvider = ({ children }: any) => {
  const [selectedTab, setSelectedTab] = useState('');

  return (
    <ProfileContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </ProfileContext.Provider>
  )
}