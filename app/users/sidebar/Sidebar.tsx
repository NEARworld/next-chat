import { FC, PropsWithChildren } from 'react';
import DesktopSidebar from './DesktopSidebar';

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <DesktopSidebar />
      <main className='lg:pl-20 h-full '>{children}</main>
    </div>
  );
};
export default Sidebar;
