import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Labor Day Mountain Run',
  description:
    'A four-day Kuwohi sunrise, Andrews Bald sunset, and Great Smoky Mountains summit road trip from Tampa.',
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
      {/* Immediately apply dark class before first paint to avoid flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
