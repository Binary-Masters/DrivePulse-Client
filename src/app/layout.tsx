// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

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
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
