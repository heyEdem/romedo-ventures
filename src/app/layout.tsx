import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { seedStore } from '@/lib/content/seed';

export const metadata: Metadata = {
  title: 'Romedo Ventures',
  description: 'Technology for everyday life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { contact } = seedStore;

  return (
    <html lang="en">
      <body>
        <div className="page-wrapper">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header whatsapp={contact.whatsapp} phone={contact.phone} />
          <main id="main-content" className="page-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
