import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madhuri Road Lines",
  description: "Madhuri Road Lines ~ Millions of miles with Smiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://kit.fontawesome.com/fe4878f0c6.js" crossOrigin="anonymous"></Script>
      </head>
      <body className={`text-white ${inter.className}`}>{children}</body>
    </html>
  );
}
