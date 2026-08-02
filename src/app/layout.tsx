import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Offline system font stack fallbacks rather than downloading Google Fonts during build timeouts
const inter = { variable: 'font-inter' };
const outfit = { variable: 'font-outfit' };

export const metadata: Metadata = {
  title: 'HomePlate | Premium Home-Cooked Meals',
  description: 'Discover and order stunning, authentic home-cooked meals from passionate local chefs in your neighborhood.',
  keywords: ['food', 'home-cooked', 'marketplace', 'meals', 'chefs', 'local'],
  openGraph: {
    title: 'HomePlate | Premium Home-Cooked Meals',
    description: 'Discover and order stunning, authentic home-cooked meals from passionate local chefs in your neighborhood.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <LocaleProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
