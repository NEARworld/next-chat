'use client';
import Avatar from '@/app/components/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

type Props = {
  user: User;
};

const UserBox: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const requestConversation = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <div
      onClick={requestConversation}
      className='
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-white 
        p-3 
        hover:bg-neutral-100 
        rounded-lg 
        transition 
        cursor-pointer '
    >
      <Avatar user={user} />
      <div className='mb-1'>
        <p className='text-sm font-medium text-gray-900'>{user.name}</p>
      </div>
    </div>
  );
};

export default UserBox;
