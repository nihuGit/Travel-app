'use client';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (category: string) => void;
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      className={` 
      category-input
    ${selected ? 'border-black' : 'border-neutral-200'}
    ${selected && 'text-neutral-800'}`}
      onClick={() => onClick(label)}
    >
      <Icon size={28} />
      <p className='text-medium-small'>{label}</p>
    </div>
  );
};

export default CategoryInput;
