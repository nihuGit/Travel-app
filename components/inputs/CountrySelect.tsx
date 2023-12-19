'use client';
import { CountrySelectValue } from '@/types';
import useCountries from '@/hooks/useCountries';
import Select from 'react-select';
import '@/node_modules/flag-icons/css/flag-icons.min.css';

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: any) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAllCountries } = useCountries();
  return (
    <Select
      placeholder='Anywhere'
      options={getAllCountries()}
      onChange={(value) => onChange(value as CountrySelectValue)}
      value={value}
      formatOptionLabel={(option: any) => (
        <div className='flex items-center gap-4'>
          <div className={`fi fi-${option.value.toLowerCase()}`} />
          <div>
            {option.label},
            <span className='text-neutral-500 ml-1'>{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        option: () => 'text-lg',
        input: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: { ...theme.colors, primary: 'black', primary25: '#ffe4e6' },
      })}
      isClearable
      isSearchable
    />
  );
};

export default CountrySelect;
