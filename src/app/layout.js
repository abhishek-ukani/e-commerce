import { Inter, Noto_Sans_Gujarati } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-noto-gujarati',
  display: 'swap',
});

export const metadata = {
  title: 'Talala Kesariya - Premium Kesar Mangoes',
  description: '100% Natural, Fresh Kesar Mangoes direct from the farms of Talala, Gujarat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansGujarati.variable}`}>
      <body>{children}</body>
    </html>
  );
}
