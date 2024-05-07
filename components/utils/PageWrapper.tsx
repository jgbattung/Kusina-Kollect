"use client"

import { useLoadingStore } from "@/lib/store"
import React, { useEffect } from "react"

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children } ) => {
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>{children}</div>
  )
}

export default PageWrapper