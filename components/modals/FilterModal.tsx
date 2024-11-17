'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/components/modals/Modal';
import { useFilterModal } from '@/hooks/useFilterModal';

interface Filters {
  priceRange: number[];
  categories: string[];
}

const FilterModal: React.FC = () => {
  const { isOpen, closeModal } = useFilterModal(); // Access modal state
  const [showModal, setShowModal] = useState(false); // Animation state
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
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
    let validatedMinPrice = minPrice;
    let validatedMaxPrice = maxPrice;

    // Validate price range before submission
    if (minPrice >= maxPrice) {
      validatedMinPrice = maxPrice - 10; // Adjust min price
      validatedMaxPrice = minPrice + 10; // Adjust max price
    }

    const filters: Filters = {
      priceRange: [validatedMinPrice, validatedMaxPrice],
      categories: selectedCategories,
    };

    console.log('Filters submitted:', filters); // Replace with real filter logic
    closeModal(); // Close modal
  };

  const categories = ['Hotel', 'Restaurant', 'Travel Spot', 'Airbnb'];

  const modalBody = (
    <div className="flex flex-col gap-6">
      {/* Price Sliders */}
      <div>
        <p className="text-lg font-medium mb-2">Select Price Range</p>
        <div className="flex flex-col gap-6">
          {/* Minimum Price Slider */}
          <div>
            <p className="text-sm font-medium mb-1">Min Price</p>
            <Slider
              value={[minPrice]}
              onValueChange={(value) => setMinPrice(value[0])}
              max={1000} // Allow independent control
              step={10}
              className="w-full h-6"
            />
            <p className="text-sm text-gray-500 mt-2">${minPrice}</p>
          </div>
          {/* Maximum Price Slider */}
          <div>
            <p className="text-sm font-medium mb-1">Max Price</p>
            <Slider
              value={[maxPrice]}
              onValueChange={(value) => setMaxPrice(value[0])}
              min={0} // Allow independent control
              max={1000}
              step={10}
              className="w-full h-6"
            />
            <p className="text-sm text-gray-500 mt-2">${maxPrice}</p>
          </div>
        </div>
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
