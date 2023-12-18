'use client';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useLoginModal } from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { SafeUser } from '@/types';
import { useRentModal } from '@/hooks/useRentModal';
import Avatar from '../Avatar';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  };
  return (
    <div className='flex-center gap-3'>
      <p
        className='hidden md:block text-medium-base cursor-pointer'
        onClick={handleClick}
      >
        Airbnb your home
      </p>

      <div className='user-menu' onClick={() => setIsOpen((value) => !value)}>
        <AiOutlineMenu size={18} />
        <div className='hidden md:block relative w-7 h-7'>
          <Avatar image={currentUser?.image} />
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
                <div
                  className='user-menu-card-item'
                  onClick={() => router.push('/trips')}
                >
                  My trips
                </div>
                <div
                  className='user-menu-card-item'
                  onClick={() => router.push('/favourites')}
                >
                  My favourites
                </div>
                <div
                  className='user-menu-card-item'
                  onClick={() => router.push('/reservations')}
                >
                  My reservations
                </div>
                <div
                  className='user-menu-card-item'
                  onClick={() => router.push('/properties')}
                >
                  My properties
                </div>
                <div className='user-menu-card-item' onClick={handleClick}>
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
