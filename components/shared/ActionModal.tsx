"use client"

import { ActionStatus } from "@/app/constants/actionModal";
import { useActionModalStore } from "@/lib/store";
import { useEffect } from "react";

const ActionModal = () => {
  const { showModal, modalStatus, modalMessage, closeModal } = useActionModalStore();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 20000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showModal, closeModal]);

  const getBgColor = () => {
    switch (modalStatus) {
      case ActionStatus.SUCCESS:
        return 'bg-green-200';
      case ActionStatus.FAIL:
        return 'bg-red-200';
      case ActionStatus.MESSAGE:
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className={`w-100 fixed bottom-5 left-5 border border-gray-400 rounded-xl px-6 py-4 ${getBgColor()}`}>
      <div className="flex items-center justify-between gap-1">
        <p>{modalMessage}</p>
        <button onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ActionModal