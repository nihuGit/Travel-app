'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  disabled?: boolean;
  label: string;
  outline?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  disabled,
  onClick,
  small,
  icon: Icon,
  outline,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      cursor-pointer 
      w-full 
      relative 
      disabled:opacity-70 
      disabled:cursor-not-allowed 
      transition 
      hover:opacity-80 
      rounded-lg 
      ${outline ? 'bg-white' : 'bg-rose-500'} 
      ${outline ? 'border-black' : 'border-rose-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'py-[6px]' : 'py-[10px]'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border' : 'border-2'}`}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-[10px]' />}
      {label}
    </button>
  );
};

export default Button;
