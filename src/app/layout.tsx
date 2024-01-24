import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "DrivePulse",
  description: "This Is A File Sharing Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
       <div className="min-h-screen">
      
       {children}
 
       
       </div>
      </body>
    </html>
  );
}
