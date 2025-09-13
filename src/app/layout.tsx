import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { LayoutPage } from "@/components/Layout";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Pastry Edition by Rubean Rakeru Esguerra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+15&family=Jua&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`h-screen`}>
        <Toaster richColors position="top-right" />
        <LayoutPage>{children}</LayoutPage>
      </body>
    </html>
  );
}
