'use client';
import { SafeUser } from '@/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavourite from '@/hooks/useFavourite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { isFavourite, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavourite}
      className='relative hover:opacity-70 cursor-pointer transition'
    >
      <AiOutlineHeart
        size={28}
        className='absolute fill-white -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={isFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
