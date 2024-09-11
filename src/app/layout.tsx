// Wraps all pages across the app

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers'
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proffrr",
  description: "Get the best tire deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
