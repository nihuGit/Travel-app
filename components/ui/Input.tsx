import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  errors,
  register,
}: InputProps) => {
  return (
    <div className='w-full relative'>
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
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
      absolute
      top-5
      transform
      -translate-y-3
      left-4
      origin-[0]
      text-md
      duration-150
      z-10
      peer-placeholder-shown:scale-100
      peer-placeholdershown:translate-y-0
      peer-focus:-translate-y-4
      peer-focus:scale-75
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
