// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode
import "./globals.css";
import { Toaster } from "react-hot-toast";
// Providers
import ReactTanstackProvider from "../providers/ReactTanstackProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrivePulse",
  description: "Secure File Sharing",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="min-h-screen">
          <ReactTanstackProvider>
          <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
            <AuthProvider>{children}</AuthProvider>
          </ReactTanstackProvider>
        </div>
      </body>
    </html>
  );
}
