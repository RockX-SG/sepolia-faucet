import { Inter } from 'next/font/google';
import Provider from './Provider';
import { Metadata } from 'next';
import Script from 'next/script';
import GTagScript from './GTagScript';
import './setupStyle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RockX - Sepolia Testnet Faucet',
  description: 'RockX - Sepolia Testnet Faucet',
  themeColor: '#000000',
  icons: [
    { rel: 'icon', url: '/favicon.svg' },
    { rel: 'apple-touch-icon', url: '/logo192.png' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <Script
          id="shared"
          src="https://shared.rockx.com/remoteEntry.js"
          strategy="beforeInteractive"
        />
        <GTagScript
          id="ga"
          src="https://www.googletagmanager.com/gtag/js?id=G-916J5GPD4D"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
