import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
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
