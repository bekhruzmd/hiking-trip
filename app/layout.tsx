import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Labor Day Mountain Run',
  description: 'A four-day hiking road trip from Tampa to the Smokies and McAfee Knob.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
