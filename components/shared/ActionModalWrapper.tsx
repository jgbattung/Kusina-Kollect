"use client"

import { useActionModalStore } from '@/lib/store'
import React from 'react'
import ActionModal from './ActionModal';

const ActionModalWrapper = () => {
  const { showModal } = useActionModalStore();

  if (!showModal) {
    return null;
  };

  return (
    <ActionModal />
  )
};

export default ActionModalWrapper