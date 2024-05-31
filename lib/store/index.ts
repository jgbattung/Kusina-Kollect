import { ActionStatus } from '@/app/constants/actionModal';
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
}));

// action modal state

type ActionModalState = {
  showModal: boolean;
  modalStatus: ActionStatus;
  modalMessage: string;
}

type ActionModalActions = {
  openModal: (status: ActionStatus, message: string) => void;
  closeModal: () => void;
}

const useActionModalStore = create<ActionModalState & ActionModalActions>((set) => ({
  showModal: false,
  modalStatus: ActionStatus.SUCCESS,
  modalMessage: '',
  openModal: (status: ActionStatus, message: string) => {
    set({ showModal: true, modalStatus: status, modalMessage: message });
  },
  closeModal: () => set({ showModal: false })
}))

export { useLoadingStore, useSideNavbarStore, useActionModalStore };