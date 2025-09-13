import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";
import { LayoutPage } from "@/components/Layout";




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
       {/* eslint-disable-next-line @next/next/no-page-custom-font */}
<link
  href="https://fonts.googleapis.com/css2?family=Jersey+15&family=Jua&display=swap"
  rel="stylesheet"
/>

      </head>
      <body className={`h-screen`}>
        <Toaster richColors position="top-right" />
        <LayoutPage>{children}</LayoutPage>
      </body>
    </html>
  );
}
