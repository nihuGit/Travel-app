import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/shared/Navbar';
import './globals.css';
import Modal from '@/components/modals/Modal';
import ClientOnly from '@/components/shared/ClientOnly';
import RegisterModal from '@/components/modals/RegisterModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone created using Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
