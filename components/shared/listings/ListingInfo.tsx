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
    <div className='col-span-4 flex-col-start gap-8'>
      <div className='flex-col-start gap-2'>
        <div className='flex items-center gap-2'>
          <p className='text-medium-extra'>Hosted by {user?.name}</p>
          <Avatar image={user?.image} />
        </div>
        <div className='flex items-center gap-4 text-light'>
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
      <p className='text-light-large'>{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
