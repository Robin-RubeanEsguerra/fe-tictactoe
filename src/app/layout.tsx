import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { BaguetteCol, DonutCol } from "@/assets";
import { Toaster } from "sonner";
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
      <body className={``}>
        <Toaster richColors position="top-right" />
        <div className="flex relative w-full">
          <Image
            src={BaguetteCol}
            alt="cat donut"
            className=" hidden lg:block object-right   lg:w-[300px] absolute h-screen object-cover 4xl:w-[500px] "
          />
          <div className="w-full">{children}</div>
          <Image
            src={DonutCol}
            alt="cat donut"
            className="hidden lg:block object-left lg:w-[300px] absolute right-0 h-screen object-cover 4xl:w-[500px]  "
          />

        
        </div>
       
      </body>
    </html>
  );
}
