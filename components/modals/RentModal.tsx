'use client';
import { useRentModal } from '@/hooks/useRentModal';
import { useMemo, useState } from 'react';
import { categories } from '@/constants';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createListing } from '@/lib/actions/listing.actions';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Modal from './Modal';
import Heading from '../ui/Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModal = useRentModal();
  const router = useRouter();

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      image: '',
      bedrooms: 1,
      bathrooms: 1,
      guests: 1,
      price: 1,
      location: null,
      category: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guests = watch('guests');
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const image = watch('image');

  const Map = useMemo(
    () => dynamic(() => import('../shared/Map'), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onPrev = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    try {
      console.log('Data', data);
      await createListing(data);
      reset();
      router.refresh();
      toast.success('Listing created!');
      rentModal.onClose();
      setStep(STEPS.CATEGORY);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto px-4'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(location) => setCustomValue('location', location)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have'
        />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guests}
          onChange={(guests) => setCustomValue('guests', guests)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={bedrooms}
          onChange={(bedrooms) => setCustomValue('bedrooms', bedrooms)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathrooms}
          onChange={(bathrooms) => setCustomValue('bathrooms', bathrooms)}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          value={image}
          onChange={(image) => setCustomValue('image', image)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          errors={errors}
          register={register}
        />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          errors={errors}
          register={register}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          type='number'
          errors={errors}
          register={register}
          disabled={isLoading}
          formatPrice
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Airbnb your home'
      body={bodyContent}
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onPrev}
    />
  );
};

export default RentModal;
