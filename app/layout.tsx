export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { getCurrentUser } from '@/lib/actions/user.actions';
import Navbar from '@/components/shared/navbar/Navbar';
import ClientOnly from '@/components/shared/ClientOnly';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';
import MobileBottomNav from '@/components/shared/navbar/MobileBottomNav';
import './globals.css';
import FilterModal from '@/components/modals/FilterModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb | Vacation rentals, cabins, beach houses, & more',
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
          <RentModal />
          <SearchModal />
          <FilterModal /> 
          <Navbar currentUser={currentUser} />
          <MobileBottomNav />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
