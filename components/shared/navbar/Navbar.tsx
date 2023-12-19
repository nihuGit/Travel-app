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
