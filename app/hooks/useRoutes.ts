import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { HiChat, HiUsers } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import useConversation from './userConversation';
import { useMemo } from 'react';
import { signOut } from 'next-auth/react';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
