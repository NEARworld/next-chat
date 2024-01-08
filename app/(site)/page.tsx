'use client';
import Image from 'next/image';
import AuthForm from './components/AuthForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users');
    }
  }, [session.status, router]);

  if (session.status === 'unauthenticated')
    return (
      <div
        className='
      flex
      flex-col
      justify-center
      min-h-full
      bg-gray-100
      '
      >
        <div className='mx-auto w-full max-w-md'>
          <Image
            alt='Logo'
            height={48}
            width={48}
            className='mx-auto'
            src='/images/logo.png'
          />
          <h2
            className='
            mt-6
            text-center
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
          '
          >
            넥스트 메신저
          </h2>
        </div>
        <AuthForm />
      </div>
    );
}
