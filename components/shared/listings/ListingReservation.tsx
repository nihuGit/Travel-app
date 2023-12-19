'use client';

import { Range } from 'react-date-range';
import Button from '@/components/ui/Button';
import DatePicker from '@/components/inputs/DatePicker';

interface ListingReservationProps {
  disabledDates: Date[];
  disabled: boolean;
  totalAmount: number;
  price: number;
  dateRange: Range;
  onChange: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation = ({
  dateRange,
  totalAmount,
  price,
  disabledDates,
  disabled,
  onChange,
  onSubmit,
}: ListingReservationProps) => {
  return (
    <div className='bg-white border border-neutral-200 rounded-xl overflow-hidden'>
      <div className='flex items-center gap-1 p-4'>
        <p className='font-semibold text-2xl text-neutral-800'>${price}</p>
        <p className='font-light text-neutral-600'>night</p>
      </div>
      <hr />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChange(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <hr />
      <div className='flex-between text-medium-large text-neutral-800 p-4'>
        <p>Total</p>
        <p>${totalAmount}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
