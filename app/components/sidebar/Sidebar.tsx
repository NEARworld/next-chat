import { FC, PropsWithChildren } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <DesktopSidebar />
      <MobileFooter />
      <main className='lg:pl-20 h-full '>{children}</main>
    </div>
  );
};
export default Sidebar;
