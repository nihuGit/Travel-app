import { create } from 'zustand';

interface FilterModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useFilterModal = create<FilterModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));


