'use client';
import { useState } from 'react';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Modal from '@/components/modals/Modal';
import Heading from '../shared/Heading';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  const handleToggle = () => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className='flex flex-col gap-6'>
      <Heading title='Welcome back' subtitle='Login to your account' />
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
          Dont have an account
          <span
            className='text-neutral-800 hover:underline cursor-pointer ml-1.5'
            onClick={handleToggle}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title='Login'
      actionLabel='Continue'
      disabled={isLoading}
      body={bodyContent}
      footer={footer}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
