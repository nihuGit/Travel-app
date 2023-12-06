'use client';
import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox = ({ label, icon: Icon, selected }: CategoryBoxProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = { ...currentQuery, category: label };
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div
      className={`
      category-box
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <p className='text-medium-small'>{label}</p>
    </div>
  );
};

export default CategoryBox;
