'use client';
import { SafeUser } from '@/types';
import Heading from '@/components/shared/Heading';
import useCountries from '@/hooks/useCountries';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  id: string;
  title: string;
  image: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  id,
  title,
  image,
  locationValue,
  currentUser,
}: ListingHeadProps) => {
  const { getCountry } = useCountries();
  const location = getCountry(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location.region}, ${location.label}`}
      />
      <div className='relative w-full h-[60vh] overflow-hidden transition cursor-pointer rounded-xl'>
        <Image src={image} alt='Listing' fill className='object-cover w-full' />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
