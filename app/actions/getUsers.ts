import { getSession } from 'next-auth/react';
import prisma from '../libs/prismadb';

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (e) {
    return [];
  }
};

export default getUsers;
