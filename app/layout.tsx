import type { Metadata } from 'next';
import './globals.css';
import ToastContext from './context/ToastContext';

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ToastContext />
        {children}
      </body>
    </html>
  );
}
