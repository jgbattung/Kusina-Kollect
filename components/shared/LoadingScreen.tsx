"use client"

import { useLoadingStore } from "@/lib/store"
import { FullPageLoading } from "../utils/FullPageLoading";


const LoadingScreen = () => {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <FullPageLoading />
        </div>
      )}
    </>
  )
};

export default LoadingScreen;