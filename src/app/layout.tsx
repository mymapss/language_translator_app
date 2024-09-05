"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Include the external script here */}
        <Script 
          src="/node_modules/preline/dist/preline.js" 
          strategy="beforeInteractive" // or "afterInteractive" based on your needs
          onLoad={() => console.log('preline.js loaded')}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
