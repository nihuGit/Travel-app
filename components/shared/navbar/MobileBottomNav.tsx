'use client';
import { useState, useEffect } from 'react';
import { Home, Search, Heart, User } from 'lucide-react'; // Example icons
import Link from 'next/link';
import { useSearchModal } from '@/hooks/useSearchModal'; // Import Search Modal hook
import { useFilterModal } from '@/hooks/useFilterModal'; // Import Filter Modal hook

const MobileBottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const searchModal = useSearchModal(); // Access Search Modal state
  const filterModal = useFilterModal(); // Access Filter Modal state

  // Scroll detection to show/hide the bottom navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down, hide the menu
        setIsVisible(false);
      } else {
        // Scrolling up, show the menu
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md p-3 flex justify-around items-center transition-transform duration-300 ${
        isVisible && !searchModal.isOpen && !filterModal.isOpen ? 'translate-y-0' : 'translate-y-full'
      } md:hidden`} // Hide if any modal is open
    >
      <Link href='/'>
        <div className='flex flex-col items-center'>
          <Home className='w-6 h-6' />
          <span className='text-xs'>Home</span>
        </div>
      </Link>
      <Link href='/search'>
        <div className='flex flex-col items-center'>
          <Search className='w-6 h-6' />
          <span className='text-xs'>Search</span>
        </div>
      </Link>
      <Link href='/favorites'>
        <div className='flex flex-col items-center'>
          <Heart className='w-6 h-6' />
          <span className='text-xs'>Favorites</span>
        </div>
      </Link>
      <Link href='/profile'>
        <div className='flex flex-col items-center'>
          <User className='w-6 h-6' />
          <span className='text-xs'>Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
