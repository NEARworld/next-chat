'use client';
import { User } from '@prisma/client';
import { FC } from 'react';

type Props = {
  user: User;
};

const UserBox: FC<Props> = ({ user }) => {
  return (
    <div
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
      {/* <Avatar user={user} /> */}
    </div>
  );
};

export default UserBox;
