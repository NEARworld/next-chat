import { FC, PropsWithChildren } from 'react';
import Sidebar from './sidebar/Sidebar';

const layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default layout;
