import { FC, PropsWithChildren } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import getCurrentUser from '@/app/actions/getCurrentUser';

const Sidebar: FC<PropsWithChildren> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <DesktopSidebar />
      <MobileFooter />
      <main className='lg:pl-20 h-full '>{children}</main>
    </div>
  );
};
export default Sidebar;
