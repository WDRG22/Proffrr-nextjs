import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

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
        {children}
        <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Proffer. All rights reserved.</p>
      </footer>
      </body>
    </html>
  );
}
