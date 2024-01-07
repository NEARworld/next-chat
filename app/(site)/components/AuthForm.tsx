'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users');
    }
  }, [session.status, router]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER');
    else setVariant('LOGIN');
    reset();
  }, [variant, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .catch((e) => toast.error('invalid request'))
        .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error('로그인에 문제가 있습니다');
          }
          if (res?.ok) {
            toast.success('로그인 완료');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (provider: string) => {
    setIsLoading(true);

    signIn(provider, { redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error('로그인에 문제가 있습니다');
        }
        if (res?.ok) {
          toast.success('로그인 완료');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 mx-auto w-full max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label='닉네임'
              id='name'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label='이메일'
            id='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label='비밀번호'
            id='password'
            type='password'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? '로그인' : '회원가입'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div
                className='
                w-full
                border-t
                border-gray-300'
              />
            </div>

            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                소셜 계정 이용하기
              </span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>

          <div
            className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            mx-2 
            text-gray-500'
          >
            <div>
              {variant === 'LOGIN' ? '처음이신가요?' : '이미 회원이신가요?'}
            </div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {variant === 'LOGIN' ? '회원가입' : '로그인'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
