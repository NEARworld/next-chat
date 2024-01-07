import { User } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  user: User;
};

const Avatar: FC<Props> = ({ user }) => {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
        <Image
          alt='Avatar'
          fill
          src={user.image || '/images/placeholder.jpg'}
        />
      </div>
    </div>
  );
};

export default Avatar;
