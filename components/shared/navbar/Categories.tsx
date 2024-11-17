'use client';

import { useRef, useEffect } from 'react';
import { categories } from '@/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import CategoryBox from '../CategoryBox';

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get('category');
  const isMainPage = pathname === '/';
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  // Exit early if not on the main page
  if (!isMainPage) {
    return null;
  }

  // Handle scroll events
  const handleScroll = () => {
    if (!categoriesRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;

    // Arrow buttons and scroll checks removed
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = categoriesRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      {/* Categories Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          scrollBehavior: 'smooth',
        }}
        className="main-container flex-between w-full py-2 mx-0 px-0 overflow-x-auto gap-2 md:gap-6"
        ref={categoriesRef}
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
