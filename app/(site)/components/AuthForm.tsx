'use client';
import Button from '@/app/components/Button';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  z,
  fieldDetails,
  fieldNamesLogin,
  fieldNamesRegister,
  formSchema,
} from '@/lib/utils';

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER');
    else setVariant('LOGIN');
    form.reset();
  }, [variant, form]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
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

  const socialAction = async (provider: string) => {
    setIsLoading(true);

    signIn(provider, { redirect: false })
      .then(() => toast.success('로그인 완료'))
      .catch(() => toast.error('로그인 실패'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 mx-auto w-full max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {(variant === 'LOGIN' ? fieldNamesLogin : fieldNamesRegister).map(
              (fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldDetails[fieldName].label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={fieldDetails[fieldName].placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? '로그인' : '회원가입'}
            </Button>
          </form>
        </Form>

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
