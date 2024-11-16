'use client';

import { FaFilter } from 'react-icons/fa';
import { useFilterModal } from '@/hooks/useFilterModal'; // Zustand store for modal

const FilterButton = () => {
  const filterModal = useFilterModal(); // Access Zustand's modal state

  return (
    <div
      className="rounded-full p-3 bg-white shadow-md cursor-pointer border border-gray-300 flex items-center justify-center"
      onClick={filterModal.openModal} // Directly triggers the modal open function
    >
      <FaFilter size={22} className="text-rose-500" />
    </div>
  );
};

export default FilterButton;
