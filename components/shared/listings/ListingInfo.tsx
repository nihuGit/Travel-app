'use client';

import { SafeUser } from '@/types';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import useCountries from '@/hooks/useCountries';
import dynamic from 'next/dynamic';

interface ListingInfoProps {
  user: SafeUser | null;
  roomsCount: number;
  bathroomsCount: number;
  guestsCount: number;
  description: string;
  location: string;
  category: { label: string; description: string; icon: IconType } | undefined;
}

const ListingInfo = ({
  user,
  roomsCount,
  bathroomsCount,
  guestsCount,
  description,
  category,
  location,
}: ListingInfoProps) => {
  const { getCountry } = useCountries();
  const coordinates = getCountry(location)?.latlng;
  const Map = dynamic(() => import('../Map'), { ssr: false });
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <p className='text-xl font-semibold text-neutral-800'>
            Hosted by {user?.name}
          </p>
          <Avatar image={user?.image} />
        </div>
        <div className='flex items-center gap-4 font-light text-neutral-500'>
          <p>{roomsCount} Rooms</p>
          <p>{bathroomsCount} Bathrooms</p>
          <p>{guestsCount} Guests</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={category.label}
          description={category.description}
          icon={category.icon}
        />
      )}
      <hr />
      <p className='text-lg font-light text-neutral-500'>{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
