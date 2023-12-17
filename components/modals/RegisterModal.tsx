'use client';
import { useState } from 'react';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useLoginModal } from '@/hooks/useLoginModal';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { registerUser } from '@/lib/actions/user.actions';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Modal from '@/components/modals/Modal';
import Heading from '../shared/Heading';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleToggle = () => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  };
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
        onClick={() => signIn('google')}
        outline
      />
      <Button
        label='Continue with Github'
        icon={AiFillGithub}
        disabled={isLoading}
        onClick={() => signIn('github')}
        outline
      />
      <div className='mt-4 text-neutral-600 text-center font-light'>
        <p>
          Already have an account
          <span
            className='text-neutral-800 hover:underline cursor-pointer ml-1.5'
            onClick={handleToggle}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Registered successfully');
      registerModal.onClose();
      loginModal.onOpen();
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
