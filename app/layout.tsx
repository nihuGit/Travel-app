import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { getCurrentUser } from '@/lib/actions/user.actions';
import Navbar from '@/components/shared/navbar/Navbar';
import ClientOnly from '@/components/shared/ClientOnly';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone created using Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
