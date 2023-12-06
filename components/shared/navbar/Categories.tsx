'use client';
import { categories } from '@/constants';
import { useSearchParams } from 'next/navigation';
import CategoryBox from '../CategoryBox';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  return (
    <div className='flex-between gap-4 w-full pt-6 overflow-x-auto'>
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category === item.label}
        />
      ))}
    </div>
  );
};

export default Categories;
