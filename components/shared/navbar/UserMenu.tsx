'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useLoginModal } from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { SafeUser } from '@/types';
import Avatar from '../Avatar';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex-center gap-3'>
      <p className='hidden md:block text-medium-base cursor-pointer'>
        Airbnb your home
      </p>

      <div className='user-menu' onClick={() => setIsOpen((value) => !value)}>
        <AiOutlineMenu size={18} />
        <div className='hidden md:block relative w-7 h-7'>
          <Avatar />
        </div>
        {isOpen && (
          <div className='user-menu-card'>
            {!currentUser ? (
              <>
                <div
                  className='user-menu-card-item'
                  onClick={registerModal.onOpen}
                >
                  Sign Up
                </div>
                <div
                  className='user-menu-card-item'
                  onClick={loginModal.onOpen}
                >
                  Log In
                </div>{' '}
              </>
            ) : (
              <>
                <div className='user-menu-card-item' onClick={() => {}}>
                  My trips
                </div>
                <div className='user-menu-card-item' onClick={() => {}}>
                  My favourites
                </div>
                <div className='user-menu-card-item' onClick={() => {}}>
                  My reservations
                </div>
                <div className='user-menu-card-item' onClick={() => {}}>
                  My properties
                </div>
                <div className='user-menu-card-item' onClick={() => {}}>
                  Airbnb my home
                </div>
                <hr />
                <div className='user-menu-card-item' onClick={() => signOut()}>
                  Logout
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
