import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { UrqlProvider } from '../libs/graphql/provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Ticket Dive',
  description: 'チケット販売プラットフォーム',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UrqlProvider>{children}</UrqlProvider>
      </body>
    </html>
  );
}
