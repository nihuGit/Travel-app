'use client';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onMinus = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };
  return (
    <div className='flex-between gap-3'>
      <div className='flex-col-start'>
        <div className='font-bold text-lg'>{title}</div>
        <p className='font-medium text-md text-neutral-500'>{subtitle}</p>
      </div>
      <div className='flex gap-3'>
        <AiOutlineMinusCircle
          size={26}
          onClick={onMinus}
          className='cursor-pointer'
        />
        <span className='font-medium text-lg text-neutral-900'>{value}</span>
        <AiOutlinePlusCircle
          size={26}
          onClick={onAdd}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default Counter;
