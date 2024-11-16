'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/components/modals/Modal';
import {useFilterModal} from '@/hooks/useFilterModal';

interface Filters {
  priceRange: number[];
  categories: string[];
}

const FilterModal: React.FC = () => {
  const { isOpen, closeModal } = useFilterModal(); // Access modal state
  const [showModal, setShowModal] = useState(false); // Animation state
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true); // Trigger animation
    } else {
      setShowModal(false); // Trigger close animation
    }
  }, [isOpen]);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, category] : prev.filter((item) => item !== category)
    );
  };

  const handleSubmit = () => {
    const filters: Filters = { priceRange, categories: selectedCategories };
    console.log('Filters submitted:', filters); // Replace with real filter logic
    closeModal(); // Close modal
  };

  const categories = ['Hotel', 'Restaurant', 'Travel Spot', 'Airbnb'];

  const modalBody = (
    <div className="flex flex-col gap-6">
      {/* Price Slider */}
      <div>
        <p className="text-lg font-medium mb-2">Select Price Range</p>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={50}
          className="w-full"
        />
        <p className="text-sm text-gray-500 mt-2">
          ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>

      {/* Category Filters */}
      <div>
        <p className="text-lg font-medium mb-2">Categories</p>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <Checkbox
                id={category}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, !!checked)
                }
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      title="Filters"
      actionLabel="Apply"
      body={modalBody}
    />
  );
};

export default FilterModal;
