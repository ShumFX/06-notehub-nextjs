import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes app with Next.js and TanStack Query',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

