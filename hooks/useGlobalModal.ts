import { useState } from 'react';

const useGlobalModal = () => {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  const openModal = () => setIsAnyModalOpen(true);
  const closeModal = () => setIsAnyModalOpen(false);

  return {
    isAnyModalOpen,
    openModal,
    closeModal,
  };
};

export default useGlobalModal;
