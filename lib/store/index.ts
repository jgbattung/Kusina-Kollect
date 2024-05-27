import { create } from 'zustand'

type LoadingState = {
  isLoading: boolean;
}

type LoadingAction = {
  setIsLoading:(isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState & LoadingAction>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

// side navbar state

type SideNavbarState = {
  isSideNavbarOpen: boolean;
}

type SideNavbarAction = {
  toggleSideNavbar: () => void;
}

const useSideNavbarStore = create<SideNavbarState & SideNavbarAction>((set) => ({
  isSideNavbarOpen: false,
  toggleSideNavbar: () => set((state) => ({ isSideNavbarOpen: !state.isSideNavbarOpen }))
}))

export { useLoadingStore, useSideNavbarStore };