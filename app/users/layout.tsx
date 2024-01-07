import { FC, PropsWithChildren } from 'react';

const layout: FC<PropsWithChildren> = async ({ children }) => {
  return <div className='h-full'>{children}</div>;
};

export default layout;
