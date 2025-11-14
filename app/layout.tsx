import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mishatkin Medical - Беспроводная инсулиновая помпа',
  description: 'Инновационное решение для управления диабетом через мобильное приложение',
  icons: {
    icon: '/mishatkin_logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
