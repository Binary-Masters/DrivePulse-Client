// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode
import "./globals.css";

// Providers
import ReactTanstackProvider from "../providers/ReactTanstackProvider";
import AuthProvider from "@/providers/AuthProvider";
import FilesProvider from "@/providers/FilesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrivePulse",
  description: "This Is A File Sharing Website",
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
            <FilesProvider>
              <AuthProvider>{children}</AuthProvider>
            </FilesProvider>
          </ReactTanstackProvider>
        </div>
      </body>
    </html>
  );
}
