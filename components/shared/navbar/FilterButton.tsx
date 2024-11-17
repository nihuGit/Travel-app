'use client';

import { FaFilter } from 'react-icons/fa';
import { useFilterModal } from '@/hooks/useFilterModal'; // Zustand store for modal

const FilterButton = () => {
  const filterModal = useFilterModal(); // Access Zustand's modal state

  return (
    <button
      className="rounded-full md:rounded-xl p-3 bg-white shadow-md cursor-pointer border border-gray-300 flex items-center justify-center
                 md:px-6 md:py-4 md:border-rose-500 md:hover:shadow-lg transition duration-300"
      onClick={filterModal.openModal} // Directly triggers the modal open function
    >
      <FaFilter
        size={22}
        className="text-rose-500 md:mr-2" // Add margin on medium screens and above
      />
      <span className="hidden md:inline text-sm md:text-base font-medium text-gray-700">
        Filters
      </span>
    </button>
  );
};

export default FilterButton;
