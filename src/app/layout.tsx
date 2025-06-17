import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ernesto Pacheco Morelos | Fillout Tabs Assessment",
  description: "Take home assignment for Fillout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
