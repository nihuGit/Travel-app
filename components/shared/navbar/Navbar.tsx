import { SafeUser } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import UserMenu from './UserMenu';
import Categories from './Categories';
import Search from './Search';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className='fixed z-10 bg-white shadow-sm w-full'>
      <div className='py-4 border-b'>
        <div className='main-container'>
          {/* Mobile-specific logo: Centered above the search bar */}
          <div className='block md:hidden flex justify-center mb-4'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='Airbnb Logo'
                width={80}
                height={80}
                className='object-contain cursor-pointer'
              />
            </Link>
          </div>

          {/* Flex container for search and user menu - Same row for all screens */}
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            {/* Desktop logo remains in the same place */}
            <div className='hidden md:block'>
              <Link href='/'>
                <Image
                  src='/images/logo.png'
                  alt='Airbnb Logo'
                  width={100}
                  height={100}
                  className='object-contain cursor-pointer'
                />
              </Link>
            </div>

            <Search />
            
            <div className='relative'>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
