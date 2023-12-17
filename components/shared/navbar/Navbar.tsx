import { BiSearch } from 'react-icons/bi';
import { SafeUser } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import UserMenu from './UserMenu';
import Categories from './Categories';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className='fixed z-10 bg-white shadow-sm w-full'>
      <div className='py-4 border-b'>
        <div className='main-container'>
          <div className='flex-between gap-3 md:gap-0'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='Airbnb Logo'
                width={100}
                height={100}
                className='object-contain cursor-pointer hidden md:block'
              />
            </Link>
            <div className='main-search'>
              <div className='flex-between'>
                <p className='text-medium-small px-6'>Anywhere</p>
                <div className='hidden sm:block border-x-[1px] text-medium-small px-6 border-x-neutral-200'>
                  Any time
                </div>
                <div className='flex-center pl-6 pr-2 gap-4'>
                  <p className='text-gray-600 text-medium-small hidden sm:block'>
                    Add guests
                  </p>
                  <div className='flex-center rounded-full bg-rose-500 p-2 text-white font-bold'>
                    <BiSearch size={18} />
                  </div>
                </div>
              </div>
            </div>
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
