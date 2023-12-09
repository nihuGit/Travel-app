import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  formatPrice?: boolean;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  errors,
  formatPrice,
  register,
}: InputProps) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='absolute top-5 left-2 text-neutral-700'
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        // Field is required to be filled
        {...register(id, { required })}
        placeholder=' '
        className={`
        w-full 
        p-4 
        pt-6 
        bg-white 
        border-2 
        rounded-lg 
        shadow-md 
        font-light 
        outline-none 
        disabled:opacity-70 
        disabled:cursor-not-allowed 
        transition
        peer
        text-neutral-800
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        ${formatPrice ? 'pl-9' : 'pl-4'}
        `}
      />
      <label
        className={`
      absolute
      top-5
      transform
      -translate-y-3
      origin-[0]
      text-md
      duration-150
      z-10
      peer-placeholder-shown:scale-100
      peer-placeholdershown:translate-y-0
      peer-focus:-translate-y-4
      peer-focus:scale-75
      ${formatPrice ? 'left-9' : 'left-4'}
      ${errors[id] ? 'text-rose-500' : 'text-zinc-500'}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
