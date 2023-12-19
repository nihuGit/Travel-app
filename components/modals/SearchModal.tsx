'use client';

import { useSearchModal } from '@/hooks/useSearchModal';
import { useMemo, useState } from 'react';
import { CountrySelectValue } from '@/types';
import { Range } from 'react-date-range';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import Modal from './Modal';
import Heading from '../shared/Heading';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import DatePicker from '../inputs/DatePicker';
import Counter from '../inputs/Counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [locationValue, setLocationValue] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [guestsCount, setGuestsCount] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [bathroomsCount, setBathroomsCount] = useState(1);
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const Map = useMemo(
    () => dynamic(() => import('../shared/Map'), { ssr: false }),
    [locationValue]
  );
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search';
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return 'Back';
  }, [step]);

  const onNext = () => setStep((value) => value + 1);
  const onPrev = () => setStep((value) => value - 1);

  const handleSubmit = async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery: any = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      bedrooms: roomsCount,
      bathrooms: bathroomsCount,
      guests: guestsCount,
      location: locationValue?.label,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wannna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={locationValue}
        onChange={(value) => setLocationValue(value as CountrySelectValue)}
      />
      <Map center={locationValue?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <DatePicker
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading title='More information' subtitle='Find your perfect place!' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestsCount}
          onChange={(value) => setGuestsCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomsCount}
          onChange={(value) => setRoomsCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomsCount}
          onChange={(value) => setBathroomsCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={() => (step === STEPS.LOCATION ? undefined : onPrev)}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default SearchModal;
