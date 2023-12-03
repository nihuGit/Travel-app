'use client';
import { useState } from 'react';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { registerUser } from '@/lib/actions/user.actions';
import toast from 'react-hot-toast';
import Modal from '@/components/modals/Modal';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const bodyContent = (
    <div className='flex flex-col gap-6'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );
  const footer = (
    <div className='flex flex-col gap-4'>
      <h4 />
      <Button
        label='Continue with Google'
        icon={FcGoogle}
        disabled={isLoading}
        onClick={() => {}}
        outline
      />
      <Button
        label='Continue with Github'
        icon={AiFillGithub}
        disabled={isLoading}
        onClick={() => {}}
        outline
      />
      <div className='mt-4 text-neutral-600 text-center font-light'>
        <p>
          Already have an account
          <span className='text-neutral-800 hover:underline cursor-pointer ml-1.5'>
            Log In
          </span>
        </p>
      </div>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      await registerUser(data);
      toast.success('Registered successfully');
      registerModal.onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title='Register'
      actionLabel='Continue'
      disabled={isLoading}
      body={bodyContent}
      footer={footer}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
