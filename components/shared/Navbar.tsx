'use client';

import { BiSearch } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRegisterModal } from '@/hooks/useRegisterModal';

const Navbar = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='main-container flex-between gap-3 md:gap-0 py-4 fixed z-10 shadow-sm bg-white border-b'>
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
        <div className='flex-center gap-3'>
          <p className='hidden md:block text-medium-base cursor-pointer'>
            Airbnb your home
          </p>
          <div
            className='user-menu'
            onClick={() => setIsOpen((value) => !value)}
          >
            <AiOutlineMenu size={18} />
            <div className='hidden md:block relative w-7 h-7'>
              <Image
                src='/images/placeholder.jpg'
                alt='Profile'
                fill
                className='rounded-full'
              />
            </div>
            {isOpen && (
              <div className='user-menu-card'>
                <div
                  className='user-menu-card-item'
                  onClick={registerModal.onOpen}
                >
                  Sign Up
                </div>
                <div className='user-menu-card-item'>Log In</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
