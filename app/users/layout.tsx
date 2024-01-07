import { FC, PropsWithChildren } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import getUsers from '../actions/getUsers';
import UserList from './UserList';

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className='h-full'>
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
