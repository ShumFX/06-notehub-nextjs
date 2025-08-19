import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Динамический импорт TanStackProvider с отключением SSR
const TanStackProvider = dynamic(
  () => import("../components/TanStackProvider/TanStackProvider"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "NoteHub - Manage Your Notes",
  description: "A simple and efficient application for managing personal notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
