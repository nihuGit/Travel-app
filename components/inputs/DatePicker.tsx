'use client';

import { Range, RangeKeyDict, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const DatePicker = ({ value, disabledDates, onChange }: DatePickerProps) => {
  return (
    <DateRange
      ranges={[value]}
      disabledDates={disabledDates}
      onChange={onChange}
      showDateDisplay={false}
      date={new Date()}
      rangeColors={['#262626']}
      minDate={new Date()}
      direction="vertical"
    />
  );
};

export default DatePicker;
