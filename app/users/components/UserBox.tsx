import { User } from '@prisma/client';
import { FC } from 'react';

type Props = {
  user: User;
};

const UserBox: FC<Props> = ({ user }) => {
  return <div>user</div>;
};

export default UserBox;
