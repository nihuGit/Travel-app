'use client';

import Image from 'next/image';

interface AvatarProps {
  image?: string | null | undefined;
}
const Avatar = ({ image }: AvatarProps) => {
  return (
    <Image
      src={image || '/images/placeholder.jpg'}
      alt='Profile'
      fill
      className='rounded-full'
    />
  );
};

export default Avatar;
