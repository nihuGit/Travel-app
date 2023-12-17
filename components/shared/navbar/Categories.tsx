'use client';
import { categories } from '@/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import CategoryBox from '../CategoryBox';

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get('category');
  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }
  return (
    <div className='main-container last:flex-between gap-4 w-full pt-6 overflow-x-auto'>
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
